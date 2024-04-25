import { useEffect, useState } from "react";
import BannerData from "../../components/Admin/BannerData";
import Button from "../../components/restaurant/Button";
import axiosJWT from "../../utils/axiosService";
import { ADMIN_API } from "../../constants";
import showToast from "../../utils/toaster";
import { BannerInterface } from "../../types/RestaurantInterface";
import BannerModal from "../../components/Admin/BannerModal";

const Banners = () => {
  const [banners, setBanners] = useState<BannerInterface[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    axiosJWT
      .get(ADMIN_API + "/banners")
      .then(({ data }) => setBanners(data.banners))
      .catch(() => showToast("Oops! Something went wrong", "error"));
  }, []);

  const handleDeleteImg = (id: string) => {
    axiosJWT
      .delete(ADMIN_API + `/banners/remove/${id}`)
      .then(({ data }) => {
        showToast(data.message);
        setBanners(banners.filter((b) => b._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const addNewBanner = (newBanner: BannerInterface) => {
    setBanners((prev) => [...prev, newBanner]);
  };

  return (
    <>
      <div className="flex justify-between items-center my-2">
        <h1 className="mb-2 text-xl font-semibold mt-2">Banners</h1>
        <Button
          label="Add"
          className="bg-orange-400 hove:bg-orange-500"
          handleButtonclick={() => setShowModal(true)}
        />
      </div>
      {banners.length ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg custom-vh">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SL:no
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, index) => (
                <BannerData
                  {...banner}
                  key={banner.image}
                  index={index + 1}
                  handleDeleteImg={handleDeleteImg}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="flex justify-center  items-center text-xl font-bold ">
          No banners
        </h1>
      )}
      {showModal && (
        <BannerModal
          setModalOpen={setShowModal}
          handleAddedBanner={addNewBanner}
        />
      )}
    </>
  );
};

export default Banners;
