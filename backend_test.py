#!/usr/bin/env python3
"""
Backend API Testing Script
Tests all backend endpoints to ensure they are functioning properly after UI updates.
"""

import requests
import json
import sys
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get the backend URL from frontend environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://dependency-debug.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'response_data': response_data
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {test_name}: {message}")
        
        if not success:
            self.failed_tests.append(result)
            if response_data:
                print(f"   Response: {response_data}")
    
    def test_root_endpoint(self):
        """Test GET /api/ endpoint"""
        try:
            response = requests.get(f"{API_BASE_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == 'Hello World':
                    self.log_test("Root Endpoint", True, "Root endpoint returned correct message")
                else:
                    self.log_test("Root Endpoint", False, f"Unexpected response: {data}", data)
            else:
                self.log_test("Root Endpoint", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Root Endpoint", False, f"Request failed: {str(e)}")
    
    def test_create_status_check(self):
        """Test POST /api/status endpoint"""
        try:
            test_data = {
                "client_name": "TestClient_BackendAPI"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/status", 
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['id', 'client_name', 'timestamp']
                
                if all(field in data for field in required_fields):
                    if data['client_name'] == test_data['client_name']:
                        self.log_test("Create Status Check", True, "Status check created successfully")
                        return data  # Return created data for further tests
                    else:
                        self.log_test("Create Status Check", False, f"Client name mismatch: expected {test_data['client_name']}, got {data['client_name']}", data)
                else:
                    missing_fields = [field for field in required_fields if field not in data]
                    self.log_test("Create Status Check", False, f"Missing required fields: {missing_fields}", data)
            else:
                self.log_test("Create Status Check", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Create Status Check", False, f"Request failed: {str(e)}")
        
        return None
    
    def test_get_status_checks(self):
        """Test GET /api/status endpoint"""
        try:
            response = requests.get(f"{API_BASE_URL}/status", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test("Get Status Checks", True, f"Retrieved {len(data)} status checks")
                    
                    # Validate structure of returned items
                    if data:
                        first_item = data[0]
                        required_fields = ['id', 'client_name', 'timestamp']
                        if all(field in first_item for field in required_fields):
                            self.log_test("Status Check Structure", True, "Status check items have correct structure")
                        else:
                            missing_fields = [field for field in required_fields if field not in first_item]
                            self.log_test("Status Check Structure", False, f"Status check items missing fields: {missing_fields}", first_item)
                    
                    return data
                else:
                    self.log_test("Get Status Checks", False, f"Expected list, got {type(data)}", data)
            else:
                self.log_test("Get Status Checks", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Get Status Checks", False, f"Request failed: {str(e)}")
        
        return None
    
    def test_cors_headers(self):
        """Test CORS configuration"""
        try:
            # Test preflight request
            response = requests.options(
                f"{API_BASE_URL}/status",
                headers={
                    'Origin': 'https://dependency-debug.preview.emergentagent.com',
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers': 'Content-Type'
                },
                timeout=10
            )
            
            cors_headers = [
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Headers'
            ]
            
            present_headers = [header for header in cors_headers if header in response.headers]
            
            if len(present_headers) >= 2:  # At least origin and methods should be present
                self.log_test("CORS Configuration", True, f"CORS headers present: {present_headers}")
            else:
                self.log_test("CORS Configuration", False, f"Missing CORS headers. Present: {present_headers}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("CORS Configuration", False, f"CORS test failed: {str(e)}")
    
    def test_data_persistence(self):
        """Test data persistence by creating and retrieving data"""
        try:
            # Create a unique status check
            unique_client = f"PersistenceTest_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            test_data = {"client_name": unique_client}
            
            # Create the status check
            create_response = requests.post(
                f"{API_BASE_URL}/status", 
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if create_response.status_code != 200:
                self.log_test("Data Persistence", False, f"Failed to create test data: {create_response.status_code}")
                return
            
            created_data = create_response.json()
            created_id = created_data.get('id')
            
            # Retrieve all status checks
            get_response = requests.get(f"{API_BASE_URL}/status", timeout=10)
            
            if get_response.status_code != 200:
                self.log_test("Data Persistence", False, f"Failed to retrieve data: {get_response.status_code}")
                return
            
            all_status_checks = get_response.json()
            
            # Check if our created item exists
            found_item = None
            for item in all_status_checks:
                if item.get('id') == created_id and item.get('client_name') == unique_client:
                    found_item = item
                    break
            
            if found_item:
                self.log_test("Data Persistence", True, f"Data persisted correctly. Found item with ID: {created_id}")
            else:
                self.log_test("Data Persistence", False, f"Created item not found in database. ID: {created_id}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Data Persistence", False, f"Data persistence test failed: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests")
        print(f"📍 Testing API Base URL: {API_BASE_URL}")
        print("=" * 60)
        
        # Test basic connectivity
        self.test_root_endpoint()
        
        # Test CRUD operations
        self.test_create_status_check()
        self.test_get_status_checks()
        
        # Test CORS configuration
        self.test_cors_headers()
        
        # Test data persistence
        self.test_data_persistence()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t['success']])
        failed_tests = len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['message']}")
        
        return len(self.failed_tests) == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All backend tests passed!")
        sys.exit(0)
    else:
        print(f"\n💥 {len(tester.failed_tests)} test(s) failed!")
        sys.exit(1)