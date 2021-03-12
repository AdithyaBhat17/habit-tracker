export interface FetchProps {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  token?: string | undefined;
  body?: any | undefined;
}

export async function fetcher<ApiResponse>({
  url,
  method = "POST",
  token = "",
  body,
}: FetchProps): Promise<ApiResponse | any> {
  try {
    const r = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        token,
      },
      credentials: "same-origin",
      body: JSON.stringify(body),
    });
    return await r.json();
  } catch (e) {
    throw e;
  }
}
