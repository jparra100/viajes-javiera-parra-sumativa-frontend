import { useEffect, useState } from 'react'
import DestinoCard from '../components/DestinoCard'
import Cargando from '../components/Cargando'
import { obtenerDestinos } from '../services/restApi'
import '../styles/destinos.css'

function normalizar(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

function Destinos() {
  const [destinos, setDestinos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    let activo = true

    obtenerDestinos()
      .then((datos) => {
        if (activo) setDestinos(datos)
      })
      .catch((err) => {
        if (activo) setError(err.message)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [])

  const destinosFiltrados = destinos.filter((destino) => {
    const texto = normalizar(`${destino.ciudad} ${destino.pais} ${destino.continente}`)
    return texto.includes(normalizar(busqueda))
  })

  return (
    <section className="pagina">
      <div className="pagina-encabezado">
        <h1>Destinos disponibles</h1>
        <p>Selecciona un destino para ver sus vuelos y hoteles.</p>
      </div>

      <div className="buscador">
        <label htmlFor="busqueda">Buscar destino</label>
        <input
          id="busqueda"
          type="search"
          placeholder="Ej: Perú, Roma, Europa..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {cargando && <Cargando texto="Cargando destinos..." />}

      {error && (
        <div className="mensaje-error" role="alert">
          <p>{error}</p>
        </div>
      )}

      {!cargando && !error && destinosFiltrados.length === 0 && (
        <p className="sin-resultados">No encontramos destinos para "{busqueda}".</p>
      )}

      <div className="grilla">
        {destinosFiltrados.map((destino) => (
          <DestinoCard key={destino.id} destino={destino} />
        ))}
      </div>
    </section>
  )
}

export default Destinos
