import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index";
import "./config/database";
import db from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", routes);


app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando correctamente con TypeScript + Express");
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
