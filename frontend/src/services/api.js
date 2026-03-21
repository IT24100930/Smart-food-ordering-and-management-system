const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

async function apiRequest(path, options = {}) {
  const hasBody = options.body !== undefined && options.body !== null;
  const headers = {
    ...(hasBody ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers,
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  let data = null;

  if (response.status !== 204) {
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text ? { message: text, raw: text } : null;
    }
  }

  if (!response.ok) {
    const message =
      data?.message ||
      (data && typeof data === "object" ? Object.values(data).join(" ") : "") ||
      "Request failed.";
    throw new Error(message);
  }

  return data;
}

export { API_BASE_URL, apiRequest };
