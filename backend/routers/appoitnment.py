from fastapi import FastAPI,Response,status,HTTPException,Depends,APIRouter
from .. import models,schemas,database,utils,security
from sqlalchemy.orm import Session
from ..database import get_db

router = APIRouter(
    prefix="/appointments",
    tags=['Appointments']
)

@router.post("/", response_model=schemas.AppointmentResponse)
def create_appointment(appointment: schemas.AppointmentCreate, db:Session = Depends(database.get_db),
                       current_user = Depends(security.get_current_user)):
    
    therapist = db.query(models.Therapist).filter(models.Therapist.id == appointment.therapist_id, models.User.role == "therapist").first()
    if not therapist:
        raise HTTPException(status_code=404, detail="Therapist not found")
    
    new_appointment = models.Appointment(
        user_id=current_user.id,
        therapist_id=appointment.therapist_id,
        scheduled_time=appointment.scheduled_time,
        status="pending"
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)
    return new_appointment


@router.get("/pending", response_model=list[schemas.AppointmentResponse])
def view_pending_appointments(db: Session = Depends(database.get_db),
                              current_user=Depends(security.get_current_user)):
    
    therapist = db.query(models.Therapist).filter(models.Therapist.user_id == current_user.id).first()
    
    if not therapist:
        raise HTTPException(status_code=404, detail="Therapist profile not found")
    
    appointments = db.query(models.Appointment).filter(models.Appointment.therapist_id == therapist.id,
                                                        models.Appointment.status == "pending").all()

    if not appointments:
        raise HTTPException(status_code=404, detail="No pending appointments found")

    return appointments

@router.put("/{appointment_id}/confirm", response_model=schemas.AppointmentResponse)
def confirm_appointment(appointment_id: int,db: Session = Depends(database.get_db),
                        current_user=Depends(security.get_current_user)):
   
    therapist = db.query(models.Therapist).filter(models.Therapist.user_id == current_user.id).first()

    if not therapist:
        raise HTTPException(status_code=403, detail="You are not registered as a therapist")

    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id,
                                                      models.Appointment.therapist_id == therapist.id).first()

    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found or unauthorized")

    appointment.status = "confirmed"
    db.commit()
    db.refresh(appointment)

    print(f"📩 Notification: Appointment {appointment_id} confirmed for user {appointment.user_id}")

    return appointment
