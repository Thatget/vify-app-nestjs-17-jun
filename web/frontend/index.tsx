import App from './App'
import React from 'react'
import './css/app.css'
import { createRoot } from 'react-dom/client'
import '@shopify/polaris/build/esm/styles.css'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('app')
const root = createRoot(rootElement)
root.render(
  <>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </>
)
