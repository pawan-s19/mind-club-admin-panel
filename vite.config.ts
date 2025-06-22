import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// Custom plugin to suppress build warnings
const suppressWarningsPlugin = {
  name: "suppress-warnings",
  buildStart() {
    this.warn = () => {}; // suppress all warnings
  },
};

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
    suppressWarningsPlugin,
  ],
});
