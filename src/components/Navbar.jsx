import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles/navbar.css'

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <header className="navbar">
      <div className="navbar-contenedor">
        <Link to="/" className="navbar-logo" onClick={cerrarMenu}>
          Rumbo<span>Viajes</span>
        </Link>

        <button
          type="button"
          className="navbar-boton"
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={menuAbierto ? 'navbar-links abierto' : 'navbar-links'}>
          <NavLink to="/" end onClick={cerrarMenu}>
            Inicio
          </NavLink>
          <NavLink to="/destinos" onClick={cerrarMenu}>
            Destinos
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
