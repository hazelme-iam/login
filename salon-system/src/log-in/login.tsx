import { useState } from "react";
import axios from "axios";
import "./log-in.css";
import downloadImage from "./images/download.png"; // ✅ Import the image

const Login: React.FC = () => {
  // Define state for inputs
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Define the API response type
  interface LoginResponse {
    username: string;
  }

  // Handle form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/api/login",
        { username, password },
        { withCredentials: true }  // ✅ Ensure credentials are sent
      );
  
      console.log("Login Successful:", response.data);
      alert(`Welcome, ${response.data.username}!`);
  
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data);
    
        setError(err.response?.data?.detail || "Login failed");
      } else {
        console.error("Unexpected Error:", err);
        setError("An unexpected error occurred");
      }
    }
  }  

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Left Side - Login Form */}
        <div className="login-form">
          <h2>Welcome Back</h2>
          <p>Please log in to continue</p>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>
          </form>

          <p><a href="#">Forgot Password?</a></p>
        </div>

        {/* Right Side - Image */}
        <div className="login-image">
          <img src={downloadImage} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;