import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import VueloCard from '../components/VueloCard'
import HotelCard from '../components/HotelCard'
import ResumenViaje from '../components/ResumenViaje'
import Cargando from '../components/Cargando'
import MensajeError from '../components/MensajeError'
import { obtenerDestino } from '../services/restApi'
import { obtenerOpcionesViaje } from '../services/graphqlApi'
import '../styles/detalle.css'

function DetalleDestino() {
  const { id } = useParams()

  const [destino, setDestino] = useState(null)
  const [vuelos, setVuelos] = useState([])
  const [hoteles, setHoteles] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const [pestana, setPestana] = useState('vuelos')
  const [soloDisponibles, setSoloDisponibles] = useState(false)
  const [vueloElegido, setVueloElegido] = useState(null)
  const [hotelElegido, setHotelElegido] = useState(null)

  useEffect(() => {
    let activo = true

    Promise.all([obtenerDestino(id), obtenerOpcionesViaje(id)])
      .then(([datosDestino, opciones]) => {
        if (!activo) return
        setDestino(datosDestino)
        setVuelos(opciones.vuelos)
        setHoteles(opciones.hoteles)
        setVueloElegido(null)
        setHotelElegido(null)
        setError('')
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
  }, [id])

  if (cargando) {
    return <Cargando texto="Buscando vuelos y hoteles..." />
  }

  if (error) {
    return <MensajeError mensaje={error} />
  }

  const vuelosMostrados = soloDisponibles
    ? vuelos.filter((vuelo) => vuelo.asientosDisponibles > 0)
    : vuelos

  const hotelesMostrados = soloDisponibles
    ? hoteles.filter((hotel) => hotel.habitacionesDisponibles > 0)
    : hoteles

  return (
    <section className="pagina">
      <Link to="/destinos" className="volver">← Volver a destinos</Link>

      <div className="detalle-cabecera">
        <span className="etiqueta">{destino.continente}</span>
        <h1>{destino.ciudad}, {destino.pais}</h1>
        <p>{destino.descripcion}</p>

        <h2>Actividades populares</h2>
        <ul className="lista-actividades">
          {destino.actividades.map((actividad) => (
            <li key={actividad}>{actividad}</li>
          ))}
        </ul>
      </div>

      <div className="detalle-layout">
        <div>
          <div className="controles">
            <div className="pestanas" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={pestana === 'vuelos'}
                className={pestana === 'vuelos' ? 'activa' : ''}
                onClick={() => setPestana('vuelos')}
              >
                Vuelos ({vuelos.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={pestana === 'hoteles'}
                className={pestana === 'hoteles' ? 'activa' : ''}
                onClick={() => setPestana('hoteles')}
              >
                Hoteles ({hoteles.length})
              </button>
            </div>

            <label className="filtro">
              <input
                type="checkbox"
                checked={soloDisponibles}
                onChange={(e) => setSoloDisponibles(e.target.checked)}
              />
              Solo disponibles
            </label>
          </div>

          {pestana === 'vuelos' && (
            <div className="grilla-opciones">
              {vuelosMostrados.length === 0 && <p className="sin-resultados">No hay vuelos disponibles.</p>}
              {vuelosMostrados.map((vuelo) => (
                <VueloCard
                  key={vuelo.id}
                  vuelo={vuelo}
                  seleccionado={vueloElegido?.id === vuelo.id}
                  onSeleccionar={setVueloElegido}
                />
              ))}
            </div>
          )}

          {pestana === 'hoteles' && (
            <div className="grilla-opciones">
              {hotelesMostrados.length === 0 && <p className="sin-resultados">No hay hoteles disponibles.</p>}
              {hotelesMostrados.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  seleccionado={hotelElegido?.id === hotel.id}
                  onSeleccionar={setHotelElegido}
                />
              ))}
            </div>
          )}
        </div>

        <ResumenViaje destino={destino} vuelo={vueloElegido} hotel={hotelElegido} />
      </div>
    </section>
  )
}

export default DetalleDestino
