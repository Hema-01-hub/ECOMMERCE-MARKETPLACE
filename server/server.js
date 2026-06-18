const reviewRoutes = require("./routes/ReviewRoutes");
const wishlistRoutes = require("./routes/WishlistRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const cartRoutes = require("./routes/CartRoutes");
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-Commerce Backend Working ✅");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5002;
app.use("/api", productRoutes);

app.use("/api", userRoutes);

app.use("/api", cartRoutes);

app.use("/api", orderRoutes);

app.use("/api", adminRoutes);

app.use("/api", wishlistRoutes);

app.use("/api", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});