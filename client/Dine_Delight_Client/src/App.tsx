import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./routes/router";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/Store";
import { PersistGate } from "redux-persist/integration/react";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter>
          <Toaster />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
