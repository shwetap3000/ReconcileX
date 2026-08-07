import React from "react";
import UserHeader from "./UserHeader";
import UserPersonalInfo from "./UserPersonalInfo";
import UserAccountActivity from "./UserAccountActivity";
import UserRecentActivity from "./UserRecentActivity";

const UserDetails = ({ user }) => {
  return (
    <div className="user-details-page">
      {/* Header */}
      <UserHeader user={user} />

      {/* Info Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <UserPersonalInfo user={user} />
        <UserAccountActivity user={user} />
      </div>

      {/* Timeline */}
      <div className="mt-6">
        <UserRecentActivity activities={user.activities} />
      </div>
    </div>
  );
};

export default UserDetails;
