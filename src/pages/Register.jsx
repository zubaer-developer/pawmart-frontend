import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Register() {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number");
      return;
    }

    try {
      // Create user in Firebase
      await createUser(email, password);

      // Update profile with name and photo
      await updateUserProfile(name, photo);

      // Save user to database
      const userData = {
        name: name,
        email: email,
        avatar: photo,
      };

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("User saved to database:", data);

      setSuccess("Registration successful!");
      form.reset();

      // Redirect to home after 1 second
      setTimeout(() => {
        navigate("/");
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

      // Save user to database
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
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" required />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>

        <div>
          <label>Photo URL:</label>
          <input
            type="url"
            name="photo"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" required />
        </div>

        <button type="submit">Register</button>
      </form>

      <hr />

      <button onClick={handleGoogleSignIn}>Sign in with Google</button>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
