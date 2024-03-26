import { CLOUDINARY_UPLOAD_API, cloudinaryUploadPreset } from "../constants";
import showToast from "../utils/toaster";

const uploadImagesToCloudinary = async (imageFiles: File[]) => {
  try {
    const promises = imageFiles.map(async (file: File): Promise<any[]> => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudinaryUploadPreset);

      const response = await fetch(CLOUDINARY_UPLOAD_API, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const data = await response.json();
      return data.secure_url;
    });

    const uploadedImageUrls = await Promise.all(promises);
    return uploadedImageUrls;
  } catch (error) {
    showToast("Error uploading images to Cloudinary", "error");
  }
};
export default uploadImagesToCloudinary;
