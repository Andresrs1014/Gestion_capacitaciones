from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import capacitaciones, areas

app = FastAPI(title="Portal de Capacitaciones", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(capacitaciones.router, prefix="/api/capacitaciones", tags=["Capacitaciones"])
app.include_router(areas.router, prefix="/api/areas", tags=["Áreas"])

@app.get("/")
def root():
    return {"status": "ok", "message": "Portal de Capacitaciones API"}
