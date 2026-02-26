const BASE_URL = "http://localhost:3004"

async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token")

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Errore sconosciuto" }))
    throw new Error(error.message || "Errore nella richiesta")
  }

  if (response.status === 204) return null

  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return response.json()
  }

  return response.text()
}

export default apiFetch
