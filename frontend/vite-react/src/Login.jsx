import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login({ onLogin, goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No user found. Please register first.");
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      localStorage.setItem("isLoggedIn", "true");
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Patient Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={styles.input}
      />
      {/* CAPTCHA */}
      <div style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
      <ReCAPTCHA
      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      onChange={(token) => setCaptchaToken(token)}
      />
    </div>

<button onClick={handleLogin}>
Sign In
</button>

      <button onClick={handleLogin}>
        Sign In
      </button>

      <p onClick={goRegister} style={styles.link}>
        New patient? Register
      </p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  input: {
    padding: "12px",
    margin: "8px",
    width: "260px",
    borderRadius: "8px",
    border: "none"
  },
  button: {
    padding: "12px",
    width: "260px",
    background: "#22c55e",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  link: {
    marginTop: "15px",
    cursor: "pointer",
    textDecoration: "underline"
  }
};
