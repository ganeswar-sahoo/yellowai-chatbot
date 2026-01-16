import { useEffect, useState } from "react";
import { getProjects, createProject } from "../services/api";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Load projects
  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects");
    }
  }

  async function handleCreateProject(e) {
    e.preventDefault();
    setError("");

    try {
      await createProject({ name, description });
      setName("");
      setDescription("");
      loadProjects();
    } catch (err) {
      setError("Failed to create project");
    }
  }

  function openProject(projectId) {
    navigate(`/chat?projectId=${projectId}`);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Your Projects</h2>
        <p style={styles.subtitle}>Manage and chat with your AI projects</p>

        {/* Create Project Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Create New Project</h3>

          <form onSubmit={handleCreateProject}>
            <label style={styles.label}>Project Name</label>
            <input
              placeholder="My AI Project"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>Description</label>
            <input
              placeholder="Optional short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              Create Project
            </button>
          </form>

          {error && <p style={styles.error}>{error}</p>}
        </div>

        {/* Project List */}
        <div style={styles.list}>
          {projects.map((p) => (
            <div
              key={p.id}
              style={styles.projectCard}
              onClick={() => openProject(p.id)}
            >
              <h4 style={styles.projectName}>{p.name}</h4>
              <p style={styles.projectDesc}>
                {p.description || "No description"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Styles (same design system as Login) */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "20px",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    color: "#111827",
    marginBottom: "4px",
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: "24px",
    fontSize: "14px",
  },
  card: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "14px",
    boxShadow: "0 12px 25px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },
  cardTitle: {
    marginBottom: "16px",
    color: "#111827",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#4f46e5",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
  },
  error: {
    color: "#dc2626",
    marginTop: "10px",
    fontSize: "14px",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "16px",
  },
  projectCard: {
    background: "#ffffff",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 8px 18px rgba(0,0,0,0.06)",
    cursor: "pointer",
    transition: "transform 0.15s ease",
  },
  projectName: {
    margin: 0,
    color: "#111827",
  },
  projectDesc: {
    marginTop: "6px",
    fontSize: "13px",
    color: "#6b7280",
  },
};

export default Projects;
