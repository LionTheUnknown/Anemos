import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { TempUnitProvider } from './common/context/TempUnitContext'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <TempUnitProvider>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
            <App />
          </div>
        </TempUnitProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
