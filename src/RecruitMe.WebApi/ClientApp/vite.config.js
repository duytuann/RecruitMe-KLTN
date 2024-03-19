import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({mode}) => {
  let root = "./";

  if (mode === "jobseeker") {
    root = "./src/app-jobseeker";
  } else if (mode === "employer") {
    root = "./src/app-employer";
  }

  return {
    root,
    build: {
      outDir: mode === "jobseeker" ? "dist/jobseeker" : "dist/employer",
    },
    plugins: [react()],
    css: {
      preprocessorOptions: {
        less: {
          math: "always",
          globalVars: {},
          javascriptEnabled: true,
        },
        scss: {
          additionalData: `
          @import "./src/common/assets/scss/variables/_variables.scss";
          @import "./src/common/assets/scss/variables/_mixin.scss";`,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve("src"),
        "app-employer": path.resolve("src/app-employer"),
        "app-jobseeker": path.resolve("src/app-jobseeker"),
      },
    },
    assetsInclude: ["**/*.svgx"],
  };
});
