const express = require("express");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (async/await for clarity)


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a model (using `mongoose.model`)
const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  currency: {
    type: String,
  },
  stock: {
    type: Number,
  },
  urlImage: {
    type: String,
  },
  specs: {
    type: mongoose.Schema.Types.Mixed, // Allows any type of data
  },
});

// Create the model using `mongoose.model`
const Product = mongoose.model("Product", productSchema);

// Rutas
app.get("/products", async (req, res) => {
  try {
    const items = await Product.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" }); // Handle errors gracefully
  }
});

app.post("/product", async (req, res) => {
  try {
    const newItem = new Product(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating product" }); // Handle validation errors or other creation issues
  }
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
