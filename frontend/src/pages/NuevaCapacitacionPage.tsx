import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import type { Area } from '../types'
import { getAreas, createCapacitacion } from '../services/api'
import Header from '../components/Header'
import Toast from '../components/Toast'

interface FormValues {
  nombre_capacitador: string
  area_capacitadora_id: number
  tema: string
  descripcion?: string
}

const ACCEPT = '.pdf,.pptx,.docx,.mp4'

export default function NuevaCapacitacionPage() {
  const navigate = useNavigate()
  const [areas, setAreas] = useState<Area[]>([])
  const [areasDestino, setAreasDestino] = useState<number[]>([])
  const [archivo, setArchivo] = useState<File | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [toast, setToast] = useState<{ mensaje: string; tipo: 'exito' | 'error' } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  useEffect(() => {
     getAreas().then(data => setAreas(Array.isArray(data) ? data : [])).catch(() => {})
  }, [])

  const toggleArea = (id: number) => {
    setAreasDestino(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const onSubmit = async (values: FormValues) => {
    if (areasDestino.length === 0) {
      setToast({ mensaje: 'Selecciona al menos un área destino.', tipo: 'error' })
      return
    }

    const fd = new FormData()
    fd.append('nombre_capacitador', values.nombre_capacitador)
    fd.append('area_capacitadora_id', String(values.area_capacitadora_id))
    fd.append('tema', values.tema)
    if (values.descripcion) fd.append('descripcion', values.descripcion)
    fd.append('areas_destino_ids', JSON.stringify(areasDestino))
    if (archivo) fd.append('archivo', archivo)

    setEnviando(true)
    try {
      await createCapacitacion(fd)
      setToast({ mensaje: 'Capacitación registrada exitosamente.', tipo: 'exito' })
      setTimeout(() => navigate('/home'), 1500)
    } catch {
      setToast({ mensaje: 'Error al registrar la capacitación. Intenta de nuevo.', tipo: 'error' })
    } finally {
      setEnviando(false)
    }
  }

  const inputClass = `w-full px-4 py-2.5 text-sm
    bg-white dark:bg-zymo-card
    border border-black/10 dark:border-white/10
    text-gray-900 dark:text-white
    placeholder:text-gray-300 dark:placeholder:text-white/25
    focus:outline-none focus:border-zymo-red
    transition-colors`

  const labelClass = `block text-[10px] font-semibold tracking-widest uppercase mb-1.5
    text-gray-400 dark:text-white/40`

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zymo-dark transition-colors duration-300">
      <Header />

      <main className="max-w-xl mx-auto px-6 py-10">
        {/* Título */}
        <div className="mb-8">
          <div className="w-8 h-0.5 bg-zymo-red mb-3" />
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Nueva capacitación
          </h1>
          <p className="text-xs text-gray-400 dark:text-white/35 mt-1 tracking-wide">
            Completa los campos para registrar el acta
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

          {/* Nombre capacitador */}
          <div>
            <label className={labelClass}>Nombre del capacitador *</label>
            <input
              {...register('nombre_capacitador', { required: 'Campo requerido' })}
              placeholder="Ej: Carlos Méndez"
              className={inputClass}
            />
            {errors.nombre_capacitador && (
              <p className="text-[10px] text-zymo-red mt-1">{errors.nombre_capacitador.message}</p>
            )}
          </div>

          {/* Área capacitadora */}
          <div>
            <label className={labelClass}>Área capacitadora *</label>
            <select
              {...register('area_capacitadora_id', { required: 'Campo requerido', valueAsNumber: true })}
              className={inputClass}
            >
              <option value="">Selecciona un área...</option>
              {areas.map(a => (
                <option key={a.id} value={a.id}>{a.nombre}</option>
              ))}
            </select>
            {errors.area_capacitadora_id && (
              <p className="text-[10px] text-zymo-red mt-1">{errors.area_capacitadora_id.message}</p>
            )}
          </div>

          {/* Tema */}
          <div>
            <label className={labelClass}>Tema *</label>
            <input
              {...register('tema', { required: 'Campo requerido' })}
              placeholder="Ej: Manejo de inventario"
              className={inputClass}
            />
            {errors.tema && (
              <p className="text-[10px] text-zymo-red mt-1">{errors.tema.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className={labelClass}>Descripción <span className="normal-case font-normal">(opcional)</span></label>
            <textarea
              {...register('descripcion')}
              rows={3}
              placeholder="Breve descripción de la capacitación..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Áreas destino */}
          <div>
            <label className={labelClass}>Áreas destino *</label>
            <p className="text-[10px] text-gray-300 dark:text-white/25 mb-2 tracking-wide">
              Selecciona una o más áreas que recibieron la capacitación
            </p>
            <div className="flex flex-wrap gap-2">
              {areas.map(a => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => toggleArea(a.id)}
                  className={`px-3 py-1.5 text-[11px] font-medium tracking-wide border transition-colors
                    ${areasDestino.includes(a.id)
                      ? 'border-zymo-red text-zymo-red bg-zymo-red-muted'
                      : 'border-black/10 dark:border-white/10 text-gray-400 dark:text-white/40 hover:border-zymo-red/40'
                    }`}
                >
                  {a.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Archivo */}
          <div>
            <label className={labelClass}>Archivo <span className="normal-case font-normal">(opcional)</span></label>
            <div
              onClick={() => fileRef.current?.click()}
              className={`cursor-pointer border border-dashed px-4 py-5 text-center transition-colors
                ${archivo
                  ? 'border-zymo-red/50 bg-zymo-red-muted'
                  : 'border-black/10 dark:border-white/10 hover:border-zymo-red/40'
                }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept={ACCEPT}
                className="hidden"
                onChange={e => setArchivo(e.target.files?.[0] ?? null)}
              />
              {archivo ? (
                <div className="flex items-center justify-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M5 7l3 3 3-3M3 13h10"
                      stroke="#E31E24" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-xs font-medium text-zymo-red truncate max-w-xs">
                    {archivo.name}
                  </span>
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); setArchivo(null) }}
                    className="text-gray-300 hover:text-gray-500 dark:hover:text-white/60 ml-1 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs text-gray-400 dark:text-white/35">
                    Haz clic para subir un archivo
                  </p>
                  <p className="text-[10px] tracking-widest uppercase text-gray-300 dark:text-white/20">
                    PDF · PPTX · DOCX · MP4
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="flex-1 py-3 text-xs font-bold tracking-widest uppercase
                border border-black/10 dark:border-white/10
                text-gray-400 dark:text-white/40
                hover:border-black/20 dark:hover:border-white/20 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={enviando}
              className="flex-1 py-3 text-xs font-bold tracking-widest uppercase
                border border-zymo-red text-zymo-red
                hover:bg-zymo-red-muted disabled:opacity-50 transition-colors"
              style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
            >
              {enviando ? 'Guardando...' : 'Registrar'}
            </button>
          </div>

        </form>
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