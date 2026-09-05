import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/layout/Navbar";
import SearchBar from "../components/layout/SearchBar";
import CustomDateButton from "../components/common/CustomDateButton";

import UserStats from "../components/users/UserStats";
import UserFilters from "../components/users/UserFilters";
import UserTable from "../components/users/UserTable";

import { getUsers } from "../api/userApi";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers();

      if (response.success) {
        setUsers(response.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && user.isActive) ||
        (statusFilter === "INACTIVE" && !user.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  return (
    <>
      <Navbar
        title="Users & Roles"
        subtitle="Manage system users and their access."
        actions={
          <>
            <CustomDateButton />

            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
            />
          </>
        }
      />

      <UserStats users={users} />

      {/* <UserFilters
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      /> */}

      <UserTable
        users={filteredUsers}
        loading={loading}
        refreshUsers={fetchUsers}
      />
    </>
  );
}

export default Users;
