import UserInfo from "../components/admin/createUser/UserInfo";
import RoleSummaryCard from "../components/admin/createUser/RoleSummary";

const CreateUser = () => {
  return (
    <div className="p-8">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Create New User
        </h1>

        <p className="text-slate-400">
          Add a new user and assign a role.
        </p>

      </div>

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-8">
          <UserInfo />
        </div>

        <div className="col-span-4">
          <RoleSummaryCard />
        </div>

      </div>

    </div>
  );
};

export default CreateUser;