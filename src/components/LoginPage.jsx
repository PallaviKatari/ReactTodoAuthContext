import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function LoginPage() {
  const auth = useContext(AuthContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    auth.login(name || "Guest");
    navigate("/todoCrud");
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}