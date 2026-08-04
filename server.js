const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const methodOverride = require("method-override");

const todoRoutes = require("./routes/todoRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});                                                                          