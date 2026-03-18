import { useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-7 h-14
      bg-white/95 dark:bg-zymo-dark/95 backdrop-blur-sm
      border-b border-black/8 dark:border-white/7">

      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/home')}>
        <img src="/logo.png" alt="ZYMO" className="h-7 w-7 object-contain opacity-90" />
        <div>
          <p className="text-sm font-bold tracking-wide text-gray-900 dark:text-white leading-none">
            ZYMO Capacitaciones
          </p>
          <p className="text-[10px] font-normal tracking-widest uppercase text-gray-400 dark:text-white/40 mt-0.5">
            P&CL · Desarrollo e innovación
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={() => navigate('/areas')}
          className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase
            border border-black/10 dark:border-white/10
            text-gray-400 dark:text-white/40
            hover:border-zymo-red/40 hover:text-zymo-red transition-colors"
          style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
        >
          Áreas
        </button>
        <button
          onClick={() => navigate('/nueva')}
          className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase
            border border-zymo-red text-zymo-red bg-transparent
            hover:bg-zymo-red-muted transition-colors"
          style={{ clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)' }}
        >
          + Nueva
        </button>
      </div>
    </header>
  )
}