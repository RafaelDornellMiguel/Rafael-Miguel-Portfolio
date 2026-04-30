import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Atalho para a pasta src
      '@': path.resolve(__dirname, './src'),
      // Atalho para a pasta shared (ajustado conforme o erro anterior)
      '@shared': path.resolve(__dirname, '../shared'), 
    },
    // Garante que não existam múltiplas instâncias do React (evita erro de hooks)
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 8086,
    strictPort: true, // Se a 8086 estiver ocupada, ele não tenta outra porta e avisa
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
    proxy: {
      // Proxy para as chamadas do tRPC / API
      '/api': {
        // ATENÇÃO: Ajustei para 8080 baseado nos seus logs anteriores.
        // Se o seu backend realmente estiver na 5000, mude de volta.
        target: 'http://localhost:8080', 
        changeOrigin: true,
        secure: false,
        // Adiciona suporte a WebSockets se o seu tRPC usar subscriptions no futuro
        ws: true,
        // Útil para depurar se as requisições estão chegando no backend
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Erro no Proxy:', err);
          });
        },
      },
    },
  },
  build: {
    // Otimiza o chunking para carregar o app mais rápido
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});