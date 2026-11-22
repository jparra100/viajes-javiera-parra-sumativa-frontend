import { Link } from 'react-router-dom'

function DestinoCard({ destino }) {
  return (
    <article className="tarjeta destino-card">
      <div className="destino-card-cabecera">
        <span className="etiqueta">{destino.continente}</span>
        <h3>{destino.ciudad}</h3>
        <p className="destino-pais">{destino.pais}</p>
      </div>

      <div className="destino-card-cuerpo">
        <p>{destino.descripcion}</p>

        <h4>Actividades populares</h4>
        <ul className="lista-actividades">
          {destino.actividades.slice(0, 3).map((actividad) => (
            <li key={actividad}>{actividad}</li>
          ))}
        </ul>

        <Link to={`/destinos/${destino.id}`} className="boton">
          Ver vuelos y hoteles
        </Link>
      </div>
    </article>
  )
}

export default DestinoCard
