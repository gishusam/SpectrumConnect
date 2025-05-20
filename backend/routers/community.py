from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas,security
from ..database import get_db

router = APIRouter(
    prefix="/community",
    tags=["Community"]
)

# Forum Topics
@router.post("/topics", response_model=schemas.ForumTopicResponse)
def create_topic(
    topic: schemas.ForumTopicCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    db_topic = models.ForumTopic(
        title=topic.title,
        content=topic.content,
        category=topic.category,
        user_id=current_user.id
    )
    db.add(db_topic)
    db.commit()
    db.refresh(db_topic)

    # Add tags if provided
    if topic.tags:
        for tag_name in topic.tags:
            db_tag = models.TopicTag(name=tag_name, topic_id=db_topic.id)
            db.add(db_tag)
        db.commit()
        db.refresh(db_topic)

    return db_topic

@router.get("/topics", response_model=List[schemas.ForumTopicResponse])
def get_topics(
    skip: int = 0,
    limit: int = 10,
    category: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.ForumTopic)
    if category:
        query = query.filter(models.ForumTopic.category == category)
    return query.offset(skip).limit(limit).all()

@router.get("/topics/{topic_id}", response_model=schemas.ForumTopicResponse)
def get_topic(topic_id: int, db: Session = Depends(get_db)):
    topic = db.query(models.ForumTopic).filter(models.ForumTopic.id == topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    return topic

@router.post("/topics/{topic_id}/like")
def like_topic(
    topic_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    topic = db.query(models.ForumTopic).filter(models.ForumTopic.id == topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    
    topic.likes += 1
    db.commit()
    return {"message": "Topic liked successfully"}

# Comments
@router.post("/topics/{topic_id}/comments", response_model=schemas.CommentResponse)
def create_comment(
    topic_id: int,
    comment: schemas.CommentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    db_comment = models.Comment(
        content=comment.content,
        user_id=current_user.id,
        topic_id=topic_id
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

@router.get("/topics/{topic_id}/comments", response_model=List[schemas.CommentResponse])
def get_comments(topic_id: int, db: Session = Depends(get_db)):
    return db.query(models.Comment).filter(models.Comment.topic_id == topic_id).all()

# Events
@router.post("/events", response_model=schemas.EventResponse)
def create_event(
    event: schemas.EventCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    db_event = models.Event(
        **event.dict(),
        created_by=current_user.id
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.get("/events", response_model=List[schemas.EventResponse])
def get_events(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    return db.query(models.Event).offset(skip).limit(limit).all()

@router.post("/events/{event_id}/join")
def join_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Check if user is already attending
    existing_attendee = db.query(models.EventAttendee).filter(
        models.EventAttendee.event_id == event_id,
        models.EventAttendee.user_id == current_user.id
    ).first()
    
    if existing_attendee:
        raise HTTPException(status_code=400, detail="Already attending this event")
    
    attendee = models.EventAttendee(event_id=event_id, user_id=current_user.id)
    db.add(attendee)
    db.commit()
    return {"message": "Successfully joined event"} 