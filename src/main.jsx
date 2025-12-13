import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import EditInventory from './EditInventory.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EditInventory />
  </StrictMode>,
)
