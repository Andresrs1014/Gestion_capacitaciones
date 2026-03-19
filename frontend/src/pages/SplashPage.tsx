import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTema } from '../context/ThemeContext'
import ThemeToggle from '../components/ThemeToggle'

export default function SplashPage() {
  const navigate = useNavigate()
  const { tema } = useTema()
  const [saliendo, setSaliendo] = useState(false)

  const handleEmpezar = () => {
    setSaliendo(true)
    setTimeout(() => navigate('/home', { replace: true }), 650)
  }

  const isDark = tema === 'dark'

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#0a0a0a]' : 'bg-white'
    }`}>

      {/* Logo watermark — opacidad controlada aquí */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
        <img
          src="/logo.png"
          alt=""
          className="w-[480px] h-[480px] object-contain"
          style={{
              opacity: isDark ? 0.20: 0.15,
              filter: isDark ? 'sepia(1) saturate(5) hue-rotate(314deg)' : 'grayscale(1)',
          }}
        />
      </div>

      {/* Grid de fondo */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:
            'linear-gradient(rgba(227,30,36,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(227,30,36,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
      )}

      {/* Esquinas decorativas */}
      {isDark && (
        <>
          {/* Esquina superior izquierda */}
          <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-zymo-red" />
          {/* Esquina superior derecha */}
          <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-zymo-red" />
          {/* Esquina inferior izquierda */}
          <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-zymo-red" />
          {/* Esquina inferior derecha */}
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-zymo-red" />
        </>
      )}

      {/* Toggle — separado de la esquina */}
      <div className="absolute top-14 right-14 z-10">
        <ThemeToggle />
      </div>

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-8">
        <p className="text-xs font-semibold tracking-[4px] uppercase text-zymo-red">
          Sistema de gestión
        </p>

        <h1 className={`text-7xl font-black leading-none tracking-tight ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          ZYMO
          <br />
          <span className="text-zymo-red">Capacitaciones</span>
        </h1>

        <div className="w-14 h-0.5 bg-zymo-red mt-1" />

        <p className={`text-xs font-light tracking-[2px] uppercase mt-1 ${
          isDark ? 'text-white/40' : 'text-gray-400'
        }`}>
          Portal interno · IMC Cargo
        </p>

        <button
          onClick={handleEmpezar}
          disabled={saliendo}
          className="mt-8 px-14 py-4 bg-zymo-red text-white
            text-sm font-bold tracking-[3px] uppercase
            hover:bg-zymo-red-hover transition-colors disabled:opacity-60"
          style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
        >
          {saliendo ? '...' : 'Empezar'}
        </button>
      </div>

      {/* Status dot */}
      <div className="absolute bottom-8 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-zymo-red animate-pulse" />
        <span className={`text-xs font-normal tracking-[2px] uppercase ${
          isDark ? 'text-white/25' : 'text-gray-300'
        }`}>
          Sistema activo
        </span>
      </div>

      {/* Overlay de salida */}
      <div className={`absolute inset-0 bg-[#0a0a0a] z-50 pointer-events-none transition-opacity duration-500 ${
        saliendo ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  )
}