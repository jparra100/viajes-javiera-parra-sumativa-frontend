import { formatearFecha, formatearPrecio } from '../utils/formato'

function HotelCard({ hotel, seleccionado, onSeleccionar }) {
  const agotado = hotel.habitacionesDisponibles === 0

  return (
    <article className={`tarjeta opcion-card ${seleccionado ? 'seleccionada' : ''}`}>
      <div className="opcion-card-titulo">
        <h3>{hotel.nombre}</h3>
        {agotado ? (
          <span className="estado agotado">Agotado</span>
        ) : (
          <span className="estado disponible">{hotel.habitacionesDisponibles} habitaciones</span>
        )}
      </div>

      <p className="estrellas" aria-label={`${hotel.estrellas} estrellas`}>
        {'★'.repeat(hotel.estrellas)}
        <span>{'★'.repeat(5 - hotel.estrellas)}</span>
      </p>

      <ul className="opcion-detalles">
        <li><strong>Disponible desde:</strong> {formatearFecha(hotel.disponibleDesde)}</li>
        <li><strong>Disponible hasta:</strong> {formatearFecha(hotel.disponibleHasta)}</li>
      </ul>

      <p className="precio">{formatearPrecio(hotel.precioNoche)} <span>por noche</span></p>

      <button
        type="button"
        className="boton"
        disabled={agotado}
        onClick={() => onSeleccionar(hotel)}
      >
        {seleccionado ? 'Seleccionado' : 'Elegir hotel'}
      </button>
    </article>
  )
}

export default HotelCard
