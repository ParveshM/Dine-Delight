import { ChangeEvent, useEffect, useState } from "react";
import uploadImagesToCloudinary from "../Api/uploadImages";
import { RESTAURANT_API } from "../constants";
import axiosJWT from "../utils/axiosService";
import showToast from "../utils/toaster";
import {
  ValidateRestaurantType,
  validateRestaurantDetails,
} from "../utils/validation";
import { getAddressByReversedGeocode } from "../Api/reverseGeocode";

export interface FormInitalState {
  restaurantName: string;
  email: string;
  address: string;
  phone: string;
  description: string;
  searchLocation: string;
  openingTime: string;
  closingTime: string;
  tableRatePerPerson: number;
  costForTwo: number;
  primaryImage: string;
  secondaryImages: string[];
  location: {
    type: "Point";
    coordinates: (string | number)[];
  };
}

const formUtils = () => {
  const [formData, setFormData] = useState<FormInitalState>({
    restaurantName: "",
    email: "",
    address: "",
    phone: "",
    description: "",
    searchLocation: "",
    openingTime: "",
    closingTime: "",
    costForTwo: 300,
    tableRatePerPerson: 200,
    primaryImage: "",
    secondaryImages: [""],
    location: {
      type: "Point",
      coordinates: ["", ""],
    },
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageToRemove, setImageToRemove] = useState<string | null>(null);

  useEffect(() => {
    axiosJWT
      .get(RESTAURANT_API + "/info")
      .then(async ({ data }) => {
        const {
          location: { coordinates },
        } = data.restaurant;
        /** return the result of geocodeAddress to the next 
        one in the promise chain by awaiting to fulfill the request **/
        const code = await getAddressByReversedGeocode(
          coordinates[0],
          coordinates[1]
        );
        return { restaurant: data.restaurant, code };
      })
      .then(({ restaurant, code }) => {
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
          tableRatePerPerson,
          location: { coordinates },
        } = restaurant;

        setFormData((prevState) => ({
          ...prevState,
          restaurantName,
          email,
          phone: phone ?? prevState.phone,
          address: address ?? prevState.address,
          description: description ?? prevState.description,
          primaryImage: primaryImage ?? prevState.primaryImage,
          secondaryImages: secondaryImages ?? prevState.secondaryImages,
          openingTime: openingTime ?? "09:00",
          closingTime: closingTime ?? "21:00",
          searchLocation: code ?? prevState.searchLocation,
          tableRatePerPerson:
            tableRatePerPerson ?? prevState.tableRatePerPerson,
          location: {
            type: "Point",
            coordinates: coordinates ??
              prevState.location?.coordinates ?? ["", ""], // Default coordinates if not available
          },
        }));
      })
      .catch((error) => console.log(error));
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
    }
    setIsUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateRestaurantDetails(formData);
    const isValidForm = Object.keys(newErrors).length === 0;
    if (isValidForm) {
      axiosJWT
        .put(RESTAURANT_API + "/info", formData)
        .then(({ data }) => {
          showToast(data.message);
        })
        .catch((error) => console.log(error));
    } else {
      setErrors(newErrors);
    }
  };

  const updateCoordinates = (latitude: number, longitude: number) => {
    setFormData((curr) => ({
      ...curr,
      location: { type: "Point", coordinates: [longitude, latitude] },
    }));
  };

  const handleImageRemove = () => {
    if (imageToRemove) {
      const filteredImages = formData.secondaryImages.filter(
        (image) => image !== imageToRemove
      );
      setFormData((prev) => ({ ...prev, secondaryImages: filteredImages }));
      setIsModalOpen(false);
      // const publicId = extractPublicId(imageToRemove);
      // const deleteUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

      // // Make the DELETE request to delete the image
      // axios.delete(deleteUrl, {
      //   params: {
      //     api_key: apiKey,
      //     api_secret: ,
      //     public_id: publicId
      //   }
      // })
      axiosJWT
        .put(RESTAURANT_API + "/info", { secondaryImages: filteredImages })
        .then(() => {
          showToast("Image removed successfully");
        })
        .catch((error) => console.log(error));
    }
  };

  return {
    formData,
    setFormData,
    imagePreviews,
    featuredImgPreview,
    handleFeaturedImg,
    handleImageChange,
    handleInputChange,
    uploadImages,
    handleSubmit,
    isFeauredUploading,
    isUploading,
    updateCoordinates,
    errors,
    isModalOpen,
    setIsModalOpen,
    setImageToRemove,
    handleImageRemove,
  };
};
export default formUtils;
