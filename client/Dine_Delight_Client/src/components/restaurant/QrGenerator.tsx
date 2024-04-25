import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { QRCodeCanvas } from "qrcode.react";
import uploadImagesToCloudinary from "../../Api/uploadImages";
import axiosJWT from "../../utils/axiosService";
import { RESTAURANT_API } from "../../constants";
import showToast from "../../utils/toaster";
import { useAppSelector } from "../../redux/store/Store";
import Button from "./Button";

const QrGenerator: React.FC<{ setIsModalOpen: (isOpen: boolean) => void }> = ({
  setIsModalOpen,
}) => {
  const { id } = useAppSelector((state) => state.UserSlice);
  const [inputText, setInputText] = useState(
    `${import.meta.env.VITE_CLIENT_URL}/menu/${id}`
  );
  const [qrCode, setQrCode] = useState<string | null>(null);

  const downloadQRCode = async () => {
    const qrCodeCanvas = document.getElementById(
      "qrCodeEl"
    ) as HTMLCanvasElement | null;
    if (qrCodeCanvas) {
      qrCodeCanvas.toBlob(async (blob) => {
        if (blob) {
          const file = blob as File;
          const url: any = await uploadImagesToCloudinary([file]);
          axiosJWT
            .put(RESTAURANT_API + "/info", { qrCode: url[0] })
            .then(() => {
              showToast("Qr saved successfully");
            })
            .catch((error) => console.log(error));
        }
      }, "image/png");

      const qrCodeURL = qrCodeCanvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      let aEl = document.createElement("a");
      aEl.href = qrCodeURL;
      aEl.download = "QR_Code.png";
      document.body.appendChild(aEl);
      aEl.click();
      document.body.removeChild(aEl);
    }
  };
  useEffect(() => {
    axiosJWT
      .get(RESTAURANT_API + "/info")
      .then(({ data }) => {
        const qr = data.restaurant.qrCode;
        qr && setQrCode(qr);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="fixed inset-0 z-50  overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center ">
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-3 sm:top-7">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900 inline-flex items-center gap-2">
            Qrcode for Menu
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center"
            onClick={() => setIsModalOpen(false)}
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 md:p-5">
          <div className="grid grid-cols-4 space-y-2 mb-2">
            {qrCode && qrCode.length ? (
              <div className="col-span-4 flex justify-center">
                <img src={qrCode} alt="" width={"200px"} height={"200px"} />
              </div>
            ) : (
              <>
                <div className="col-span-4">
                  <input
                    type="text"
                    value={inputText}
                    placeholder="eg: https://example.com/"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>
                {inputText.length ? (
                  <div className="col-span-4 flex justify-center">
                    <QRCodeCanvas
                      id="qrCodeEl"
                      size={150}
                      value={inputText.trim()}
                    />
                  </div>
                ) : null}
              </>
            )}
          </div>
          {qrCode && qrCode.length ? (
            <Button
              className=" w-full bg-green-500 hover:bg-green-600
              focus:ring-green-400 focus:ring-2 focus:outline-none  font-medium rounded-lg
     "
              buttontype="button"
              label="Change Qr"
              handleButtonclick={() => setQrCode(null)}
            />
          ) : (
            <Button
              className="w-full   bg-green-500 hover:bg-green-600
          focus:ring-green-400 focus:ring-2 focus:outline-none  font-medium rounded-lg
          "
              buttontype="button"
              label="Download & Save "
              handleButtonclick={downloadQRCode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;
