import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Destinos from './pages/Destinos'
import DetalleDestino from './pages/DetalleDestino'
import NoEncontrada from './pages/NoEncontrada'

function App() {
  return (
    <HashRouter>
      <Navbar />
      <main className="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/destinos/:id" element={<DetalleDestino />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}

export default App
