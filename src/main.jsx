import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './index.css'
import './styles/global.css'
import App from './App.jsx'

// Initialize AOS
AOS.init({
  duration: 600,
  easing: 'ease-in-out',
  once: true,
  offset: 100,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
