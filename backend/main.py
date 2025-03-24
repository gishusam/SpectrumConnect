from fastapi import FastAPI
from .database import engine, Base
from .routers import users, therapist, appoitnment,auth

app = FastAPI(title="SpectrumConnect API")

Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(therapist.router)
app.include_router(appoitnment.router)

@app.get("/")
def read_root():
    return {"message":"Welcome to SpectrumConnect API"}