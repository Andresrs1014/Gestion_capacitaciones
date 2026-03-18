import { useEffect } from 'react'

interface Props {
  mensaje: string
  tipo: 'exito' | 'error'
  onClose: () => void
}

export default function Toast({ mensaje, tipo, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3
      px-5 py-3 text-sm font-medium tracking-wide shadow-lg
      border-l-4 bg-white dark:bg-zymo-card
      ${tipo === 'exito'
        ? 'border-zymo-red text-gray-800 dark:text-white'
        : 'border-red-700 text-red-700 dark:text-red-400'
      }`}
    >
      <span>{tipo === 'exito' ? '✓' : '✕'}</span>
      <span>{mensaje}</span>
      <button onClick={onClose} className="ml-2 text-gray-300 hover:text-gray-500 dark:hover:text-white/60">✕</button>
    </div>
  )
}