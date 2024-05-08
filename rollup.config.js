import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/elec-sankey.ts",
  output: [
    {
      file: "./elec-sankey.cjs",
      format: "cjs",
      compact: true,
    },
    {
      file: "./elec-sankey.bundle.js",
      format: "es",
      compact: true,
    },
    {
      file: "./elec-sankey.iife.js",
      format: "iife",
      name: "ElecSankey",
      compact: true,
    },
  ],
  plugins: [resolve(), typescript(), terser()],
};
