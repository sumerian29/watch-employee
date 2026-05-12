import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'   // <-- أضف هذا السطر
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>      // <-- لف التطبيق بـ BrowserRouter
      <App />
    </BrowserRouter>
  </StrictMode>,
)