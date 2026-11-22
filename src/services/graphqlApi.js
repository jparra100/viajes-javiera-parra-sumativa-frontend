const URL_GRAPHQL = '/graphql'

const QUERY_OPCIONES_VIAJE = `
  query ObtenerOpcionesViaje($destinoId: ID!) {
    vuelos(destinoId: $destinoId) {
      id
      aerolinea
      origen
      fechaIda
      fechaVuelta
      precio
      asientosDisponibles
      escalas
    }
    hoteles(destinoId: $destinoId) {
      id
      nombre
      estrellas
      precioNoche
      disponibleDesde
      disponibleHasta
      habitacionesDisponibles
    }
  }
`

export async function obtenerOpcionesViaje(destinoId) {
  const respuesta = await fetch(URL_GRAPHQL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: QUERY_OPCIONES_VIAJE,
      variables: { destinoId: String(destinoId) },
    }),
  })

  const resultado = await respuesta.json()

  if (!respuesta.ok || resultado.errors) {
    throw new Error('No se pudieron cargar los vuelos y hoteles')
  }

  return resultado.data
}
