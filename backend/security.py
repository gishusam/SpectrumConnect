from jose import JWTError,jwt
from datetime import datetime,timedelta
from . import schemas,database,models
from fastapi import HTTPException,status,Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from .config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes

def create_access_token(data: dict): 

    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)

    return encoded_jwt

def verify_access_token(token: str, credetials_exception):
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])

        id: str = payload.get("user_id")

        if id is None:
            raise credetials_exception
        token_data = schemas.TokenData(id=str(id))

    except JWTError:
        raise credetials_exception  

    return token_data  
    
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credential_exception = HTTPException(status.HTTP_401_UNAUTHORIZED, detail = f"Invalid credentials",
                                         headers={"WWW.Authenticate": "Bearer"})
    
    token = verify_access_token(token, credential_exception)  

    user = db.query(models.User).filter(models.User.id == token.id).first()
    
    return user   

def check_user_role(required_role: str):
    def role_checker(current_user: models.User = Depends(get_current_user)):
        if current_user.userType != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. {required_role} role required."
            )
        return current_user
    return role_checker

