const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes')
const cors = require('cors');

//configure env
dotenv.config();

//DB connection
connectDB();

//Rest Object
const app = express();

//middlewares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//Rest API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Apna-bazaar</h1>");
});

const PORT = process.env.PORT || 8080;

//Listen
app.listen(PORT, () =>
  console.log(`Server running on port: ${PORT}`.bgCyan.white)
);
