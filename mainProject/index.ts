import express from "express";
import userRoutes from "./routes/users";
import groupRouter from "./routes/groups";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/groups", groupRouter);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
