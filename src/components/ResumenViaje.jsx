import { calcularNoches, formatearPrecio } from '../utils/formato'

function ResumenViaje({ destino, vuelo, hotel }) {
  const noches = vuelo ? calcularNoches(vuelo.fechaIda, vuelo.fechaVuelta) : 0
  const totalHotel = hotel ? hotel.precioNoche * noches : 0
  const total = (vuelo ? vuelo.precio : 0) + totalHotel

  return (
    <aside className="resumen">
      <h3>Resumen de tu viaje</h3>
      <p className="resumen-destino">{destino.ciudad}, {destino.pais}</p>

      <ul>
        <li>
          <span>Vuelo</span>
          <span>{vuelo ? `${vuelo.aerolinea} · ${formatearPrecio(vuelo.precio)}` : 'Sin elegir'}</span>
        </li>
        <li>
          <span>Hotel</span>
          <span>{hotel ? hotel.nombre : 'Sin elegir'}</span>
        </li>
        {vuelo && hotel && (
          <li>
            <span>{noches} noches</span>
            <span>{formatearPrecio(totalHotel)}</span>
          </li>
        )}
      </ul>

      {vuelo && hotel ? (
        <p className="resumen-total">Total estimado: {formatearPrecio(total)}</p>
      ) : (
        <p className="resumen-ayuda">Elige un vuelo y un hotel para ver el total estimado.</p>
      )}
    </aside>
  )
}

export default ResumenViaje
