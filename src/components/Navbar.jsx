import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="nav">
      <Link to="/" className="brand">
        Ink &amp; Co.
      </Link>
      <nav className="nav-links">
        <NavLink to="/" end>
          Posts
        </NavLink>
        {user ? (
          <>
            <NavLink to="/new">Write</NavLink>
            <span className="nav-user">{user.username}</span>
            <button type="button" className="btn btn-ghost" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/register" className="btn btn-primary nav-cta">
              Sign up
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
