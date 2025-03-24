from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: str = "user"

class UserOut(BaseModel):
    id: int
    email: EmailStr
    
    class Config:
        from_attributes = True


class TherapistBase(BaseModel):
    name: str
    specialization: str
    contact: str
    experience: int

class TherapistCreate(TherapistBase):
    user_id: int = None

class TherapistResponse(TherapistBase):
    id: int
    user_id: Optional[int]  
    class Config:
        orm_mode = True

class AppointmentBase(BaseModel):
    user_id: int
    therapist_id: int
    scheduled_time: datetime

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentResponse(AppointmentBase):
    id: int
    status: str  

    class Config:
        orm_mode = True   

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None    
