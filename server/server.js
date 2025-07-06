const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const visitorRoutes = require("./routes/visitorRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/visitors", visitorRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
