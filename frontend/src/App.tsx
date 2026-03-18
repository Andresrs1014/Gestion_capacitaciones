import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import SplashPage from './pages/SplashPage'
import HomePage from './pages/HomePage'
import NuevaCapacitacionPage from './pages/NuevaCapacitacionPage'
import AreasPage from './pages/AreasPage'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/nueva" element={<NuevaCapacitacionPage />} />
          <Route path="/areas" element={<AreasPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App