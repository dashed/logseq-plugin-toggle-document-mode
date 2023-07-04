import { defineRollupSwcOption, swc } from "rollup-plugin-swc3";
import html from "@rollup/plugin-html";
import { readFile } from "fs/promises";

export default {
  input: "src/index.tsx",
  output: {
    dir: "dist",
    entryFileNames: "[name].[hash].js",
  },
  plugins: [
    html({
      fileName: "index.html",
      template: async ({ files }) => {
        const content = await readFile("src/index.html", { encoding: "utf8" });
        const fileName = files.js.find(({ name }) => name === "index").fileName;
        return content
          .replace(
            "{preload}",
            `<link rel="modulepreload" as="script" href="${fileName}" />`
          )
          .replace("{js}", `<script type="module" src="${fileName}"></script>`);
      },
    }),
    swc(
      defineRollupSwcOption({
        jsc: {
          target: "es2021",
        },
      })
    ),
  ],
};
