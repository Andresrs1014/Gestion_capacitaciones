import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Area } from '../types'
import { getAreas } from '../services/api'
import api from '../services/api'
import Header from '../components/Header'
import Toast from '../components/Toast'

export default function AreasPage() {
  const navigate = useNavigate()
  const [areas, setAreas] = useState<Area[]>([])
  const [nombre, setNombre] = useState('')
  const [cargando, setCargando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [toast, setToast] = useState<{ mensaje: string; tipo: 'exito' | 'error' } | null>(null)

  const cargarAreas = async () => {
    try {
      const data = await getAreas()
      setAreas(Array.isArray(data) ? data : [])
    } catch {
      setToast({ mensaje: 'No se pudieron cargar las áreas.', tipo: 'error' })
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { cargarAreas() }, [])

  const handleCrear = async () => {
    const nombreLimpio = nombre.trim()
    if (!nombreLimpio) return
    setEnviando(true)
    try {
      await api.post(`/api/areas/?nombre=${encodeURIComponent(nombreLimpio)}`)
      setNombre('')
      setToast({ mensaje: `Área "${nombreLimpio}" creada correctamente.`, tipo: 'exito' })
      await cargarAreas()
    } catch (err: any) {
      const msg = err?.response?.data?.detail || 'Error al crear el área.'
      setToast({ mensaje: msg, tipo: 'error' })
    } finally {
      setEnviando(false)
    }
  }

  const inputClass = `flex-1 px-4 py-2.5 text-sm
    bg-white dark:bg-zymo-card
    border border-black/10 dark:border-white/10
    text-gray-900 dark:text-white
    placeholder:text-gray-300 dark:placeholder:text-white/25
    focus:outline-none focus:border-zymo-red transition-colors`

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zymo-dark transition-colors duration-300">
      <Header />

      <main className="max-w-xl mx-auto px-6 py-10">

        {/* Título */}
        <div className="mb-8">
          <div className="w-8 h-0.5 bg-zymo-red mb-3" />
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Gestión de áreas
          </h1>
          <p className="text-xs text-gray-400 dark:text-white/35 mt-1 tracking-wide">
            Crea y consulta las áreas disponibles en el sistema
          </p>
        </div>

        {/* Formulario crear área */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-1.5
            text-gray-400 dark:text-white/40">
            Nueva área
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCrear()}
              placeholder="Ej: Logística, Comercial, P&CL..."
              className={inputClass}
            />
            <button
              onClick={handleCrear}
              disabled={enviando || !nombre.trim()}
              className="px-5 py-2.5 text-xs font-bold tracking-widest uppercase
                border border-zymo-red text-zymo-red
                hover:bg-zymo-red-muted disabled:opacity-40 transition-colors"
              style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
            >
              {enviando ? '...' : 'Crear'}
            </button>
          </div>
        </div>

        {/* Lista de áreas */}
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3
            text-gray-400 dark:text-white/40">
            Áreas registradas
          </p>

          {cargando && (
            <div className="flex items-center gap-2 py-4">
              <div className="w-4 h-4 border-2 border-zymo-red border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-300 dark:text-white/25 tracking-widest uppercase">
                Cargando...
              </span>
            </div>
          )}

          {!cargando && areas.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-xs tracking-widest uppercase text-gray-300 dark:text-white/20">
                No hay áreas registradas aún
              </p>
            </div>
          )}

          {!cargando && areas.length > 0 && (
            <div className="flex flex-col gap-2">
              {areas.map(area => (
                <div
                  key={area.id}
                  className="flex items-center justify-between px-4 py-3
                    bg-white dark:bg-zymo-card
                    border border-black/7 dark:border-white/7"
                >
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {area.nombre}
                  </span>
                  <span className="text-[9px] font-semibold tracking-widest uppercase
                    px-2 py-0.5 bg-zymo-red/10 border border-zymo-red/25 text-zymo-red">
                    Activa
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Volver */}
        <button
          onClick={() => navigate('/home')}
          className="mt-10 text-xs font-medium tracking-widest uppercase
            text-gray-300 dark:text-white/25 hover:text-zymo-red transition-colors"
        >
          ← Volver al inicio
        </button>

      </main>

      {toast && (
        <Toast
          mensaje={toast.mensaje}
          tipo={toast.tipo}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}