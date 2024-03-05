import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./routes/router";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/Store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <GoogleOAuthProvider clientId="626182367661-ema6lqhd60ubf3unmq6epapvqon85np0.apps.googleusercontent.com">
            <BrowserRouter>
              <MainRouter />
            </BrowserRouter>
            <Toaster />
          </GoogleOAuthProvider>
          ;
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
