import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/users";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
