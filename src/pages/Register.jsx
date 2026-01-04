import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

function Register() {
  useTitle("Register");

  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      setLoading(false);
      return;
    }

    if (!/[0-9]/.test(password)) {
      toast.error("Password must contain at least one number");
      setLoading(false);
      return;
    }

    try {
      await createUser(email, password);
      await updateUserProfile(name, photo);

      const userData = {
        name: name,
        email: email,
        avatar: photo,
      };

      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      toast.success("Registration successful!");
      form.reset();
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed!");
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
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google sign in failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "15px" }}>
          <label>Name: *</label>
          <br />
          <input
            type="text"
            name="name"
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email: *</label>
          <br />
          <input
            type="email"
            name="email"
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Photo URL:</label>
          <br />
          <input
            type="url"
            name="photo"
            placeholder="https://example.com/photo.jpg"
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password: *</label>
          <br />
          <input
            type="password"
            name="password"
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
          <small style={{ color: "#666" }}>
            Min 6 chars, 1 uppercase, 1 lowercase, 1 number
          </small>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Confirm Password: *</label>
          <br />
          <input
            type="password"
            name="confirmPassword"
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "10px" }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        style={{ width: "100%", padding: "10px" }}
      >
        Sign up with Google
      </button>

      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
