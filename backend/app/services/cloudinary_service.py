import cloudinary
import cloudinary.uploader
from app.core.config import CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD_NAME,
    api_key=CLOUDINARY_API_KEY,
    api_secret=CLOUDINARY_API_SECRET
)

def subir_archivo(file_bytes: bytes, filename: str, folder: str = "capacitaciones") -> dict:
    resultado = cloudinary.uploader.upload(
        file_bytes,
        folder=folder,
        resource_type="auto",  # detecta pdf, pptx, mp4, etc.
        public_id=filename,
        overwrite=False,
        access_mode="public"
    )
    return {
    "url": resultado["secure_url"],
    "nombre": filename,
    "tipo": resultado.get("format") or resultado.get("resource_type") or filename.split(".")[-1],
    "tamanio": resultado.get("bytes", 0)
}
