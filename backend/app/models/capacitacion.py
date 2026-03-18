from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.database import Base

class Capacitacion(Base):
    
    __tablename__ = "capacitaciones"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nombre_capacitador = Column(String(100), nullable=False)
    area_capacitadora = Column(String(150), nullable=False)
    fecha_carga = Column(DateTime(timezone=True), server_default=func.now())
    tema = Column(String(255), nullable=False)
    descripcion = Column(Text, nullable=True)
    archivo_url = Column(String(500), nullable=True)
    archivo_nombre = Column(String(255), nullable=True)
    archivo_tipo = Column(String(50), nullable=True)
    archivo_tamanio = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    areas = relationship("CapacitacionArea", back_populates="capacitacion")
    
class CapacitacionArea(Base):
    __tablename__ = "capacitacion_areas"

    capacitacion_id = Column(UUID(as_uuid=True), ForeignKey("capacitaciones.id", ondelete="CASCADE"), primary_key=True)
    area_id = Column(Integer, ForeignKey("areas.id"), primary_key=True)

    capacitacion = relationship("Capacitacion", back_populates="areas")
    area = relationship("Area")