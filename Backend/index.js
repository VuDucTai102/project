const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Định tuyến
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Khởi động
app.listen(port, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${port}`);
});
