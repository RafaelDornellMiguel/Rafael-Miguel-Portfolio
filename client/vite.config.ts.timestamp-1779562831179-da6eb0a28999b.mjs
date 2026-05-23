// vite.config.ts
import { defineConfig } from "file:///sessions/lucid-hopeful-tesla/mnt/Portifolio/client/node_modules/vite/dist/node/index.js";
import react from "file:///sessions/lucid-hopeful-tesla/mnt/Portifolio/client/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "/sessions/lucid-hopeful-tesla/mnt/Portifolio/client";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Atalho para a pasta src
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      // Atalho para a pasta shared (ajustado conforme o erro anterior)
      "@shared": path.resolve(__vite_injected_original_dirname, "../shared")
    },
    // Garante que não existam múltiplas instâncias do React (evita erro de hooks)
    dedupe: ["react", "react-dom"]
  },
  server: {
    port: 8086,
    strictPort: true,
    // Se a 8086 estiver ocupada, ele não tenta outra porta e avisa
    hmr: {
      protocol: "ws",
      host: "localhost"
    },
    proxy: {
      // Proxy para as chamadas do tRPC / API
      "/api": {
        // ATENÇÃO: Ajustei para 8080 baseado nos seus logs anteriores.
        // Se o seu backend realmente estiver na 5000, mude de volta.
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        // Adiciona suporte a WebSockets se o seu tRPC usar subscriptions no futuro
        ws: true,
        // Útil para depurar se as requisições estão chegando no backend
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("Erro no Proxy:", err);
          });
        }
      }
    }
  },
  build: {
    // Otimiza o chunking para carregar o app mais rápido
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvc2Vzc2lvbnMvbHVjaWQtaG9wZWZ1bC10ZXNsYS9tbnQvUG9ydGlmb2xpby9jbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9zZXNzaW9ucy9sdWNpZC1ob3BlZnVsLXRlc2xhL21udC9Qb3J0aWZvbGlvL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vc2Vzc2lvbnMvbHVjaWQtaG9wZWZ1bC10ZXNsYS9tbnQvUG9ydGlmb2xpby9jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAvLyBBdGFsaG8gcGFyYSBhIHBhc3RhIHNyY1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgIC8vIEF0YWxobyBwYXJhIGEgcGFzdGEgc2hhcmVkIChhanVzdGFkbyBjb25mb3JtZSBvIGVycm8gYW50ZXJpb3IpXG4gICAgICAnQHNoYXJlZCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zaGFyZWQnKSwgXG4gICAgfSxcbiAgICAvLyBHYXJhbnRlIHF1ZSBuXHUwMEUzbyBleGlzdGFtIG1cdTAwRkFsdGlwbGFzIGluc3RcdTAwRTJuY2lhcyBkbyBSZWFjdCAoZXZpdGEgZXJybyBkZSBob29rcylcbiAgICBkZWR1cGU6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDgwODYsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSwgLy8gU2UgYSA4MDg2IGVzdGl2ZXIgb2N1cGFkYSwgZWxlIG5cdTAwRTNvIHRlbnRhIG91dHJhIHBvcnRhIGUgYXZpc2FcbiAgICBobXI6IHtcbiAgICAgIHByb3RvY29sOiAnd3MnLFxuICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgfSxcbiAgICBwcm94eToge1xuICAgICAgLy8gUHJveHkgcGFyYSBhcyBjaGFtYWRhcyBkbyB0UlBDIC8gQVBJXG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgLy8gQVRFTlx1MDBDN1x1MDBDM086IEFqdXN0ZWkgcGFyYSA4MDgwIGJhc2VhZG8gbm9zIHNldXMgbG9ncyBhbnRlcmlvcmVzLlxuICAgICAgICAvLyBTZSBvIHNldSBiYWNrZW5kIHJlYWxtZW50ZSBlc3RpdmVyIG5hIDUwMDAsIG11ZGUgZGUgdm9sdGEuXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcsIFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICAgIC8vIEFkaWNpb25hIHN1cG9ydGUgYSBXZWJTb2NrZXRzIHNlIG8gc2V1IHRSUEMgdXNhciBzdWJzY3JpcHRpb25zIG5vIGZ1dHVyb1xuICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgLy8gXHUwMERBdGlsIHBhcmEgZGVwdXJhciBzZSBhcyByZXF1aXNpXHUwMEU3XHUwMEY1ZXMgZXN0XHUwMEUzbyBjaGVnYW5kbyBubyBiYWNrZW5kXG4gICAgICAgIGNvbmZpZ3VyZTogKHByb3h5LCBfb3B0aW9ucykgPT4ge1xuICAgICAgICAgIHByb3h5Lm9uKCdlcnJvcicsIChlcnIsIF9yZXEsIF9yZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvIG5vIFByb3h5OicsIGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgLy8gT3RpbWl6YSBvIGNodW5raW5nIHBhcmEgY2FycmVnYXIgbyBhcHAgbWFpcyByXHUwMEUxcGlkb1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICB2ZW5kb3I6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlUsU0FBUyxvQkFBb0I7QUFDeFcsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBO0FBQUEsTUFFTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUE7QUFBQSxNQUVwQyxXQUFXLEtBQUssUUFBUSxrQ0FBVyxXQUFXO0FBQUEsSUFDaEQ7QUFBQTtBQUFBLElBRUEsUUFBUSxDQUFDLFNBQVMsV0FBVztBQUFBLEVBQy9CO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUE7QUFBQSxJQUNaLEtBQUs7QUFBQSxNQUNILFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxPQUFPO0FBQUE7QUFBQSxNQUVMLFFBQVE7QUFBQTtBQUFBO0FBQUEsUUFHTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUE7QUFBQSxRQUVSLElBQUk7QUFBQTtBQUFBLFFBRUosV0FBVyxDQUFDLE9BQU8sYUFBYTtBQUM5QixnQkFBTSxHQUFHLFNBQVMsQ0FBQyxLQUFLLE1BQU0sU0FBUztBQUNyQyxvQkFBUSxJQUFJLGtCQUFrQixHQUFHO0FBQUEsVUFDbkMsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQTtBQUFBLElBRUwsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osUUFBUSxDQUFDLFNBQVMsYUFBYSxrQkFBa0I7QUFBQSxRQUNuRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
