import { ChangeEvent, useEffect, useState } from "react";
import uploadImagesToCloudinary from "./uploadImages";
import axios from "axios";
import { RESTAURANT_API } from "../constants";
import axiosJWT from "./axiosService";

interface InitalState {
  restaurantName: string;
  email: string;
  address: string;
  phone: string;
  description: string;
  location?: string;
  tableRate: number;
  primaryImage: string;
  secondaryImages: any;
}

const formUtils = () => {
  const [formData, setFormData] = useState<InitalState>({
    restaurantName: "",
    email: "seafoodrestaurant@gmail.com",
    address: "",
    phone: "",
    description: "",
    tableRate: 400,
    primaryImage: "",
    secondaryImages: [],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File[]>([]);
  const [featuredImgPreview, setFeaturedImgPreview] = useState<string | null>(
    null
  );

  //   useEffect(() => {
  //     const fetchedRestaurantData = { /* Your fetched data */ };
  //     setFormData(fetchedRestaurantData);
  //   }, []);

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
    setFormData({ ...formData, [name]: value });
  };

  const uploadImages = async (image: string = "coverImage") => {
    if (image === "featuredImage") {
      const urls: any = await uploadImagesToCloudinary(featuredImage);
      setFormData({ ...formData, ["primaryImage"]: urls[0] });
      setFeaturedImgPreview(urls[0]);
    } else {
      const urls = await uploadImagesToCloudinary(imageFiles);
      setFormData({ ...formData, ["secondaryImages"]: urls });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    axiosJWT
      .put(RESTAURANT_API + "/update_details", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
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
  };
};
export default formUtils;
