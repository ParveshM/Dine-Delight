import axios from "axios";
import { useParams } from "react-router-dom";
import { USER_API } from "../../constants";
import showToast from "../../utils/toaster";
import { useState } from "react";

const UnsubscribePage = () => {
  const { restaurantId, userId } = useParams();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!restaurantId || !userId) {
      return showToast("Params are required");
    }
    axios
      .post(USER_API + "/email/unSubscribe", {
        restaurantId,
        userId,
      })
      .then(() => setIsSuccess(true))
      .catch(() => showToast("Oops!,something went wrong", "error"));
  };

  return isSuccess ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Unsubscribe Success!
          </h2>
        </div>
        <div className="text-center text-gray-600">
          <p className="mb-4">
            Congratulations! You are now officially free from our newsletter.
          </p>
          <p>
            Remember, it's not you, it's us. We just don't want to spam you
            anymore.
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8 shadow-md rounded-md p-5 border">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Unsubscribe from Newsletter
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <p className="text-center text-gray-600">
              Are you sure you want to unsubscribe from our newsletter?
            </p>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Unsubscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribePage;
