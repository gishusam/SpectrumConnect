from fastapi import HTTPException,Response,Depends,APIRouter,status
from .. import database,schemas, models, utils, security
from sqlalchemy.orm import session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

router = APIRouter(tags= ["Authentication"])

@router.post("/login",response_model=schemas.Token)
def userlogin(user_credentials: schemas.UserLogin, db: session = Depends(database.get_db)):

    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=f"invalid credentials")

    if not utils.verify(user_credentials.password,user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail=f"Invalid credentials")
    
    if user.userType != user_credentials.userType:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid user type")
    
    access_token = security.create_access_token(data={"user_id": user.id})
    
    return {"access_token" : access_token, "token_type": "bearer"}