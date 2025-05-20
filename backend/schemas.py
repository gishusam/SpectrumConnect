from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    userType: str = "user"

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
    bio: str

class TherapistCreate(TherapistBase):
    user_id: int = None

class TherapistResponse(TherapistBase):
    id: int
    user_id: Optional[int]  
    class Config:
        orm_mode = True

class AppointmentBase(BaseModel):
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
    userType: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None

# Community Schemas
class TopicTagBase(BaseModel):
    name: str

class TopicTagCreate(TopicTagBase):
    pass

class TopicTagResponse(TopicTagBase):
    id: int
    topic_id: int

    class Config:
        orm_mode = True

class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    id: int
    user_id: int
    topic_id: int
    created_at: datetime
    likes: int
    user: UserOut

    class Config:
        orm_mode = True

class ForumTopicBase(BaseModel):
    title: str
    content: Optional[str] = None
    category: str

class ForumTopicCreate(ForumTopicBase):
    tags: Optional[List[str]] = []

class ForumTopicResponse(ForumTopicBase):
    id: int
    user_id: int
    created_at: datetime
    likes: int
    user: UserOut
    comments: List[CommentResponse]
    tags: List[TopicTagResponse]

    class Config:
        orm_mode = True

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: str
    time: str
    location: str

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int
    created_by: int
    creator: UserOut
    attendees: List[UserOut]

    class Config:
        orm_mode = True   
