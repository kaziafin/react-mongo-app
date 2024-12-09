const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Use built-in JSON parser
app.use(express.urlencoded({ extended: true })); // Use built-in URL-encoded parser

// CORS configuration
app.use(cors({ origin: "http://localhost:3000" }));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/react_mongodb_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// API Routes
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error });
  }
});
app.get("/api/AllUser", async  (req, res) => {
  try{
   const users= await User.find();
    res.status(200).json(users)

  }catch(error){
    res.status(500).json({ message: "Error saving user", error });
  }


});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
