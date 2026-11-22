import { Link } from 'react-router-dom'

function MensajeError({ mensaje }) {
  return (
    <div className="mensaje-error" role="alert">
      <p>{mensaje}</p>
      <Link to="/destinos" className="boton boton-secundario">
        Volver a destinos
      </Link>
    </div>
  )
}

export default MensajeError
