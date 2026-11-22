import { Link } from 'react-router-dom'
import '../styles/inicio.css'

const pasos = [
  { numero: 1, titulo: 'Elige tu destino', texto: 'Revisa los destinos disponibles y sus actividades más populares.' },
  { numero: 2, titulo: 'Compara vuelos', texto: 'Mira precios, fechas y asientos disponibles de cada aerolínea.' },
  { numero: 3, titulo: 'Reserva tu hotel', texto: 'Escoge el alojamiento que más te acomode y calcula el total.' },
]

function Inicio() {
  return (
    <>
      <section className="hero">
        <div className="hero-texto">
          <h1>Planifica tu próximo viaje en un solo lugar</h1>
          <p>
            En Rumbo Viajes encuentras destinos, vuelos y hoteles para armar tu viaje a tu medida.
          </p>
          <Link to="/destinos" className="boton boton-grande">
            Ver destinos
          </Link>
        </div>
      </section>

      <section className="pasos">
        <h2>¿Cómo funciona?</h2>
        <div className="pasos-grilla">
          {pasos.map((paso) => (
            <article key={paso.numero} className="tarjeta paso">
              <span className="paso-numero">{paso.numero}</span>
              <h3>{paso.titulo}</h3>
              <p>{paso.texto}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default Inicio
