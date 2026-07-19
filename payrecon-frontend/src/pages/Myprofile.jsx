import PageHeader from "../components/admin/editUser/PageHeader";
import ProfileOverviewCard from "../components/profile/ProfileOverviewCard";
import PersonalInformationCard from "../components/profile/PersonalInformationCard";
import { useAuth } from "../context/AuthContext";

const MyProfile = () => {
  const { user, loading } = useAuth();
  console.log(user)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Unable to load profile.
      </div>
    );
  }

  return (
    <div className="p-8">
      <PageHeader
        title="My Profile"
        description="View and manage your personal information and account settings."
      />

      <ProfileOverviewCard user={user} />

      <div className="mt-6 grid grid-cols-2 gap-6">
        <PersonalInformationCard user={user} />

        <div>Security Card</div>
      </div>
    </div>
  );
};

export default MyProfile;
