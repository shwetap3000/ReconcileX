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

export const uploadProfilePicture = async (file) => {
  try {
    const formData = new FormData();

    // the one in double quote must be same as one that we have in backend (in routes - profileUpload.single("..."))
    formData.append("profilePicture", file);

    const response = await api.post("/profile/picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to upload profile picture",
      }
    );
  }
};
