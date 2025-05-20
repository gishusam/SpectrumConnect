from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    userType = Column(String, default="user")  
    is_active = Column(Boolean, default=True)

    therapist_profile = relationship("Therapist", back_populates="user", uselist=False)

class Therapist(Base):
    __tablename__ = "therapists"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)
    contact = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id")) 
    experience = Column(Integer, nullable=False)
    bio = Column(String, nullable=False)

    user = relationship("User", back_populates="therapist_profile")

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    therapist_id = Column(Integer, ForeignKey("therapists.id"), nullable=False)
    scheduled_time = Column(DateTime, nullable=False)
    status = Column(String, default="pending")  

    user = relationship("User", foreign_keys=[user_id])
    therapist = relationship("Therapist", foreign_keys=[therapist_id])

# Community Models
class ForumTopic(Base):
    __tablename__ = "forum_topics"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("now()"), nullable=False)
    category = Column(String, nullable=False)
    likes = Column(Integer, default=0)
    
    user = relationship("User", foreign_keys=[user_id])
    comments = relationship("Comment", back_populates="topic")
    tags = relationship("TopicTag", back_populates="topic")

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    topic_id = Column(Integer, ForeignKey("forum_topics.id"), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("now()"), nullable=False)
    likes = Column(Integer, default=0)
    
    user = relationship("User", foreign_keys=[user_id])
    topic = relationship("ForumTopic", back_populates="comments")

class TopicTag(Base):
    __tablename__ = "topic_tags"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    topic_id = Column(Integer, ForeignKey("forum_topics.id"), nullable=False)
    
    topic = relationship("ForumTopic", back_populates="tags")

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    location = Column(String, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    creator = relationship("User", foreign_keys=[created_by])
    attendees = relationship("EventAttendee", back_populates="event")

class EventAttendee(Base):
    __tablename__ = "event_attendees"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    event = relationship("Event", back_populates="attendees")
    user = relationship("User")
