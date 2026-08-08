import api from "./axios";

export const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

export const getUserById = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export const updateUserStatus = async (id, isActive) => {
  const { data } = await api.patch(`/users/${id}/status`, {
    isActive,
  });

  return data;
};

export const updateUserRole = async (id, role) => {
  const { data } = await api.patch(`/users/${id}/role`, {
    role,
  });

  return data;
};
