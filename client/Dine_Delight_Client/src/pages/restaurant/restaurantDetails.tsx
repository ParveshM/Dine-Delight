import { ImSpinner9 } from "react-icons/im";
import formUtils from "../../hooks/useRestaurantform";
import AutoCompleteInput from "../../components/restaurant/AutoCompleteInput";
import CustomMap from "../../components/restaurant/Map";
import { RxCrossCircled } from "react-icons/rx";
import ConfirmationModal from "../../components/user/Modals/ConfirmationModal";
const ViewRestaurant = () => {
  const {
    formData,
    setFormData,
    imagePreviews,
    featuredImgPreview,
    errors,
    isFeauredUploading,
    isUploading,
    handleFeaturedImg,
    handleImageChange,
    handleInputChange,
    uploadImages,
    handleSubmit,
    updateCoordinates,
    setImageToRemove,
    isModalOpen,
    setIsModalOpen,
    handleImageRemove,
  } = formUtils();

  return (
    <div className=" sm:flex justify-center items-center">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <h1 className="m-1 font-semibold text-2xl">Restaurant Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                {/* grid elements  */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Restaurant name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Restaurant name
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
                      type="text"
                      name="restaurantName"
                      onChange={handleInputChange}
                      value={formData.restaurantName}
                    />
                    {errors?.restaurantName && (
                      <p className="text-red-500">{errors?.restaurantName}</p>
                    )}
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="email yfvi"
                      value={formData.email}
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="address"
                      onChange={handleInputChange}
                      value={formData.address}
                    />
                  </div>
                  {errors?.address && (
                    <p className="text-red-500">{errors?.address}</p>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="phone"
                      onChange={handleInputChange}
                      value={formData.phone}
                    />
                  </div>
                  {errors?.phone && (
                    <p className="text-red-500">{errors?.phone}</p>
                  )}
                </div>

                <div className="col-span-6 ">
                  <label
                    htmlFor="Description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      name="description"
                      rows={1}
                      className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Something"
                      onChange={handleInputChange}
                      value={formData.description}
                    ></textarea>
                  </div>
                  {errors?.description && (
                    <p className="text-red-500">{errors?.description}</p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <div className="mt-1">
                    <AutoCompleteInput
                      handleManualInputChange={handleInputChange}
                      setFormData={setFormData}
                      searchLocation={formData.searchLocation}
                    />
                    {errors?.searchLocation && (
                      <p className="text-red-500">{errors?.searchLocation}</p>
                    )}
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3  ">
                  <CustomMap
                    longitude={formData.location.coordinates[0]}
                    latitude={formData.location.coordinates[1]}
                    updateCoordinates={updateCoordinates}
                  />
                </div>
                <div className="col-span-6 sm:col-span-2 mt-(-10)">
                  <label
                    htmlFor="Table rate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Table rate
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="tableRatePerPerson"
                      onChange={handleInputChange}
                      value={formData.tableRatePerPerson}
                    />
                  </div>
                  {errors?.tableRatePerPerson && (
                    <p className="text-red-500">{errors?.tableRatePerPerson}</p>
                  )}
                </div>
              </div>
              {/* grid section finished  */}

              <div className="flex flex-col sm:flex-row items-center">
                <label className="block text-base font-medium text-gray-700 pt-5">
                  Select time :
                </label>
                <div className="mt-1 flex  flex-col sm:flex-row items-center gap-2">
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-sm font-medium">Opening time</p>
                    <input
                      type="time"
                      name="openingTime"
                      value={formData.openingTime}
                      onChange={handleInputChange}
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-sm font-medium">Closing time</p>
                    <input
                      type="time"
                      name="closingTime"
                      value={formData.closingTime}
                      onChange={handleInputChange}
                      className="ml-5  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
                    />
                  </div>
                  {errors?.openingTime && (
                    <p className="text-red-500">{errors?.openingTime}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="featured_image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Featured image
                </label>
                {formData.primaryImage && (
                  <div className="mt-6 mb-2">
                    <img
                      src={formData.primaryImage}
                      alt=" Featured Image"
                      className="h-24 w-auto rounded-md"
                    />
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      id="featured_image"
                      className="absolute opacity-0 w-full h-full cursor-pointer"
                      type="file"
                      accept="image/*"
                      onChange={handleFeaturedImg}
                    />
                    <label
                      htmlFor="featured_image"
                      className="flex items-center justify-center w-32 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 cursor-pointer"
                    >
                      Choose File
                    </label>
                  </div>

                  {/* File type information */}
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    PNG, JPG
                  </p>

                  {/* Upload button */}
                  <button
                    className={` w-32 h-10 rounded-lg  bg-green-300 ${
                      !featuredImgPreview && "cursor-not-allowed"
                    }`}
                    type="button"
                    onClick={() => uploadImages("featuredImage")}
                    disabled={!featuredImgPreview ? true : false}
                  >
                    {isFeauredUploading ? (
                      <span className="inline-flex items-center gap-2">
                        <ImSpinner9 className="animate-spin mx-auto" />
                        Uploading
                      </span>
                    ) : (
                      "Upload"
                    )}
                  </button>
                </div>

                {featuredImgPreview && (
                  <img
                    src={featuredImgPreview}
                    alt="Featured preview"
                    className="mt-2 h-24 w-auto"
                  />
                )}
              </div>

              <div>
                <label
                  htmlFor="additional_images"
                  className="block mt-6 mb-2 text-sm font-medium text-gray-700"
                >
                  Additional images
                </label>
                {formData.secondaryImages.length > 0 && (
                  <div className="mt-6 mb-2">
                    <div className="flex flex-wrap gap-2 ">
                      {formData.secondaryImages.map((image, index) => (
                        <div className="relative h-24 w-auto rounded-md">
                          <img
                            key={index}
                            src={image}
                            alt={`Additional Image ${index}`}
                            className="h-full rounded-md"
                          />
                          <RxCrossCircled
                            className="absolute -top-5 right-0 cursor-pointer w-5 h-5 text-red-600"
                            onClick={() => {
                              setImageToRemove(image);
                              setIsModalOpen(true);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mt-2">
                  <div className="relative">
                    <input
                      id="featured_image"
                      className="absolute opacity-0 w-full h-full cursor-pointer"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      multiple
                    />
                    <label
                      htmlFor="featured_image"
                      className="flex items-center justify-center w-32 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 cursor-pointer"
                    >
                      Choose Files
                    </label>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    PNG, JPG
                  </p>

                  {/* Upload button */}
                  <button
                    className={` w-32 h-10 rounded-lg  bg-green-300 font-medium ${
                      !imagePreviews.length && "cursor-not-allowed"
                    }`}
                    type="button"
                    disabled={!imagePreviews ? true : false}
                    onClick={() => uploadImages()}
                  >
                    {isUploading ? (
                      <span className="inline-flex items-center gap-2">
                        <ImSpinner9 className="animate-spin mx-auto" />
                        Uploading
                      </span>
                    ) : (
                      "Upload"
                    )}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index}`}
                      className="h-24 w-auto"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <ConfirmationModal
          setIsOpen={(isOpen) => setIsModalOpen(isOpen)}
          handleConfirmation={handleImageRemove}
          action="delete image"
        />
      )}
    </div>
  );
};

export default ViewRestaurant;
