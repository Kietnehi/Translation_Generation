import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // forward API calls to the FastAPI backend running on port 8000
      '/translate': 'http://localhost:8000'
    }
  }
})
