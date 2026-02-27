const BASE_URL = import.meta.env.VITE_API_URL

function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token")

  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  }).then((response) => {
    if (!response.ok) {
      return response
        .json()
        .catch(() => ({ message: "Errore sconosciuto" }))
        .then((error) => {
          const errMsg = error.message || "Errore nella richiesta"
          const errList =
            Array.isArray(error.errorsMessages) &&
            error.errorsMessages.length > 0
              ? "\n" + error.errorsMessages.join("\n")
              : ""
          throw new Error(errMsg + errList)
        })
    }

    if (response.status === 204) return null

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return response.json()
    }

    return response.text()
  })
}

export default apiFetch
