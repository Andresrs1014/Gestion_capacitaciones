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
    setTimeout(() => navigate('/home'), 650)
  }

  const isDark = tema === 'dark'

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}
    >
      {/* Logo como watermark de fondo */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <img
          src="/logo.png"
          alt=""
          className={`w-[420px] h-[420px] object-contain ${
            isDark ? 'opacity-[0.06]' : 'opacity-[0.04]'
          }`}
          style={{ filter: isDark ? 'none' : 'grayscale(1)' }}
        />
      </div>

      {/* Grid de fondo */}
      {isDark && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(227,30,36,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(227,30,36,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      )}

      {/* Esquinas decorativas */}
      {isDark && (
        <>
          <div className="absolute top-6 left-6 w-9 h-9 border-t-2 border-l-2 border-zymo-red" />
          <div className="absolute top-6 right-6 w-9 h-9 border-t-2 border-r-2 border-zymo-red" />
          <div className="absolute bottom-6 left-6 w-9 h-9 border-b-2 border-l-2 border-zymo-red" />
          <div className="absolute bottom-6 right-6 w-9 h-9 border-b-2 border-r-2 border-zymo-red" />
        </>
      )}

      {/* Toggle de tema — arriba derecha */}
      <div className="absolute top-6 right-6 z-10" style={{ top: isDark ? '3rem' : '1.5rem' }}>
        <ThemeToggle />
      </div>

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-8">
        <p
          className={`text-[11px] font-semibold tracking-[4px] uppercase ${
            isDark ? 'text-zymo-red' : 'text-zymo-red'
          }`}
        >
          Sistema de gestión
        </p>

        <h1
          className={`text-6xl font-black leading-none tracking-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          ZYMO
          <br />
          <span className="text-zymo-red">Capacitaciones</span>
        </h1>

        <div className="w-12 h-0.5 bg-zymo-red mt-1" />

        <p
          className={`text-[11px] font-light tracking-[2px] uppercase mt-1 ${
            isDark ? 'text-white/40' : 'text-gray-400'
          }`}
        >
          Portal interno · IMC Cargo
        </p>

        <button
          onClick={handleEmpezar}
          disabled={saliendo}
          className="mt-6 px-12 py-3.5 bg-zymo-red text-white
            text-[12px] font-bold tracking-[3px] uppercase
            hover:bg-zymo-red-hover transition-colors disabled:opacity-60"
          style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
        >
          {saliendo ? '...' : 'Empezar'}
        </button>
      </div>

      {/* Status dot */}
      <div className="absolute bottom-8 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-zymo-red animate-pulse" />
        <span
          className={`text-[10px] font-normal tracking-[2px] uppercase ${
            isDark ? 'text-white/25' : 'text-gray-300'
          }`}
        >
          Sistema activo
        </span>
      </div>

      {/* Overlay de salida */}
      <div
        className={`absolute inset-0 bg-[#0a0a0a] z-50 transition-opacity duration-600 pointer-events-none ${
          saliendo ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}