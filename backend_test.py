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
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://appointify-21.preview.emergentagent.com')
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
                    'Origin': 'https://appointify-21.preview.emergentagent.com',
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

    # ==================== APPOINTMENT BOOKING SYSTEM TESTS ====================
    
    def test_create_appointment_valid(self):
        """Test POST /api/appointments with valid data"""
        try:
            test_data = {
                "name": "Sarah Johnson",
                "email": "sarah.johnson@businesscorp.com",
                "phone": "+1-555-0123",
                "business": "Business Corp",
                "industry": "Technology",
                "service_interests": "Lead Generation, Social Media Marketing",
                "appointment_date": "2024-12-20",
                "appointment_time": "14:30",
                "message": "Looking to improve our lead generation process and social media presence."
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['id', 'name', 'email', 'phone', 'appointment_date', 'appointment_time', 'status', 'created_at']
                
                if all(field in data for field in required_fields):
                    if (data['name'] == test_data['name'] and 
                        data['email'] == test_data['email'] and
                        data['appointment_date'] == test_data['appointment_date'] and
                        data['appointment_time'] == test_data['appointment_time'] and
                        data['status'] == 'pending'):
                        self.log_test("Create Appointment - Valid Data", True, "Appointment created successfully with all required fields")
                        return data  # Return for overlap testing
                    else:
                        self.log_test("Create Appointment - Valid Data", False, "Data mismatch in created appointment", data)
                else:
                    missing_fields = [field for field in required_fields if field not in data]
                    self.log_test("Create Appointment - Valid Data", False, f"Missing required fields: {missing_fields}", data)
            else:
                self.log_test("Create Appointment - Valid Data", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Create Appointment - Valid Data", False, f"Request failed: {str(e)}")
        
        return None

    def test_create_appointment_overlap_prevention(self):
        """Test appointment overlap prevention (409 Conflict)"""
        try:
            # First appointment
            test_data_1 = {
                "name": "Michael Chen",
                "email": "michael.chen@techstartup.com",
                "phone": "+1-555-0456",
                "appointment_date": "2024-12-21",
                "appointment_time": "09:00"
            }
            
            # Create first appointment
            response1 = requests.post(
                f"{API_BASE_URL}/appointments",
                json=test_data_1,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response1.status_code != 200:
                self.log_test("Overlap Prevention", False, f"Failed to create first appointment: {response1.status_code}")
                return
            
            # Try to create overlapping appointment
            test_data_2 = {
                "name": "Emma Rodriguez",
                "email": "emma.rodriguez@consulting.com",
                "phone": "+1-555-0789",
                "appointment_date": "2024-12-21",  # Same date
                "appointment_time": "09:00"        # Same time
            }
            
            response2 = requests.post(
                f"{API_BASE_URL}/appointments",
                json=test_data_2,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response2.status_code == 409:
                error_data = response2.json()
                if "already booked" in error_data.get('detail', '').lower():
                    self.log_test("Overlap Prevention", True, "Correctly prevented overlapping appointment with 409 Conflict")
                else:
                    self.log_test("Overlap Prevention", False, f"Wrong error message: {error_data.get('detail')}", error_data)
            else:
                self.log_test("Overlap Prevention", False, f"Expected 409 Conflict, got {response2.status_code}: {response2.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Overlap Prevention", False, f"Request failed: {str(e)}")

    def test_create_appointment_validation(self):
        """Test appointment validation with invalid data"""
        try:
            # Test missing required fields
            invalid_data = {
                "name": "Test User",
                # Missing email, phone, appointment_date, appointment_time
            }
            
            response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=invalid_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 422:  # Validation error
                self.log_test("Appointment Validation - Missing Fields", True, "Correctly rejected appointment with missing required fields")
            else:
                self.log_test("Appointment Validation - Missing Fields", False, f"Expected 422 validation error, got {response.status_code}")
            
            # Test invalid email format
            invalid_email_data = {
                "name": "Test User",
                "email": "invalid-email-format",
                "phone": "+1-555-0123",
                "appointment_date": "2024-12-22",
                "appointment_time": "10:00"
            }
            
            response2 = requests.post(
                f"{API_BASE_URL}/appointments",
                json=invalid_email_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response2.status_code == 422:
                self.log_test("Appointment Validation - Invalid Email", True, "Correctly rejected appointment with invalid email format")
            else:
                self.log_test("Appointment Validation - Invalid Email", False, f"Expected 422 validation error, got {response2.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Appointment Validation", False, f"Request failed: {str(e)}")

    def test_get_appointments(self):
        """Test GET /api/appointments endpoint"""
        try:
            response = requests.get(f"{API_BASE_URL}/appointments", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test("Get Appointments", True, f"Retrieved {len(data)} appointments")
                    
                    # Validate structure if appointments exist
                    if data:
                        first_appointment = data[0]
                        required_fields = ['id', 'name', 'email', 'phone', 'appointment_date', 'appointment_time', 'status', 'created_at']
                        if all(field in first_appointment for field in required_fields):
                            self.log_test("Appointment Structure", True, "Appointment items have correct structure")
                        else:
                            missing_fields = [field for field in required_fields if field not in first_appointment]
                            self.log_test("Appointment Structure", False, f"Appointment items missing fields: {missing_fields}", first_appointment)
                    
                    return data
                else:
                    self.log_test("Get Appointments", False, f"Expected list, got {type(data)}", data)
            else:
                self.log_test("Get Appointments", False, f"HTTP {response.status_code}: {response.text}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Get Appointments", False, f"Request failed: {str(e)}")
        
        return None

    def test_get_appointments_with_status_filter(self):
        """Test GET /api/appointments with status filter"""
        try:
            # Test filtering by pending status
            response = requests.get(f"{API_BASE_URL}/appointments?status_filter=pending", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Appointments - Status Filter", True, f"Retrieved {len(data)} pending appointments")
                else:
                    self.log_test("Get Appointments - Status Filter", False, f"Expected list, got {type(data)}", data)
            else:
                self.log_test("Get Appointments - Status Filter", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Get Appointments - Status Filter", False, f"Request failed: {str(e)}")

    def test_get_appointments_with_limit(self):
        """Test GET /api/appointments with limit parameter"""
        try:
            response = requests.get(f"{API_BASE_URL}/appointments?limit=5", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Appointments - Limit", True, f"Retrieved {len(data)} appointments with limit parameter")
                else:
                    self.log_test("Get Appointments - Limit", False, f"Expected list, got {type(data)}", data)
            else:
                self.log_test("Get Appointments - Limit", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Get Appointments - Limit", False, f"Request failed: {str(e)}")

    def test_update_appointment_status_valid(self):
        """Test PUT /api/appointments/{id}/status with valid data"""
        try:
            # First create an appointment to update
            test_data = {
                "name": "David Wilson",
                "email": "david.wilson@enterprise.com",
                "phone": "+1-555-0321",
                "appointment_date": "2024-12-23",
                "appointment_time": "11:00"
            }
            
            create_response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if create_response.status_code != 200:
                self.log_test("Update Appointment Status", False, f"Failed to create test appointment: {create_response.status_code}")
                return
            
            created_appointment = create_response.json()
            appointment_id = created_appointment['id']
            
            # Update the status
            status_update = {"status": "confirmed"}
            
            response = requests.put(
                f"{API_BASE_URL}/appointments/{appointment_id}/status",
                json=status_update,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and "updated successfully" in data.get('message', '').lower():
                    self.log_test("Update Appointment Status - Valid", True, "Successfully updated appointment status to confirmed")
                else:
                    self.log_test("Update Appointment Status - Valid", False, f"Unexpected response: {data}", data)
            else:
                self.log_test("Update Appointment Status - Valid", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Update Appointment Status - Valid", False, f"Request failed: {str(e)}")

    def test_update_appointment_status_invalid_id(self):
        """Test PUT /api/appointments/{id}/status with invalid appointment ID"""
        try:
            fake_id = "non-existent-appointment-id"
            status_update = {"status": "confirmed"}
            
            response = requests.put(
                f"{API_BASE_URL}/appointments/{fake_id}/status",
                json=status_update,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 404:
                error_data = response.json()
                if "not found" in error_data.get('detail', '').lower():
                    self.log_test("Update Appointment Status - Invalid ID", True, "Correctly returned 404 for non-existent appointment")
                else:
                    self.log_test("Update Appointment Status - Invalid ID", False, f"Wrong error message: {error_data.get('detail')}")
            else:
                self.log_test("Update Appointment Status - Invalid ID", False, f"Expected 404 Not Found, got {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Update Appointment Status - Invalid ID", False, f"Request failed: {str(e)}")

    def test_update_appointment_status_invalid_status(self):
        """Test PUT /api/appointments/{id}/status with invalid status value"""
        try:
            # First create an appointment to update
            test_data = {
                "name": "Lisa Thompson",
                "email": "lisa.thompson@company.com",
                "phone": "+1-555-0654",
                "appointment_date": "2024-12-24",
                "appointment_time": "15:30"
            }
            
            create_response = requests.post(
                f"{API_BASE_URL}/appointments",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if create_response.status_code != 200:
                self.log_test("Update Appointment Status - Invalid Status", False, f"Failed to create test appointment: {create_response.status_code}")
                return
            
            created_appointment = create_response.json()
            appointment_id = created_appointment['id']
            
            # Try to update with invalid status
            invalid_status_update = {"status": "invalid_status"}
            
            response = requests.put(
                f"{API_BASE_URL}/appointments/{appointment_id}/status",
                json=invalid_status_update,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 400:
                error_data = response.json()
                if "invalid status" in error_data.get('detail', '').lower():
                    self.log_test("Update Appointment Status - Invalid Status", True, "Correctly rejected invalid status value with 400 Bad Request")
                else:
                    self.log_test("Update Appointment Status - Invalid Status", False, f"Wrong error message: {error_data.get('detail')}")
            else:
                self.log_test("Update Appointment Status - Invalid Status", False, f"Expected 400 Bad Request, got {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Update Appointment Status - Invalid Status", False, f"Request failed: {str(e)}")

    def test_check_availability_date_only(self):
        """Test GET /api/appointments/availability for a specific date"""
        try:
            test_date = "2024-12-25"
            response = requests.get(f"{API_BASE_URL}/appointments/availability?date={test_date}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['date', 'booked_times', 'message']
                
                if all(field in data for field in required_fields):
                    if (data['date'] == test_date and 
                        isinstance(data['booked_times'], list)):
                        self.log_test("Check Availability - Date Only", True, f"Successfully checked availability for {test_date}, found {len(data['booked_times'])} booked times")
                    else:
                        self.log_test("Check Availability - Date Only", False, f"Invalid response structure: {data}", data)
                else:
                    missing_fields = [field for field in required_fields if field not in data]
                    self.log_test("Check Availability - Date Only", False, f"Missing required fields: {missing_fields}", data)
            else:
                self.log_test("Check Availability - Date Only", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Check Availability - Date Only", False, f"Request failed: {str(e)}")

    def test_check_availability_date_and_time(self):
        """Test GET /api/appointments/availability for a specific date and time"""
        try:
            test_date = "2024-12-26"
            test_time = "16:00"
            response = requests.get(f"{API_BASE_URL}/appointments/availability?date={test_date}&time={test_time}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['available', 'date', 'time', 'message']
                
                if all(field in data for field in required_fields):
                    if (data['date'] == test_date and 
                        data['time'] == test_time and
                        isinstance(data['available'], bool)):
                        availability_status = "available" if data['available'] else "not available"
                        self.log_test("Check Availability - Date and Time", True, f"Successfully checked availability for {test_date} at {test_time}: {availability_status}")
                    else:
                        self.log_test("Check Availability - Date and Time", False, f"Invalid response structure: {data}", data)
                else:
                    missing_fields = [field for field in required_fields if field not in data]
                    self.log_test("Check Availability - Date and Time", False, f"Missing required fields: {missing_fields}", data)
            else:
                self.log_test("Check Availability - Date and Time", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Check Availability - Date and Time", False, f"Request failed: {str(e)}")
    
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