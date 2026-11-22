import { http, HttpResponse, delay } from 'msw'
import { graphql } from 'msw/graphql'
import { destinos, vuelos, hoteles } from './datos'

const apiGraphql = graphql.link('/graphql')

export const handlers = [
  http.get('/api/destinos', async () => {
    await delay(500)
    return HttpResponse.json(destinos)
  }),

  http.get('/api/destinos/:id', async ({ params }) => {
    await delay(300)
    const destino = destinos.find((d) => d.id === Number(params.id))

    if (!destino) {
      return HttpResponse.json({ mensaje: 'Destino no encontrado' }, { status: 404 })
    }

    return HttpResponse.json(destino)
  }),

  apiGraphql.query('ObtenerOpcionesViaje', async ({ variables }) => {
    await delay(600)
    const id = Number(variables.destinoId)

    return HttpResponse.json({
      data: {
        vuelos: vuelos.filter((v) => v.destinoId === id),
        hoteles: hoteles.filter((h) => h.destinoId === id),
      },
    })
  }),
]
