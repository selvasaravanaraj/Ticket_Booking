import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://bravinlc00123:0000@barvin.cnjhott.mongodb.net/Authentication")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Define Mongoose schema and model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model("Signup", userSchema);

// Routes
app.get("/", cors(), (req, res) => {
  res.send("Welcome to the authentication API");
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      if (user.password === password) {
        res.json("exist");
      } else {
        res.json("fail");
      }
    } else {
      res.json("notexist");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.json("fail");
  }
});

// Signup endpoint
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.json("exist");
    } else {
      const newUser = new UserModel({ username, email, password });
      await newUser.save();
      res.json("notexist");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.json("fail");
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});