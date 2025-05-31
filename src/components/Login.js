import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    setError(false);

    try {
      const credentials = btoa(`${username}:${pass}`);

      const response = await fetch(
        "https://learn.reboot01.com/api/auth/signin",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/json",
          },
        }
      );
      //debug
      //console.log("Response status:", response.status);

      if (response.ok) {
        const responseAuth = await response.text();
      
        localStorage.setItem("jwt", responseAuth);
        navigate("/");
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    console.log("Error state changed to:", error);
    document.title = "Login";

  }, [error]);

  return (
    <div className="container">
      <div className="login-container" id="loginContainer">
        <h1 className="login-title">01 GraphQL Profile</h1>


        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={pass}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Sign In
          </button>

          <div
            style={{
              display: error ? "block" : "none",
              color: "red",
              marginTop: "10px",
            }}
          >
            Invalid username or password. Please try again.
          </div>

          {error && (
            <div className="error-message" id="errorMessage">
              Invalid username or password. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
