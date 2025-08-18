import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ThemeProviderWrapper from './theme-provider'
import { CssBaseline } from '@mui/material'
import { Routes } from './Routes'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProviderWrapper>
    <CssBaseline />
    <Routes />
    </ThemeProviderWrapper>
  </React.StrictMode>,
)
