import { Camera } from "lucide-react";
import { IoWallet } from "react-icons/io5";
import useProfile from "../../hooks/useProfile";
import { Link } from "react-router-dom";
import { dummyUserImg } from "../../assets/images";

const Profile: React.FC = () => {
  const {
    error,
    profile,
    wallet,
    formData,
    transactons,
    isEditing,
    imagePreview,
    isSubmitting,
    setIsEditing,
    handleSubmit,
    handleInputChange,
  } = useProfile();
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-6 md:col-span-3">
        <div className="border shadow-md rounded-md p-10 py-4">
          {/* profile image  */}
          <div className="flex justify-center  items-center gap-4">
            <div className="relative w-36 h-36    overflow-hidden rounded-full">
              <img
                src={
                  imagePreview
                    ? imagePreview
                    : profile?.profilePicture ?? dummyUserImg
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <label
                htmlFor="profileImage"
                className="absolute bottom-5 right-3 bg-gray-100 rounded-full p-2 cursor-pointer border border-gray-300"
              >
                <Camera />
                <input
                  id="profileImage"
                  name="imageFile"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2 items-center mt-4">
            <p className="text-base font-semibold">Joining date:</p>
            <p>
              {profile?.createdAt &&
                new Date(profile?.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
            </p>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData?.name}
              onChange={handleInputChange}
              className="border-b-2  border-gray-200  read-only:focus:border-gray-200 focus:border-primary-600 focus:ring-primary-600 outline-none sm:text-sm p-2.5 mb-2"
              readOnly={!isEditing ? true : false}
            />
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="text"
              placeholder="Email"
              value={profile?.email ?? ""}
              readOnly
              className="border-b-2 border-gray-200  outline-none sm:text-sm p-2.5"
            />
          </div>
          <div className="flex justify-center">
            {isEditing ? (
              <button
                className={`inline-block ${
                  isSubmitting && "opacity-100 cursor-wait"
                } px-4 mt-2 py-2 text-lg font-medium text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-3xl   transition duration-300 ease-in-out hover:from-pink-600 hover:to-orange-500 focus:outline-none  focus:ring-offset-2`}
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? "Submitting..." : " Save changes"}
              </button>
            ) : (
              <button
                className={`inline-block ${
                  isSubmitting && "opacity-100 cursor-wait"
                } px-4 mt-2 py-2 text-lg font-medium text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-3xl   transition duration-300 ease-in-out hover:from-pink-600 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2`}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-6 md:col-span-2">
        <div className="border shadow-md rounded-md p-4">
          <div className="flex items-center justify-around mb-4">
            <div className="flex gap-2 items-center ">
              <IoWallet className="h-8 w-8 text-yellow-400" />
              <span className="text-gray-600 ml-1">₹{wallet?.balance}.00</span>
            </div>
            <Link
              to="/transaction_history"
              className="text-sm text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              View History
            </Link>
          </div>
          <div className="space-y-2">
            {transactons.length ? (
              <h3 className="">Recent Transaction</h3>
            ) : (
              <h3>No recent transactions</h3>
            )}
            {transactons.length
              ? transactons.slice(0, 5).map((item) => (
                  <div
                    className="flex justify-between items-center bg-gray-100 rounded-md p-2"
                    key={item._id}
                  >
                    <div className="text-sm text-gray-700">{item.type}</div>
                    <div
                      className={`text-sm font-semibold ${
                        item.type === "Credit"
                          ? "text-green-600"
                          : "text-red-600"
                      } `}
                    >
                      {item.type === "Credit"
                        ? `+${item.amount}`
                        : `-${item.amount}`}
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
