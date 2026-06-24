import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (filePath, folder) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "raw",
  });

  return result;
};

export default uploadToCloudinary;
