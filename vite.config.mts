import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
// import dns from 'dns'

// dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
    // If you'd prefer to not run the checkers during unit testing with Vitest, you can alter the config based on that. Example:
    // !process.env.VITEST ? checker({ typescript: true }) : undefined
  ],

  server: {
    host: 'localhost',
    port: 3000,
  },
  resolve: {
    alias: [
      // {
      //   find: '~bootstrap',
      //   replacement: path.resolve(__dirname, 'node_modules/bootstrap'),
      // },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})
