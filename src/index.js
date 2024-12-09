import { app } from "./app.js";
import dotenv from "dotenv";
import db from "./db/index.js";

dotenv.config();

const port = process.env.PORT || 3008; // Default port 3001 if not defined

console.log("Trying to run on PORT => ", process.cwd());

db.serialize(() => {
  app.listen(port, () => {
    console.log("Server is running on port", port);
  });
}).on("error", (err) => {
  console.log("Database connection error: ", err);
});
