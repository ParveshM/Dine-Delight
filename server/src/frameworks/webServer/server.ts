import { Application } from "express";
import configKeys from "../../config";

const server = (app: Application) => {
  app.listen(configKeys.PORT, () =>
    console.log(`Server listening on http://localhost${configKeys.PORT}`)
  );
};
export default server;
