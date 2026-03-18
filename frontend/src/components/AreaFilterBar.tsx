import type { Area } from '../types'

interface Props {
  areas: Area[]
  areaActiva: number | null
  onChange: (id: number | null) => void
}

export default function AreaFilterBar({ areas, areaActiva, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-white/30">
        Filtrar por área
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange(null)}
          className={`px-3 py-1 text-[11px] font-medium tracking-wide border transition-colors
            ${areaActiva === null
              ? 'border-zymo-red text-zymo-red bg-zymo-red-muted'
              : 'border-black/12 dark:border-white/12 text-gray-400 dark:text-white/40 hover:border-zymo-red/40'
            }`}
        >
          Todas
        </button>
        {areas.map(area => (
          <button
            key={area.id}
            onClick={() => onChange(area.id)}
            className={`px-3 py-1 text-[11px] font-medium tracking-wide border transition-colors
              ${areaActiva === area.id
                ? 'border-zymo-red text-zymo-red bg-zymo-red-muted'
                : 'border-black/12 dark:border-white/12 text-gray-400 dark:text-white/40 hover:border-zymo-red/40'
              }`}
          >
            {area.nombre}
          </button>
        ))}
      </div>
    </div>
  )
}