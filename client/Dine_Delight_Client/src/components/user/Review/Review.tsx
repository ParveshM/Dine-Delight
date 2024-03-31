import { FormEvent, useState } from "react";
import StarRating from "./StarRating";
import Button from "../../restaurant/Button";
import axiosJWT from "../../../utils/axiosService";
import { USER_API } from "../../../constants";
import showToast from "../../../utils/toaster";
import ReviewConfirmation from "./ReviewConfirmation";

type RatingInputProps = {
  restaurantId: string | undefined;
  restauranName: string | undefined;
};
const Review: React.FC<RatingInputProps> = ({
  restauranName,
  restaurantId,
}) => {
  const [rating, setRating] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    axiosJWT
      .post(USER_API + "/review/add", { restaurantId, rating, description })
      .then(({ data }) => {
        if (data.success) setIsSuccess(true);
      })
      .catch(() =>
        showToast("Oops,Something went wrong.Please try again later.")
      )
      .finally(() => setIsSubmitting(false));
  };
  return (
    <div className="flex justify-center items-center mt-2 border shadow-md rounded-md p-4">
      {isSuccess ? (
        <ReviewConfirmation />
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold text-center mb-4">
            Rate your experience with {restauranName ?? "restaurant"}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <StarRating
              edit={true}
              value={rating}
              onChange={(num) => setRating(num)}
              className="flex"
            />
            <span className="text-sm">(Click to rate)</span>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
              <label
                htmlFor="review"
                className="block text-sm font-semibold mb-1"
              >
                Write your review:
              </label>
              <textarea
                name="review"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                rows={1}
                placeholder="Share your experience..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <Button
              buttontype="submit"
              label="Submit Review"
              isDisabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Review;
