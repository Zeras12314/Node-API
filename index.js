const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const productRoute = require("./routes/productRoute");
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello World")
});

app.use(errorMiddleware);

//routes
app.use("/api/products", productRoute);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
