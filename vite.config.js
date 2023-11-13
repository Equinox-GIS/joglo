import { defineConfig } from "vite";

export default defineConfig({
  // Server Development
  server: {
    open: true, // Buka browser secara otomatis ketika server dijalankan
    hot: true, // Aktifkan hot module replacement (HMR)
    cacheDir: "./node_modules/.vite", // Lokasi cache untuk mempercepat reload
  },

  // Optimasi Build
  build: {
    minify: "esbuild", // Menggunakan esbuild untuk minifikasi yang lebih cepat
    sourcemap: false, // Nonaktifkan sourcemaps untuk produksi untuk mengurangi ukuran file
    chunkSizeWarningLimit: 500, // Batas ukuran chunk untuk peringatan
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Membagi vendor chunks untuk caching yang lebih baik
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },

  // Plugin (Tambahkan atau modifikasi sesuai kebutuhan)
  plugins: [],

  // Optimasi Lainnya
  optimizeDeps: {
    entries: [], // Tentukan entri spesifik untuk pra-bundling
    exclude: [], // Paket yang tidak perlu di pra-bundle
  },
});
