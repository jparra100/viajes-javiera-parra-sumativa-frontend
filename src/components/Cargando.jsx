function Cargando({ texto = 'Cargando...' }) {
  return (
    <div className="cargando" role="status">
      <div className="spinner"></div>
      <p>{texto}</p>
    </div>
  )
}

export default Cargando
