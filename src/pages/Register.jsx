import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import { API_URL } from "../backendConfig";

function Register() {
  useTitle("Register");

  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      toast.error("Password must contain uppercase letter");
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain lowercase letter");
      setLoading(false);
      return;
    }
    if (!/[0-9]/.test(password)) {
      toast.error("Password must contain a number");
      setLoading(false);
      return;
    }

    try {
      await createUser(email, password);
      await updateUserProfile(name, photo);

      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, avatar: photo }),
      });

      toast.success("Account created! 🎉");
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

      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        }),
      });

      toast.success("Welcome to PawMart! 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google sign in failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-base-100 p-6 rounded-3xl shadow-sm border border-base-200">
        {/* Logo */}
        <div className="text-center mb-4">
          <Link to="/" className="inline-block mb-1">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-2xl shadow-md mx-auto text-white">
              🐾
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-base-content">
            Create Account
          </h1>
          <p className="text-sm text-base-content/60">
            Join PawMart community today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-base-content/70 mb-1 ml-1 uppercase">
              Full Name
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-70 group-focus-within:text-primary transition-colors">
                👤
              </span>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full pl-12 pr-4 py-2.5 bg-base-200 border-2 border-base-200 rounded-xl focus:border-primary focus:bg-base-100 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm text-base-content placeholder:text-base-content/40"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-base-content/70 mb-1 ml-1 uppercase">
              Email Address
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-70 group-focus-within:text-primary transition-colors">
                📧
              </span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-2.5 bg-base-200 border-2 border-base-200 rounded-xl focus:border-primary focus:bg-base-100 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm text-base-content placeholder:text-base-content/40"
                required
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-xs font-bold text-base-content/70 mb-1 ml-1 uppercase">
              Photo URL{" "}
              <span className="text-base-content/40 font-normal lowercase">
                (optional)
              </span>
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-70 group-focus-within:text-primary transition-colors">
                🖼️
              </span>
              <input
                type="url"
                name="photo"
                placeholder="https://example.com/photo.jpg"
                className="w-full pl-12 pr-4 py-2.5 bg-base-200 border-2 border-base-200 rounded-xl focus:border-primary focus:bg-base-100 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm text-base-content placeholder:text-base-content/40"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-base-content/70 mb-1 ml-1 uppercase">
              Password
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-70 group-focus-within:text-primary transition-colors">
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                className="w-full pl-12 pr-12 py-2.5 bg-base-200 border-2 border-base-200 rounded-xl focus:border-primary focus:bg-base-100 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm text-base-content placeholder:text-base-content/40"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-base-content/50 hover:text-base-content transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-base-content/70 mb-1 ml-1 uppercase">
              Confirm Password
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-70 group-focus-within:text-primary transition-colors">
                🔐
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                className="w-full pl-12 pr-12 py-2.5 bg-base-200 border-2 border-base-200 rounded-xl focus:border-primary focus:bg-base-100 focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm text-base-content placeholder:text-base-content/40"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-base-content/50 hover:text-base-content transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {loading ? "Creating..." : "Create Account →"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-base-300"></div>
          <span className="text-[10px] text-base-content/40 font-bold uppercase">
            OR
          </span>
          <div className="flex-1 h-px bg-base-300"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2.5 bg-base-100 border border-base-300 rounded-xl font-semibold text-base-content hover:bg-base-200 hover:border-base-400 transition-all flex items-center justify-center gap-2 text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="text-center mt-4 text-sm text-base-content/70">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-bold hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
