import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .listBlogs()
      .then(setBlogs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">A quiet place to write</p>
        <h1>Stories from people who show up.</h1>
        <p className="lede">
          Read the latest posts, or sign in to publish your own.
        </p>
        {user ? (
          <Link to="/new" className="btn btn-primary">
            Write a post
          </Link>
        ) : (
          <Link to="/register" className="btn btn-primary">
            Start writing
          </Link>
        )}
      </section>

      <section className="feed">
        <h2>Latest posts</h2>
        {loading && <p className="muted">Loading…</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && blogs.length === 0 && (
          <p className="muted">No posts yet. Be the first to write one.</p>
        )}
        <ul className="post-list">
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/posts/${blog.id}`} className="post-link">
                <h3>{blog.title}</h3>
                <p className="post-excerpt">
                  {blog.content.length > 160
                    ? `${blog.content.slice(0, 160)}…`
                    : blog.content}
                </p>
                <p className="post-meta">
                  by {blog.author_username} ·{" "}
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
