from fastapi import FastAPI
from .database import engine, Base
from .routers import users, therapist, appoitnment, auth, community
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SpectrumConnect API")
origins = ['*']


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(therapist.router)
app.include_router(appoitnment.router)
app.include_router(community.router)

@app.get("/")
def read_root():
    return {"message":"Welcome to SpectrumConnect API"}