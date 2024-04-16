import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./routes/router";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/Store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import ChatIcon from "./components/chat/ChatIcon";
import SocketProvider from "./redux/Context/SocketContext";

const App = () => {
  return (
    <SocketProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <BrowserRouter>
              <MainRouter />
              <ChatIcon />
            </BrowserRouter>
            <Toaster />
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </SocketProvider>
  );
};

export default App;
