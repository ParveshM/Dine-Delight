import formUtils from "../../utils/restaurantformUtills";

const ViewRestaurant = () => {
  const {
    formData,
    imagePreviews,
    featuredImgPreview,
    handleFeaturedImg,
    handleImageChange,
    handleInputChange,
    uploadImages,
    handleSubmit,
  } = formUtils();

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6 ">
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
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="location"
                      onChange={handleInputChange}
                      value={formData.location}
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3 ">
                  <div className=" w-full p-10 rounded-xl bg-red-100 mt-5">
                    Google map
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-2">
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
                      name="tableRate"
                      onChange={handleInputChange}
                      value={formData.tableRate}
                    />
                  </div>
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
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
                    />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-sm font-medium">Closing time</p>
                    <input
                      type="time"
                      className="ml-5  bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Featured image
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border p-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImg}
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300 inline-flex"
                  id="file_input_help"
                >
                  PNG, JPG or GIF (MAX. 800x400px).
                  <span
                    className="text-blue-500 font-medium text-base ml-2 cursor-pointer"
                    onClick={() => uploadImages("featuredImage")}
                  >
                    Upload
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {featuredImgPreview?.length && (
                    <img
                      src={featuredImgPreview}
                      alt={`Preview`}
                      className="mt-2 h-24 w-auto"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Add images
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border p-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  PNG, JPG (MAX. 5 images).
                </p>

                <div className="flex flex-wrap gap-2">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index}`}
                      className="mt-2 h-24 w-auto"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                className="p-2 rounded-lg mr-2 bg-green-300"
                onClick={() => uploadImages()}
              >
                upload
              </button>
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
    </div>
  );
};

export default ViewRestaurant;
