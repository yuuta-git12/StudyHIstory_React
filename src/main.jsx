import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StudyRecords} from './components/StudyRecords.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <StudyRecords/>
  </StrictMode>,
)
