from fastapi import FastAPI,Response,status,HTTPException,Depends,APIRouter
from .. import models,schemas,database,utils,security
from sqlalchemy.orm import Session
from ..database import get_db

router = APIRouter(
    prefix="/therapists",
    tags=['Therapists']
)

@router.post("/", response_model=schemas.TherapistResponse)
def create_therapist(therapist: schemas.TherapistCreate,db: Session = Depends(database.get_db),
                     current_user=Depends(security.get_current_user)  
):
    
    if current_user.userType != "therapist":
        raise HTTPException(status_code=403, detail="Only therapists can create a profile.")

    existing_therapist = db.query(models.Therapist).filter(models.Therapist.user_id == current_user.id).first()
    if existing_therapist:
        raise HTTPException(status_code=400, detail="Therapist profile already exists.")

    new_therapist = models.Therapist(
        user_id=current_user.id,
        name=therapist.name,
        specialization=therapist.specialization,
        experience=therapist.experience,
        contact=therapist.contact,
        bio=therapist.bio
    )

    db.add(new_therapist)
    db.commit()
    db.refresh(new_therapist)
    return new_therapist

@router.get("/", response_model=list[schemas.TherapistResponse])
def get_all_therapists(db: Session = Depends(database.get_db)):
    return db.query(models.Therapist).all()

@router.get("/me", response_model=schemas.TherapistResponse)
def get_my_profile(db: Session = Depends(database.get_db),current_user=Depends(security.get_current_user)):
    therapist = db.query(models.Therapist).filter(models.Therapist.user_id == current_user.id).first()
    if not therapist:
        raise HTTPException(status_code=404, detail="Therapist profile not found. Please complete your setup.")
    return therapist

@router.get("/{therapist_id}", response_model=schemas.TherapistResponse)
def get_therapist(therapist_id: int, db: Session = Depends(database.get_db)):
    therapist = db.query(models.Therapist).filter(models.Therapist.id == therapist_id).first()
    if not therapist:
        raise HTTPException(status_code=404, detail="Therapist not found")
    return therapist





