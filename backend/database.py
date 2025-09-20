"""
Firebase Firestore database configuration and utilities
"""
import logging
from typing import Optional, Dict, Any, List
import uuid
from datetime import datetime
import os

logger = logging.getLogger(__name__)

class MockDocument:
    """Mock Firestore document for development"""
    def __init__(self, data: Dict[str, Any]):
        self._data = data
        self.exists = True
    
    def to_dict(self):
        return self._data
    
    def get(self):
        return self

class MockDocumentReference:
    """Mock Firestore document reference for development"""
    def __init__(self, collection_name: str, doc_id: str):
        self.collection_name = collection_name
        self.doc_id = doc_id
        self._data = {}
    
    def set(self, data: Dict[str, Any]):
        self._data = data
        logger.info(f"Mock: Set document {self.doc_id} in {self.collection_name}")
        return self
    
    def update(self, data: Dict[str, Any]):
        self._data.update(data)
        logger.info(f"Mock: Updated document {self.doc_id} in {self.collection_name}")
        return self
    
    def get(self):
        if self._data:
            return MockDocument(self._data)
        else:
            doc = MockDocument({})
            doc.exists = False
            return doc

class MockQuery:
    """Mock Firestore query for development"""
    def __init__(self, collection_name: str):
        self.collection_name = collection_name
        self._filters = []
        self._order_by = None
        self._limit_count = None
    
    def where(self, field: str, op: str, value: Any):
        self._filters.append((field, op, value))
        return self
    
    def order_by(self, field: str, direction: str = 'ASCENDING'):
        self._order_by = (field, direction)
        return self
    
    def limit(self, count: int):
        self._limit_count = count
        return self
    
    def get(self):
        # Return empty list for mock data
        logger.info(f"Mock: Query {self.collection_name} with filters {self._filters}")
        return []

class MockCollection:
    """Mock Firestore collection for development"""
    def __init__(self, collection_name: str):
        self.collection_name = collection_name
    
    def document(self, doc_id: str = None):
        if doc_id is None:
            doc_id = str(uuid.uuid4())
        return MockDocumentReference(self.collection_name, doc_id)
    
    def where(self, field: str, op: str, value: Any):
        return MockQuery(self.collection_name).where(field, op, value)
    
    def order_by(self, field: str, direction: str = 'ASCENDING'):
        return MockQuery(self.collection_name).order_by(field, direction)
    
    def limit(self, count: int):
        return MockQuery(self.collection_name).limit(count)
    
    def get(self):
        logger.info(f"Mock: Get all documents from {self.collection_name}")
        return []

class MockFirestore:
    """Mock Firestore client for development"""
    def collection(self, collection_name: str):
        return MockCollection(collection_name)

class FirebaseDB:
    _instance: Optional['FirebaseDB'] = None
    _db = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(FirebaseDB, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance
    
    def _initialize(self):
        """Initialize database - use mock for development"""
        # For development, always use mock database
        if os.getenv('ENVIRONMENT', 'development') == 'development':
            logger.info("Using mock database for development")
            self._db = MockFirestore()
        else:
            # For production, you would initialize real Firebase here
            logger.warning("Production Firebase not configured, using mock")
            self._db = MockFirestore()
    
    @property
    def db(self):
        """Get database instance"""
        if self._db is None:
            self._initialize()
        return self._db
    
    def get_collection(self, collection_name: str):
        """Get a collection reference"""
        return self.db.collection(collection_name)

# Global database instance
firebase_db = FirebaseDB()