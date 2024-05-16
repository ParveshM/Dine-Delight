import { Server } from "http";
import configKeys from "../../config";

const server = (app: Server) => {
  app.listen(configKeys.PORT, () =>
    console.log(`Server listening on http://localhost:${configKeys.PORT}`)
  );
};
export default server;
