import { createContext, useContext, useEffect, useState } from "react";

interface CloudinaryWidgetConfig {
  cloudName: string;
  uploadPreset: string;
  cropping: boolean;
  maxImageWidth?: number;
  croppingAspectRatio?: number;
  showSkipCropButton?: boolean;
  croppingCoordinatesMode?: string;
  croppingDefaultSelectionRatio?: number;
  resourceType?: string;
  clientAllowedFormats: string[];
}

interface CloudinaryWidgetResult {
  event: string;
  info: {
    public_id: string;
    secure_url: string;
  };
}

/* gloabl type defenition used for  cloudinary upload widget script, 
(as it is loading in window we need to define the types while importing) */

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: CloudinaryWidgetConfig,
        callback: (error: any, result: CloudinaryWidgetResult) => void
      ) => any;
    };
  }
}

export const CloudinaryScriptContext = createContext<{
  loaded: boolean;
} | null>(null);

export const useCloudinaryScript = () => {
  return useContext(CloudinaryScriptContext);
};

interface UploadWidgetProps {
  uwConfig: CloudinaryWidgetConfig;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

const CloudinaryUploadWidget: React.FC<UploadWidgetProps> = ({
  uwConfig,
  setImageUrl,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = async () => {
    setIsLoading(true);
    const myWidget = window.cloudinary.createUploadWidget(
      uwConfig,
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
    if (loaded) {
      await myWidget.open();
      setIsLoading(false);
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="bg-blue-500 py-1 px-4 disabled:cursor-not-allowed rounded-md text-white font-semibold shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="button"
        onClick={initializeCloudinaryWidget}
        disabled={isLoading}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
};

export default CloudinaryUploadWidget;
