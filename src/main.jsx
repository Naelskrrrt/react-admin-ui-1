import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ModalProvider } from './components/ModalContext.jsx'
// import { ModalProviderConger } from './components/navbar/modal/ModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ModalProvider>
        <App />
      </ModalProvider>
  </React.StrictMode>,
)
