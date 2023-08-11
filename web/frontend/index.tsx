import App from './App'
import React from 'react'
// import './css/style.css'
import { createRoot } from 'react-dom/client'
import en from '@shopify/polaris/locales/en.json'
import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'

const rootElement = document.getElementById('app')
const root = createRoot(rootElement)
root.render(
  <>
    <AppProvider i18n={en}>
      <App/>
    </AppProvider>
  </>
)
