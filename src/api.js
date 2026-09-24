const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...options.headers,
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const detail = data?.detail;
    const message =
      typeof detail === "string"
        ? detail
        : Array.isArray(detail)
          ? detail.map((d) => d.msg).join(", ")
          : "Request failed";
    throw new Error(message);
  }

  return data;
}

export const api = {
  apiUrl: API_URL,

  providers: () => request("/api/auth/providers"),

  googleLoginUrl: () => `${API_URL}/api/auth/google`,

  me: () => request("/api/auth/me"),

  listBlogs: () => request("/api/blogs"),

  getBlog: (id) => request(`/api/blogs/${id}`),

  createBlog: (body) =>
    request("/api/blogs", { method: "POST", body: JSON.stringify(body) }),
};
