import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import CsvToSql from './CsvToSqlPage.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CsvToSql />
  </StrictMode>,
)
