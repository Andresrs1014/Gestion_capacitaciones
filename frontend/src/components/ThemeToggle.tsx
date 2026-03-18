import { useTema } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { tema, toggleTema } = useTema()

  return (
    <button
      onClick={toggleTema}
      className="relative w-10 h-5 rounded-full bg-zymo-red transition-all focus:outline-none"
      aria-label="Cambiar tema"
    >
      <span
        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
          tema === 'dark' ? 'right-0.5' : 'left-0.5'
        }`}
      />
    </button>
  )
}