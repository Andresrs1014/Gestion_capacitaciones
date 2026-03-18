from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base

class Area(Base):
    __tablename__ = "areas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), unique=True, nullable=False)
    activa = Column(Boolean, default=True)
