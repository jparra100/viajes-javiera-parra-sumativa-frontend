export function formatearPrecio(valor) {
  return `$${valor.toLocaleString('es-CL')}`
}

export function formatearFecha(fecha) {
  const [anio, mes, dia] = fecha.split('-')
  return `${dia}-${mes}-${anio}`
}

export function calcularNoches(fechaIda, fechaVuelta) {
  const ida = new Date(`${fechaIda}T00:00:00`)
  const vuelta = new Date(`${fechaVuelta}T00:00:00`)
  return Math.round((vuelta - ida) / (1000 * 60 * 60 * 24))
}
