import PageHeader from "../components/admin/editUser/PageHeader";
import ProfileOverviewCard from "../components/profile/ProfileOverviewCard";
import PersonalInformationCard from "../components/profile/PersonalInformationCard";

const MyProfile = () => {
  return (
    <div className="p-8">
      <PageHeader
        title="My Profile"
        description="View and manage your personal information and account settings."
      />

      <ProfileOverviewCard />

      <div className="mt-6 grid grid-cols-2 gap-6">
        <PersonalInformationCard />

        <div>Security Card</div>
      </div>
    </div>
  );
};

export default MyProfile;
