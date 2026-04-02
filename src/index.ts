import { createClient, type Client } from "@hey-api/client-fetch";

// Re-export all generated types and services
export * from "./generated/index.js";

/**
 * Create a configured CodivUpload API client.
 *
 * @example
 * ```ts
 * import { createCodivUpload } from "codivupload";
 *
 * const client = createCodivUpload("cdv_your_api_key");
 * ```
 */
export function createCodivUpload(
  apiKey: string,
  options?: {
    baseUrl?: string;
  }
): Client {
  const client = createClient({
    baseUrl: options?.baseUrl || "https://api.codivupload.com/v1",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });

  return client;
}

export default createCodivUpload;
