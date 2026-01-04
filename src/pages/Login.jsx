import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // redirect after login
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      setSuccess("Login successful!");

      // Redirect after 1 second
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setSuccess("");

    try {
      const result = await googleSignIn();
      const user = result.user;

      // Save new user to database
      const userData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      setSuccess("Google sign in successful!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  // Demo credentials auto-fill
  const fillDemoUser = () => {
    document.querySelector('input[name="email"]').value = "user@pawmart.com";
    document.querySelector('input[name="password"]').value = "User123";
  };

  const fillDemoAdmin = () => {
    document.querySelector('input[name="email"]').value = "admin@pawmart.com";
    document.querySelector('input[name="password"]').value = "Admin123";
  };

  return (
    <div>
      <h1>Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>

        <button type="submit">Login</button>
      </form>

      <hr />

      <div>
        <p>Demo Credentials:</p>
        <button type="button" onClick={fillDemoUser}>
          Login as User
        </button>
        <button type="button" onClick={fillDemoAdmin}>
          Login as Admin
        </button>
      </div>

      <hr />

      <button onClick={handleGoogleSignIn}>Sign in with Google</button>

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
