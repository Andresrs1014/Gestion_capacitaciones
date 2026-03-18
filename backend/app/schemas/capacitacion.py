from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

class CapacitacionCreate(BaseModel):
    nombre_capacitador: str
    area_capacitadora: str
    tema: str
    descripcion: Optional[str] = None
    areas_destino_ids: List[int]  # IDs de las áreas que reciben la capacitación

class CapacitacionResponse(BaseModel):
    id: uuid.UUID
    nombre_capacitador: str
    area_capacitadora: str
    tema: str
    descripcion: Optional[str]
    archivo_url: Optional[str]
    archivo_nombre: Optional[str]
    archivo_tipo: Optional[str]
    fecha_carga: datetime
    created_at: datetime

    class Config:
        from_attributes = True

class AreaResponse(BaseModel):
    id: int
    nombre: str
    activa: bool

    class Config:
        from_attributes = True
