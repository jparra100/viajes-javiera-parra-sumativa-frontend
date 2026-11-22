import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { worker } from './mocks/browser'
import './styles/index.css'

async function iniciarMock() {
  await worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
    onUnhandledRequest: 'bypass',
    quiet: true,
  })
}

iniciarMock().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
