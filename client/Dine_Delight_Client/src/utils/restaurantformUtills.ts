import { ChangeEvent, useEffect, useState } from "react";
import uploadImagesToCloudinary from "./uploadImages";
import { RESTAURANT_API } from "../constants";
import axiosJWT from "./axiosService";
import showToast from "./toaster";
import {
  ValidateRestaurantType,
  validateRestaurantDetails,
} from "./validation";

export interface FormInitalState {
  restaurantName: string;
  email: string;
  address: string;
  phone: string;
  description: string;
  location?: string;
  openingTime: string;
  closingTime: string;
  tableRatePerPerson: number;
  primaryImage: string;
  secondaryImages: string[];
}

const formUtils = () => {
  const [formData, setFormData] = useState<FormInitalState>({
    restaurantName: "",
    email: "",
    address: "",
    phone: "",
    description: "",
    openingTime: "",
    closingTime: "",
    tableRatePerPerson: 200,
    primaryImage: "",
    secondaryImages: [],
  });

  const [errors, setErrors] = useState<ValidateRestaurantType | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File[]>([]);
  const [featuredImgPreview, setFeaturedImgPreview] = useState<string | null>(
    null
  );
  const [isFeauredUploading, setIsFeauredUploading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    axiosJWT
      .get(RESTAURANT_API + "/get_details")
      .then(({ data }) => {
        const {
          restaurantName,
          email,
          phone,
          address,
          description,
          primaryImage,
          secondaryImages,
          openingTime,
          closingTime,
        } = data.restaurant;
        setFormData((prevState) => ({
          ...prevState,
          restaurantName,
          email,
          phone,
          address,
          description,
          primaryImage,
          secondaryImages,
          openingTime: openingTime || "09:00",
          closingTime: closingTime || "21:00",
        }));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFeaturedImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFeaturedImage(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setFeaturedImgPreview(previews[0]);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    // Generating preview URLs for selected images
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newInputData = { ...formData, [name]: value };
    setFormData(newInputData);
    const newErrors = validateRestaurantDetails(newInputData);
    const isValidForm = Object.keys(newErrors).length === 0;

    if (!isValidForm) setErrors(newErrors);
    else setErrors({});
  };

  const uploadImages = async (image: string = "coverImage") => {
    if (image === "featuredImage") {
      setIsFeauredUploading(true);
      const urls: any = await uploadImagesToCloudinary(featuredImage);
      setFormData({ ...formData, ["primaryImage"]: urls[0] });
      setFeaturedImgPreview(null);
      setIsFeauredUploading(false);
    } else {
      setIsUploading(true);
      const urls: any = await uploadImagesToCloudinary(imageFiles);
      setFormData((prevState) => ({
        ...prevState,
        secondaryImages: [...prevState.secondaryImages, ...urls],
      }));
      setImagePreviews([]);
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateRestaurantDetails(formData);
    const isValidForm = Object.keys(newErrors).length === 0;
    if (isValidForm) {
      axiosJWT
        .put(RESTAURANT_API + "/update_details", formData)
        .then(({ data }) => {
          showToast(data.message);
        })
        .catch((error) => console.log(error));
    } else {
      setErrors(newErrors);
    }
  };

  return {
    formData,
    imagePreviews,
    featuredImgPreview,
    handleFeaturedImg,
    handleImageChange,
    handleInputChange,
    uploadImages,
    handleSubmit,
    errors,
    isFeauredUploading,
    isUploading,
  };
};
export default formUtils;
