import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { JournalApp } from './presentation/JournalApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JournalApp/>
  </StrictMode>,
)
