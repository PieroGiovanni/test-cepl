import express from "express";
import router from "./routers.js";
import cors from "cors";

const app = express();

const main = async () => {
  app.use(
    cors({
      credentials: true,
      origin: "*",
    })
  );

  app.use(express.json());

  app.use("/api", router);

  app.listen(process.env.PORT);
  console.log(`Server running on port ${process.env.PORT}`);
};

main().catch((e) => console.log(e));
