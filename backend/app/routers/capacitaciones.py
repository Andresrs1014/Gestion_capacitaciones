from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.capacitacion import Capacitacion, CapacitacionArea
from app.schemas.capacitacion import CapacitacionResponse
from app.services.cloudinary_service import subir_archivo
import json

router = APIRouter()

@router.get("/", response_model=List[CapacitacionResponse])
def listar_capacitaciones(db: Session = Depends(get_db)):
    return db.query(Capacitacion).order_by(Capacitacion.created_at.desc()).all()

@router.post("/", response_model=CapacitacionResponse)
async def crear_capacitacion(
    nombre_capacitador: str = Form(...),
    area_capacitadora: str = Form(...),
    tema: str = Form(...),
    descripcion: Optional[str] = Form(None),
    areas_destino_ids: str = Form(...),  # JSON string: "[1, 2, 3]"
    archivo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    archivo_data = {}
    if archivo:
        contenido = await archivo.read()
        archivo_data = subir_archivo(contenido, str(archivo.filename))

    capacitacion = Capacitacion(
        nombre_capacitador=nombre_capacitador,
        area_capacitadora=area_capacitadora,
        tema=tema,
        descripcion=descripcion,
        archivo_url=archivo_data.get("url"),
        archivo_nombre=archivo_data.get("nombre"),
        archivo_tipo=archivo_data.get("tipo"),
        archivo_tamanio_kb=archivo_data.get("tamanio_kb")
    )
    db.add(capacitacion)
    db.flush()  # obtiene el ID sin hacer commit aún

    ids = json.loads(areas_destino_ids)
    for area_id in ids:
        relacion = CapacitacionArea(
            capacitacion_id=capacitacion.id,
            area_id=area_id
        )
        db.add(relacion)

    db.commit()
    db.refresh(capacitacion)
    return capacitacion

@router.get("/{capacitacion_id}", response_model=CapacitacionResponse)
def obtener_capacitacion(capacitacion_id: str, db: Session = Depends(get_db)):
    cap = db.query(Capacitacion).filter(Capacitacion.id == capacitacion_id).first()
    if not cap:
        raise HTTPException(status_code=404, detail="Capacitación no encontrada")
    return cap
