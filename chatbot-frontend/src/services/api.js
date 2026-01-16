const BASE_URL = "http://localhost:8080";

/* TOKEN */
function getToken() {
  return localStorage.getItem("token");
}

function authHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* AUTH */
export async function login(data) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

export async function register(data) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Registration failed");
  }

  return res.text();
}

/* PROJECTS */
export async function getProjects() {
  const res = await fetch(`${BASE_URL}/projects`, {
    headers: authHeader(),
  });

  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function createProject(data) {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

/* CHAT */
export async function chat(data) {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Chat failed");
  }

  return res.text(); // AI response
}

