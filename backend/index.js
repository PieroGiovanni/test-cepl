import express from "express";
import router from "./routers.js";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

const main = async () => {
  app.use(
    cors({
      credentials: true,
      origin: [
        "http://localhost:5173",
        "https://test-cepl-28409.firebaseapp.com",
        "https://test-cepl-28409.web.app",
      ],
    })
  );

  app.use(express.json());

  app.use("/api", router);

  app.use(errorHandler);

  app.listen(process.env.PORT);
  console.log(`Server running on port ${process.env.PORT}`);
};

main().catch((e) => console.log(e));
