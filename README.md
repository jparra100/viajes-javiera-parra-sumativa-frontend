# Rumbo Viajes - Agencia de viajes

Proyecto Desarrollo Frontend II: "Integrando nuestro frontend con backend".

Es una aplicación web para una agencia de viajes donde el usuario puede ver los destinos disponibles, elegir uno y revisar los vuelos y hoteles que hay para ese destino. Los datos vienen de un backend mock que responde por **REST** (destinos) y por **GraphQL** (vuelos y hoteles).

**Sitio publicado:** https://jparra100.github.io/viajes-javiera-parra-sumativa-frontend/

## Tecnologías

- HTML, CSS y JavaScript
- React 19 + Vite
- React Router (`HashRouter`)
- MSW (Mock Service Worker) para simular la API REST y la API GraphQL
- gh-pages para publicar el sitio

## Funcionalidades

- **Inicio:** presentación de la agencia y acceso a los destinos.
- **Destinos:** listado de destinos obtenido desde la API REST, con país, continente, descripción y actividades populares. Tiene un buscador por ciudad, país o continente.
- **Detalle del destino:** muestra la información del destino y consulta con GraphQL los vuelos (aerolínea, fechas, precio, asientos disponibles) y hoteles (estrellas, precio por noche, fechas y habitaciones disponibles).
  - Pestañas para cambiar entre vuelos y hoteles.
  - Filtro "Solo disponibles".
  - Se puede elegir un vuelo y un hotel, y se calcula un total estimado del viaje.
- **Página 404** para rutas que no existen.
- Mensajes de carga y de error.
- Diseño responsivo (celular, tablet y escritorio) con menú hamburguesa en pantallas chicas.

## Rutas

| Ruta | Página |
|------|--------|
| `/` | Inicio |
| `/destinos` | Listado de destinos |
| `/destinos/:id` | Detalle del destino con vuelos y hoteles |
| `*` | Página no encontrada |

Se usa `HashRouter` para que las rutas funcionen en GitHub Pages al recargar la página.

## API mock

El backend mock está hecho con MSW en la carpeta `src/mocks`. Intercepta las peticiones del navegador y responde con los datos de `datos.js`.

### REST

| Método | Endpoint | Respuesta |
|--------|----------|-----------|
| GET | `/api/destinos` | Lista de destinos |
| GET | `/api/destinos/:id` | Un destino (404 si no existe) |

### GraphQL

Endpoint: `POST /graphql`

```graphql
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
```

## Estructura del proyecto

```
src/
├── components/   Componentes reutilizables (Navbar, Footer, tarjetas, resumen, carga y error)
├── mocks/        Backend mock con MSW (datos y handlers REST/GraphQL)
├── pages/        Páginas de la app (Inicio, Destinos, DetalleDestino, NoEncontrada)
├── services/     Funciones que consumen la API REST y la API GraphQL
├── styles/       Archivos CSS
├── utils/        Funciones para formatear precios y fechas
├── App.jsx       Configuración de las rutas
└── main.jsx      Inicia MSW y renderiza la app
```

## Instalación y uso

Requisitos: Node.js 20 o superior.

```bash
git clone https://github.com/jparra100/viajes-javiera-parra-sumativa-frontend.git
cd viajes-javiera-parra-sumativa-frontend
npm install
npm run dev
```

Luego abrir la URL que muestra la terminal (por ejemplo `http://localhost:5173/viajes-javiera-parra-sumativa-frontend/`).

### Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Levanta el servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Muestra la versión de producción en local |
| `npm run lint` | Revisa el código con ESLint |
| `npm run deploy` | Genera el build y lo publica en GitHub Pages |

## Pruebas en navegadores

Probé la aplicación en distintos navegadores y tamaños de pantalla, revisando la navegación, la carga de datos REST y GraphQL, los filtros, la selección de vuelo y hotel, y la consola (sin errores).

| Navegador | Versión | Escritorio | Tablet (768px) | Celular (375px) | Resultado |
|-----------|---------|------------|----------------|-----------------|-----------|
| Google Chrome | 157 | OK | OK | OK | Funciona correctamente |
| Microsoft Edge | 157 | OK | OK | OK | Funciona correctamente |
| Mozilla Firefox | - | OK | OK | OK | Funciona correctamente |

### Casos probados

- Navegar entre Inicio, Destinos y Detalle con el menú y con los botones.
- Recargar la página estando en `#/destinos/3` (la ruta se mantiene).
- Entrar a un destino que no existe (`#/destinos/99`) muestra un mensaje de error.
- Entrar a una ruta inexistente muestra la página 404.
- Buscar destinos con y sin tilde (por ejemplo "peru").
- Cambiar entre vuelos y hoteles y usar el filtro "Solo disponibles".
- Los vuelos y hoteles agotados no se pueden elegir.
- Elegir vuelo y hotel calcula bien el total (precio del vuelo + noches × precio del hotel).
- Menú hamburguesa en celular y sin scroll horizontal.

### Errores encontrados y corregidos

| Problema | Solución |
|----------|----------|
| La versión 3 de MSW no traía el módulo de GraphQL listo y daba error al importar `msw/graphql`. | Se instaló el paquete `graphql`, que MSW necesita para leer las consultas. |

### Decisiones para que funcione en GitHub Pages

- El sitio queda en una subcarpeta (`/viajes-javiera-parra-sumativa-frontend/`), por eso se configuró `base` en Vite y el worker de MSW se registra con `import.meta.env.BASE_URL`.
- GitHub Pages no sabe manejar rutas de React al recargar, por eso se usa `HashRouter` en lugar de `BrowserRouter`.

## Autora

Javiera Parra - Desarrollo Frontend II (PFY2202), Duoc UC.
