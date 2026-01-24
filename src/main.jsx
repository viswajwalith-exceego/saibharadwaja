import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.css'

// Base path for React Router - set to "/New" for subdirectory, or "" for root
// Change this when moving from /New/ to root / later
const ROUTER_BASENAME = "/New"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={ROUTER_BASENAME}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

