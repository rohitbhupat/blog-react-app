const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
require("dotenv").config();

//mongo db connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

//Routes
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
app.use("/api", blogRoutes);
app.use("/api", userRoutes);
app.use("/api", commentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
