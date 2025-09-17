"""
Firebase Firestore database configuration and utilities
"""
import firebase_admin
from firebase_admin import credentials, firestore
from config import settings
import logging
from typing import Optional

logger = logging.getLogger(__name__)

class FirebaseDB:
    _instance: Optional['FirebaseDB'] = None
    _db = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(FirebaseDB, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance
    
    def _initialize(self):
        """Initialize Firebase Admin SDK"""
        try:
            if not firebase_admin._apps:
                if settings.FIREBASE_CREDENTIALS_PATH and settings.FIREBASE_CREDENTIALS_PATH != 'firebase-credentials.json':
                    # Use service account credentials file
                    cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
                    firebase_admin.initialize_app(cred, {
                        'projectId': settings.FIREBASE_PROJECT_ID,
                    })
                else:
                    # Use default credentials (for deployment)
                    firebase_admin.initialize_app()
                
                self._db = firestore.client()
                logger.info("Firebase initialized successfully")
            else:
                self._db = firestore.client()
                logger.info("Using existing Firebase app")
                
        except Exception as e:
            logger.error(f"Failed to initialize Firebase: {e}")
            raise
    
    @property
    def db(self):
        """Get Firestore database instance"""
        if self._db is None:
            self._initialize()
        return self._db
    
    def get_collection(self, collection_name: str):
        """Get a Firestore collection reference"""
        return self.db.collection(collection_name)

# Global database instance
firebase_db = FirebaseDB()