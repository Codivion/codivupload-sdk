import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "https://api.codivupload.com/public-openapi.json",
  output: {
    path: "src/generated",
    format: "prettier",
  },
  types: {
    enums: "javascript",
  },
});
