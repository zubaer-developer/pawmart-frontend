import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

function Login() {
  useTitle("Login");
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const result = await googleSignIn();
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      toast.success("Google sign in successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Google sign in failed!");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoUser = () => {
    document.querySelector('input[name="email"]').value = "user@pawmart.com";
    document.querySelector('input[name="password"]').value = "User123";
  };

  const fillDemoAdmin = () => {
    document.querySelector('input[name="email"]').value = "admin@pawmart.com";
    document.querySelector('input[name="password"]').value = "Admin123";
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <br />
          <input
            type="password"
            name="password"
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p>Demo Credentials:</p>
        <button onClick={fillDemoUser} style={{ marginRight: "10px" }}>
          Demo User
        </button>
        <button onClick={fillDemoAdmin}>Demo Admin</button>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        style={{ width: "100%", padding: "10px" }}
      >
        Sign in with Google
      </button>

      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
