import { formatearFecha, formatearPrecio } from '../utils/formato'

function VueloCard({ vuelo, seleccionado, onSeleccionar }) {
  const agotado = vuelo.asientosDisponibles === 0

  return (
    <article className={`tarjeta opcion-card ${seleccionado ? 'seleccionada' : ''}`}>
      <div className="opcion-card-titulo">
        <h3>{vuelo.aerolinea}</h3>
        {agotado ? (
          <span className="estado agotado">Agotado</span>
        ) : (
          <span className="estado disponible">{vuelo.asientosDisponibles} asientos</span>
        )}
      </div>

      <ul className="opcion-detalles">
        <li><strong>Origen:</strong> {vuelo.origen}</li>
        <li><strong>Ida:</strong> {formatearFecha(vuelo.fechaIda)}</li>
        <li><strong>Vuelta:</strong> {formatearFecha(vuelo.fechaVuelta)}</li>
        <li><strong>Escalas:</strong> {vuelo.escalas === 0 ? 'Directo' : vuelo.escalas}</li>
      </ul>

      <p className="precio">{formatearPrecio(vuelo.precio)} <span>ida y vuelta</span></p>

      <button
        type="button"
        className="boton"
        disabled={agotado}
        onClick={() => onSeleccionar(vuelo)}
      >
        {seleccionado ? 'Seleccionado' : 'Elegir vuelo'}
      </button>
    </article>
  )
}

export default VueloCard
