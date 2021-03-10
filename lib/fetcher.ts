import { Variables } from "../types/graphql";

const API_KEY = process.env.NEXT_PUBLIC_FAUNADB_SECRET;
const API_URL = process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT || "";

export async function fetcher<ApiResponse>(
  query: string,
  variables?: Variables,
  options: HeadersInit = {},
  includeAuthHeaders = true
): Promise<ApiResponse | any> {
  try {
    const r = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: includeAuthHeaders ? `Bearer ${API_KEY}` : "",
        ...options,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    return await r.json();
  } catch (e) {
    throw e;
  }
}
