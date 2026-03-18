import { useEffect, useState, useMemo } from 'react'
import type { Capacitacion, Area } from '../types'
import { getCapacitaciones, getAreas } from '../services/api'
import Header from '../components/Header'
import CapacitacionCard from '../components/CapacitacionCard'
import AreaFilterBar from '../components/AreaFilterBar'

export default function HomePage() {
  const [capacitaciones, setCapacitaciones] = useState<Capacitacion[]>([])
  const [areas, setAreas] = useState<Area[]>([])
  const [areaActiva, setAreaActiva] = useState<number | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cargar = async () => {
      try {
        const [caps, ars] = await Promise.all([getCapacitaciones(), getAreas()])
        setCapacitaciones(Array.isArray(caps) ? caps : [])
        setAreas(Array.isArray(ars) ? ars : [])
      } catch {
        setError('No se pudo cargar la información. Verifica que el backend esté activo.')
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  const filtradas = useMemo(() => {
    if (areaActiva === null) return capacitaciones
    return capacitaciones.filter(
      c =>
        c.area_capacitadora.id === areaActiva ||
        c.areas_destino.some(a => a.id === areaActiva)
    )
  }, [capacitaciones, areaActiva])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zymo-dark transition-colors duration-300">
      <Header />

      <main className="max-w-7xl mx-auto px-7 py-8">
        <AreaFilterBar areas={areas} areaActiva={areaActiva} onChange={setAreaActiva} />

        {/* Estados */}
        {cargando && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-zymo-red border-t-transparent rounded-full animate-spin" />
              <p className="text-xs tracking-widest uppercase text-gray-400 dark:text-white/30">
                Cargando capacitaciones...
              </p>
            </div>
          </div>
        )}

        {!cargando && error && (
          <div className="border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 px-5 py-4">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {!cargando && !error && filtradas.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-12 h-0.5 bg-zymo-red/30" />
            <p className="text-xs tracking-widest uppercase text-gray-300 dark:text-white/20">
              No hay capacitaciones registradas
            </p>
            <div className="w-12 h-0.5 bg-zymo-red/30" />
          </div>
        )}

        {!cargando && !error && filtradas.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtradas.map(cap => (
              <CapacitacionCard key={cap.id} cap={cap} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}