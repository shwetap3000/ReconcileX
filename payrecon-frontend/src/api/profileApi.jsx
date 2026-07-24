import api from "./axios";

export const updateProfile = async (profileData) => {
  try {
    const response = await api.patch("/profile", profileData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};
