import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Dashboard.css"; // Adjusted import path

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (!storedUser) {
      navigate("/login");
    }
    setUsername(storedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2>My Dashboard</h2>
        <ul>
          <li>🏠 Home</li>
          <li>📊 Reports</li>
          <li>⚙️ Settings</li>
        </ul>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>

      <main className="main-content">
        <h1>Welcome, {username} 👋</h1>
        <p>This is your dashboard.</p>
      </main>
    </div>
  );
};

export default Dashboard;
