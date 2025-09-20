"""
Lead G API Server - FastAPI with Firebase Firestore
A modern, scalable API for Lead Generation services
"""
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
from datetime import datetime
from typing import List

# Local imports
from config import settings
from database import firebase_db
from models import (
    StatusCheck, StatusCheckCreate,
    ContactForm, ContactFormCreate,
    Appointment, AppointmentCreate,
    APIResponse
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Modern API for Lead Generation services with Firebase backend",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/", response_model=APIResponse)
async def root():
    """Root endpoint for health check"""
    return APIResponse(
        success=True,
        message="Lead G API is running successfully",
        data={
            "version": settings.VERSION,
            "environment": settings.ENVIRONMENT,
            "timestamp": datetime.utcnow().isoformat()
        }
    )

@app.get("/health", response_model=APIResponse)
async def health_check():
    """Detailed health check endpoint"""
    try:
        # Test Firebase connection
        firebase_db.db.collection('health_check').limit(1).get()
        
        return APIResponse(
            success=True,
            message="All services are healthy",
            data={
                "database": "connected",
                "timestamp": datetime.utcnow().isoformat()
            }
        )
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content=APIResponse(
                success=False,
                message="Service unavailable",
                data={"error": str(e)}
            ).dict()
        )

# Status Check Endpoints
@app.post(f"{settings.API_V1_STR}/status", response_model=StatusCheck)
async def create_status_check(status_data: StatusCheckCreate):
    """Create a new status check entry"""
    try:
        status_check = StatusCheck(**status_data.dict())
        
        # Save to Firebase
        doc_ref = firebase_db.get_collection('status_checks').document(status_check.id)
        doc_ref.set(status_check.dict())
        
        logger.info(f"Created status check: {status_check.id}")
        return status_check
        
    except Exception as e:
        logger.error(f"Failed to create status check: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create status check"
        )

@app.get(f"{settings.API_V1_STR}/status", response_model=List[StatusCheck])
async def get_status_checks(limit: int = 100):
    """Retrieve status checks"""
    try:
        docs = firebase_db.get_collection('status_checks').order_by('timestamp', direction='DESCENDING').limit(limit).get()
        
        status_checks = []
        for doc in docs:
            data = doc.to_dict()
            status_checks.append(StatusCheck(**data))
        
        logger.info(f"Retrieved {len(status_checks)} status checks")
        return status_checks
        
    except Exception as e:
        logger.error(f"Failed to retrieve status checks: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve status checks"
        )

# Contact Form Endpoints
@app.post(f"{settings.API_V1_STR}/contact", response_model=ContactForm)
async def submit_contact_form(contact_data: ContactFormCreate):
    """Submit a contact form"""
    try:
        contact_form = ContactForm(**contact_data.dict())
        
        # Save to Firebase
        doc_ref = firebase_db.get_collection('contact_forms').document(contact_form.id)
        doc_ref.set(contact_form.dict())
        
        logger.info(f"Contact form submitted: {contact_form.id} by {contact_form.email}")
        return contact_form
        
    except Exception as e:
        logger.error(f"Failed to submit contact form: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit contact form"
        )

@app.get(f"{settings.API_V1_STR}/contact", response_model=List[ContactForm])
async def get_contact_forms(limit: int = 100, status_filter: str = None):
    """Retrieve contact forms (admin endpoint)"""
    try:
        query = firebase_db.get_collection('contact_forms').order_by('submitted_at', direction='DESCENDING')
        
        if status_filter:
            query = query.where('status', '==', status_filter)
            
        docs = query.limit(limit).get()
        
        contact_forms = []
        for doc in docs:
            data = doc.to_dict()
            contact_forms.append(ContactForm(**data))
        
        logger.info(f"Retrieved {len(contact_forms)} contact forms")
        return contact_forms
        
    except Exception as e:
        logger.error(f"Failed to retrieve contact forms: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve contact forms"
        )

# Exception handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content=APIResponse(
            success=False,
            message="Endpoint not found"
        ).dict()
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    logger.error(f"Internal server error: {exc}")
    return JSONResponse(
        status_code=500,
        content=APIResponse(
            success=False,
            message="Internal server error"
        ).dict()
    )

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    logger.info(f"Starting {settings.PROJECT_NAME} v{settings.VERSION}")
    logger.info(f"Environment: {settings.ENVIRONMENT}")
    logger.info(f"Debug mode: {settings.DEBUG}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8001,
        reload=settings.DEBUG,
        log_level="info"
    )