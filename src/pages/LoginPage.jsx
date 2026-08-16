import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebaseClient";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch role from Firestore to know where to redirect
      let role = "user";
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          // normalize in case the role was typed with extra spaces/capitalization
          role = (snap.data().role || "user").toString().trim().toLowerCase();
        } else {
          console.warn(
            `No Firestore profile found at users/${user.uid}. ` +
              "If you're trying to log in as admin, make sure the document ID under " +
              "the 'users' collection is exactly this UID (not an auto-generated ID)."
          );
        }
        // Debug: remove this line once role redirects are confirmed working.
        console.log("Login role check -> uid:", user.uid, "role:", role);
      } catch (err) {
        console.error("Could not fetch user profile:", err);
      }

      const redirectTo = location.state?.from?.pathname;

      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate(redirectTo && redirectTo !== "/login" ? redirectTo : "/", {
          replace: true,
        });
      }
    } catch (error) {
      console.error("Login Error:", error.code, error.message);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setErrorMsg("Incorrect email or password.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMsg("Invalid email address.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMsg("Too many attempts. Please try again later.");
      } else {
        setErrorMsg("Login failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-container">
        {/* Logo / Brand */}
        <div className="text-center mb-4">
          <img src={`${import.meta.env.BASE_URL}picture/kk (2).png`} alt="NeaZaa Bakery" className="login-logo" />
          <h2 className="login-brand">NeaZaa Bakery</h2>
          <p className="login-welcome">Welcome back!</p>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <h3 className="login-title">Login</h3>
          <p className="login-subtitle">Sign in to your account</p>

          {errorMsg && (
            <div className="alert alert-danger py-2" role="alert">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control login-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control login-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login-options">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="register-text">
            <p className="create-account">
              Don't have an account? <Link to="/register">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
