import { useState } from "react";

export default function Register({ goLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!email || !password) {
      alert("All fields required");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Registration successful!");
    goLogin();
  };

  return (
    <div style={styles.container}>
      <h2>Patient Registration</h2>

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

      <button onClick={handleRegister} style={styles.button}>
        Register
      </button>

      <p onClick={goLogin} style={styles.link}>
        Already have an account? Login
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
    background: "#3b82f6",
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
