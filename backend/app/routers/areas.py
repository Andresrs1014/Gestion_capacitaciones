from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.area import Area
from app.schemas.capacitacion import AreaResponse
from typing import List

router = APIRouter()

@router.get("/", response_model=List[AreaResponse])
def listar_areas(db: Session = Depends(get_db)):
    return db.query(Area).filter(Area.activa == True).all()

@router.post("/", response_model=AreaResponse)
def crear_area(nombre: str, db: Session = Depends(get_db)):
    existe = db.query(Area).filter(Area.nombre == nombre).first()
    if existe:
        raise HTTPException(status_code=400, detail="El área ya existe")
    area = Area(nombre=nombre)
    db.add(area)
    db.commit()
    db.refresh(area)
    return area
