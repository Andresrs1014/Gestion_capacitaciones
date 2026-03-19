import type { Capacitacion } from '../types'
import FileIcon from './FileIcon'

interface Props {
  cap: Capacitacion
}

const formatFecha = (iso: string) =>
  new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric',
  })

export default function CapacitacionCard({ cap }: Props) {
  const areasExtra = cap.areas_destino.length > 2 ? cap.areas_destino.length - 2 : 0

  return (
    <div className="relative overflow-hidden
      bg-white dark:bg-zymo-card
      border border-black/7 dark:border-white/7
      shadow-sm dark:shadow-none
      p-5 flex flex-col gap-4
      hover:border-zymo-red/30 transition-colors">

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-zymo-red" />

      <span className="self-start text-[11px] font-semibold tracking-widest uppercase
        px-2.5 py-1
        bg-zymo-red/10 border border-zymo-red/25 text-zymo-red">
        {cap.area_capacitadora.nombre}
      </span>

      <h3 className="text-base font-bold leading-snug text-gray-900 dark:text-white">
        {cap.tema}
      </h3>

      <p className="text-sm text-gray-400 dark:text-white/40 -mt-2">
        Por {cap.nombre_capacitador}
      </p>

      {cap.areas_destino.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {cap.areas_destino.slice(0, 2).map(a => (
            <span key={a.id}
              className="text-[10px] font-medium px-2 py-0.5 tracking-wide
                bg-black/5 dark:bg-white/5
                border border-black/10 dark:border-white/10
                text-gray-500 dark:text-white/40">
              {a.nombre}
            </span>
          ))}
          {areasExtra > 0 && (
            <span className="text-[10px] font-medium px-2 py-0.5 tracking-wide
              bg-black/5 dark:bg-white/5
              border border-black/10 dark:border-white/10
              text-gray-500 dark:text-white/40">
              +{areasExtra}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-3
        border-t border-black/6 dark:border-white/6 mt-auto">
        <span className="text-xs tracking-wide text-gray-300 dark:text-white/25">
          {formatFecha(cap.fecha_carga)}
        </span>
        <FileIcon tipo={cap.archivo_tipo} nombre={cap.archivo_nombre} url={cap.archivo_url} />
      </div>
    </div>
  )
}