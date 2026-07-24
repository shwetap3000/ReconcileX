import { useAuth } from "../context/AuthContext";

import ProfileOverviewCard from "../components/profile/ProfileOverviewCard";
import PersonalInformationCard from "../components/profile/PersonalInformationCard";
import SecurityCard from "../components/profile/SecurityCard";
import AccountInformationCard from "../components/profile/AccountInformationCard";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-400">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-400">Unable to load profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-full p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">My Profile</h1>

        <p className="mt-1 text-sm text-slate-400">
          View and manage your personal information and account settings.
        </p>
      </div>

      {/* Profile Overview */}
      <ProfileOverviewCard user={user} />

      {/* Profile Cards */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <PersonalInformationCard user={user} />

        <SecurityCard />

        <AccountInformationCard user={user} />
      </div>
    </div>
  );
};

export default Profile;
