import express from "express";

import {
  getTestData,
  initializeFirebaseApp,
  updateTestData,
} from "./lib/firebase.js";

const app = express();

const main = async () => {
  initializeFirebaseApp();
  getTestData();
  // updateTestData();

  app.listen(process.env.PORT);
  console.log(`Server running on port ${process.env.PORT}`);
};

main().catch((e) => console.log(e));
