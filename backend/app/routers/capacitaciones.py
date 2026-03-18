from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from app.database import get_db
from app.models.capacitacion import Capacitacion, CapacitacionArea
from app.models.area import Area
from app.schemas.capacitacion import CapacitacionResponse
from app.services.cloudinary_service import subir_archivo
import json

router = APIRouter()

def capacitacion_to_response(cap: Capacitacion) -> dict:
    """Convierte un objeto Capacitacion al formato de respuesta incluyendo áreas destino."""
    return {
        "id": cap.id,
        "nombre_capacitador": cap.nombre_capacitador,
        "area_capacitadora": cap.area_capacitadora,
        "tema": cap.tema,
        "descripcion": cap.descripcion,
        "archivo_url": cap.archivo_url,
        "archivo_nombre": cap.archivo_nombre,
        "archivo_tipo": cap.archivo_tipo,
        "archivo_tamanio": cap.archivo_tamanio,
        "fecha_carga": cap.fecha_carga,
        "created_at": cap.created_at,
        "areas_destino": [rel.area for rel in cap.areas],
    }

@router.get("/", response_model=List[CapacitacionResponse])
def listar_capacitaciones(db: Session = Depends(get_db)):
    caps = (
        db.query(Capacitacion)
        .options(
            joinedload(Capacitacion.area_capacitadora),
            joinedload(Capacitacion.areas).joinedload(CapacitacionArea.area),
        )
        .order_by(Capacitacion.created_at.desc())
        .all()
    )
    return [capacitacion_to_response(c) for c in caps]

@router.post("/", response_model=CapacitacionResponse)
async def crear_capacitacion(
    nombre_capacitador: str = Form(...),
    area_capacitadora_id: int = Form(...),       # ← ahora recibe ID
    tema: str = Form(...),
    descripcion: Optional[str] = Form(None),
    areas_destino_ids: str = Form(...),           # JSON string: "[1, 2, 3]"
    archivo: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    # Verificar que el área capacitadora existe
    area = db.query(Area).filter(Area.id == area_capacitadora_id, Area.activa == True).first()
    if not area:
        raise HTTPException(status_code=404, detail="Área capacitadora no encontrada")

    archivo_data = {}
    if archivo:
        contenido = await archivo.read()
        archivo_data = subir_archivo(contenido, str(archivo.filename))

    capacitacion = Capacitacion(
        nombre_capacitador=nombre_capacitador,
        area_capacitadora_id=area_capacitadora_id,
        tema=tema,
        descripcion=descripcion,
        archivo_url=archivo_data.get("url"),
        archivo_nombre=archivo_data.get("nombre"),
        archivo_tipo=archivo_data.get("tipo"),
        archivo_tamanio=archivo_data.get("tamanio"),
    )
    db.add(capacitacion)
    db.flush()

    ids = json.loads(areas_destino_ids)
    if isinstance(ids, int):
        ids = [ids]
    for area_id in ids:
        relacion = CapacitacionArea(
            capacitacion_id=capacitacion.id,
            area_id=area_id
        )
        db.add(relacion)

    db.commit()
    db.refresh(capacitacion)

    # Recargar con relaciones para la respuesta
    cap_completa = (
        db.query(Capacitacion)
        .options(
            joinedload(Capacitacion.area_capacitadora),
            joinedload(Capacitacion.areas).joinedload(CapacitacionArea.area),
        )
        .filter(Capacitacion.id == capacitacion.id)
        .first()
    )
    return capacitacion_to_response(cap_completa)

@router.get("/{capacitacion_id}", response_model=CapacitacionResponse)
def obtener_capacitacion(capacitacion_id: str, db: Session = Depends(get_db)):
    cap = (
        db.query(Capacitacion)
        .options(
            joinedload(Capacitacion.area_capacitadora),
            joinedload(Capacitacion.areas).joinedload(CapacitacionArea.area),
        )
        .filter(Capacitacion.id == capacitacion_id)
        .first()
    )
    if not cap:
        raise HTTPException(status_code=404, detail="Capacitación no encontrada")
    return capacitacion_to_response(cap)