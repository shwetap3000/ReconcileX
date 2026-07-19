import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const LogoutBtn = () => {
  const navigate = useNavigate();

  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  console.log("Logout successful")

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutBtn;
