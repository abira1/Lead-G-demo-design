"""
Pydantic models for API request/response validation
"""
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid

class StatusCheckCreate(BaseModel):
    """Model for creating a new status check"""
    client_name: str = Field(..., min_length=1, max_length=100)
    message: Optional[str] = Field(None, max_length=500)

class StatusCheck(BaseModel):
    """Model for status check response"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class ContactFormCreate(BaseModel):
    """Model for contact form submission"""
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    company: Optional[str] = Field(None, max_length=100)
    industry: Optional[str] = Field(None, max_length=50)
    service: Optional[str] = Field(None, max_length=50)
    message: str = Field(..., min_length=1, max_length=1000)

class ContactForm(BaseModel):
    """Model for contact form response"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    last_name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    industry: Optional[str] = None
    service: Optional[str] = None
    message: str
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class AppointmentCreate(BaseModel):
    """Model for creating a new appointment"""
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    business: Optional[str] = Field(None, max_length=100)
    industry: Optional[str] = Field(None, max_length=50)
    service_interests: Optional[str] = Field(None, max_length=200)
    appointment_date: str = Field(..., description="Date in YYYY-MM-DD format")
    appointment_time: str = Field(..., description="Time in HH:MM format")
    message: Optional[str] = Field(None, max_length=1000)

class Appointment(BaseModel):
    """Model for appointment response"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    business: Optional[str] = None
    industry: Optional[str] = None
    service_interests: Optional[str] = None
    appointment_date: str
    appointment_time: str
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="pending")  # pending, confirmed, completed, cancelled
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class APIResponse(BaseModel):
    """Standard API response model"""
    success: bool
    message: str
    data: Optional[dict] = None