import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Tema } from '../types'

interface ThemeContextType {
  tema: Tema
  toggleTema: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  tema: 'dark',
  toggleTema: () => {},
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [tema, setTema] = useState<Tema>(() => {
    return (localStorage.getItem('zymo-tema') as Tema) || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (tema === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('zymo-tema', tema)
  }, [tema])

  const toggleTema = () => setTema(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTema = () => useContext(ThemeContext)