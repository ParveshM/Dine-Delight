import { ChangeEvent, useEffect, useState } from "react";
import axiosJWT from "../utils/axiosService";
import showToast from "../utils/toaster";
import {
  TransactionsInterface,
  UserInterface,
  UserWalletInterface,
} from "../types/UserInterface";
import { USER_API, nameRegex } from "../constants";
import uploadImagesToCloudinary from "../Api/uploadImages";

const useProfile = () => {
  const [profile, setProfile] = useState<UserInterface | null>(null);
  const [wallet, setWallet] = useState<UserWalletInterface | null>(null);
  const [transactons, setTransactons] = useState<TransactionsInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    imageFile: File[];
  }>({
    name: "",
    imageFile: [],
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    axiosJWT
      .get(USER_API + "/profile")
      .then(({ data }) => {
        const { user, wallet, transactions } = data;
        setProfile(user);
        setWallet(wallet);
        setTransactons(transactions);
        setFormData((prev) => ({ ...prev, name: user.name }));
      })
      .catch(() => showToast("Oops! Something went wrong", "error"));
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let errorMessage = "";
    if (name === "name") {
      if (!value.trim()) {
        errorMessage = "Name is required";
      } else if (!nameRegex.test(value)) {
        errorMessage =
          "First letter must be capital and no leading or trailing space";
      }
      if (errorMessage) setError(errorMessage);
      else setError(null);
      setFormData((prev) => ({ ...prev, name: value.trim() }));
    } else {
      const files = Array.from(e.target.files || []);
      setFormData((prev) => ({ ...prev, [name]: files }));
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };
  const handleSubmit = async () => {
    if (!error) {
      setIsSubmitting(true);
      const url = await uploadImagesToCloudinary(formData.imageFile);

      axiosJWT
        .patch(USER_API + "/profile/edit", {
          name: formData.name,
          profilePicture: url && url[0] ? url[0] : profile?.profilePicture,
        })
        .then(({ data }) => {
          showToast(data.message);
          setIsSubmitting(false);
          setIsEditing(false);
        })
        .catch(() => {
          setIsSubmitting(false);
          showToast(
            "Oops! Something went wrong while updating profile",
            "error"
          );
        });
    }
  };

  return {
    profile,
    wallet,
    transactons,
    formData,
    imagePreview,
    error,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    isEditing,
    setIsEditing,
  };
};

export default useProfile;
