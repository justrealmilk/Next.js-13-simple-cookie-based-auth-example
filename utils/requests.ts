export async function getData(cookie?: string) {
  const response = await fetch("http://localhost:3000/api/", {
    headers: {
      Cookie: cookie !== undefined ? `token=${cookie};` : "",
    },
    next: {
      revalidate:
        cookie !== undefined
          ? 0
          : process.env.NODE_ENV !== "production"
          ? 0
          : 3600,
    },
  });
  const data = response.json();

  return data as Promise<string>;
}
