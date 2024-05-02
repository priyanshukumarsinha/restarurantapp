import React, { useReducer } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './components/store/store.js'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
        <Provider store={store}>
          <App/>
        </Provider>
    </Router>
  </React.StrictMode>,
)
