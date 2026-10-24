import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // Root-relative assets so GitHub Pages, Vercel, and local preview all work.
  // For project Pages at /Bible-Outlines/, set VITE_BASE=/Bible-Outlines/ when building.
  base: process.env.VITE_BASE || '/',
})
