from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

class AreaResponse(BaseModel):
    id: int
    nombre: str
    activa: bool

    class Config:
        from_attributes = True

class CapacitacionCreate(BaseModel):
    nombre_capacitador: str
    area_capacitadora_id: int        # ← ahora es ID, no string
    tema: str
    descripcion: Optional[str] = None
    areas_destino_ids: List[int]

class CapacitacionResponse(BaseModel):
    id: uuid.UUID
    nombre_capacitador: str
    area_capacitadora: AreaResponse  # ← devuelve el objeto completo del área
    tema: str
    descripcion: Optional[str]
    archivo_url: Optional[str]
    archivo_nombre: Optional[str]
    archivo_tipo: Optional[str]
    archivo_tamanio: Optional[int]
    fecha_carga: datetime
    created_at: datetime
    areas_destino: List[AreaResponse]  # ← nuevo, áreas que reciben la capacitación

    class Config:
        from_attributes = True