export async function fetcher<ApiResponse>(
  url: string,
  token: string = "",
  body?: any
): Promise<ApiResponse | any> {
  try {
    const r = await fetch(url, {
      method: "POST",
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
