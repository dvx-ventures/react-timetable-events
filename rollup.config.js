import typescript from "@rollup/plugin-typescript";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json";
import replace from '@rollup/plugin-replace'

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  format: "iife",
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    resolve({
      browser: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    external(),
    commonjs(),
    typescript({
      exclude: /.*\/stories\/.*\.(ts|tsx)/,
      tsconfig: "./tsconfig.json",
    }),
    postcss({
      modules: true,
    }),
  ],
};
