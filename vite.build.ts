import * as child_process from 'node:child_process'
import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const name = 'SiteUtilsFeedback'
const outDir = path.resolve(__dirname, 'dist')
function afterBuildPlugin() {
  return {
    name: 'after-build-plugin',
    closeBundle() {
      child_process.execSync(`npm pack --pack-destination ${outDir}`)
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir,
      rollupTypes: true,
      copyDtsFiles: true,
      tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
      insertTypesEntry: true,
    }),
    afterBuildPlugin(),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    reportCompressedSize: true,
    outDir,
    minify: true,
    cssMinify: true,
    // rollupOptions: {
    //   output: {
    //     extend: true,
    //   },
    // },
    lib: {
      entry: path.resolve('src/index.tsx'),
      name,
      formats: ['iife'],
      fileName: (format: string) => `index.${format}.js`,
    },
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
})
