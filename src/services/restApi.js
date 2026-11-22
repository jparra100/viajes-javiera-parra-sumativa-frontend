const URL_API = '/api'

export async function obtenerDestinos() {
  const respuesta = await fetch(`${URL_API}/destinos`)

  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar los destinos')
  }

  return respuesta.json()
}

export async function obtenerDestino(id) {
  const respuesta = await fetch(`${URL_API}/destinos/${id}`)

  if (respuesta.status === 404) {
    throw new Error('El destino que buscas no existe')
  }

  if (!respuesta.ok) {
    throw new Error('No se pudo cargar el destino')
  }

  return respuesta.json()
}
