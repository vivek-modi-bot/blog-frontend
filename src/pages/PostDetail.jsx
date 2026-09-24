import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";

export default function PostDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getBlog(id)
      .then(setBlog)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <p className="muted">Loading…</p>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="page">
        <p className="error">{error || "Post not found"}</p>
        <Link to="/">Back to posts</Link>
      </main>
    );
  }

  return (
    <main className="page article">
      <Link to="/" className="back">
        ← All posts
      </Link>
      <h1>{blog.title}</h1>
      <p className="post-meta">
        by {blog.author_username} ·{" "}
        {new Date(blog.created_at).toLocaleString()}
      </p>
      <div className="article-body">{blog.content}</div>
    </main>
  );
}
