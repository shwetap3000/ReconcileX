import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UserDetails from "../components/users/UserDetails";
import { getUserById } from "../api/userApi";

const UserDetailsPage = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const response = await getUserById(id);

      if (response.success) {
        setUser(response.user);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-white">
        Loading user details...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-red-400">
        User not found.
      </div>
    );
  }

  return <UserDetails user={user} />;
};

export default UserDetailsPage;
