import { build } from "esbuild";

const isProd = process.env.NODE_ENV === 'production';

const sharedConfig = {
  entryPoints: ["src/entrypoint.tsx"],
  bundle: true,
  minify: isProd,
  sourcemap: !isProd,
  format: 'esm',
};

build({
  ...sharedConfig,
  platform: 'browser',
  outfile: "dist/bundle.js",
});