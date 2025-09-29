const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const users = []; // temp in-memory storage

// Signup
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { id: Date.now(), name, email, password: hashedPassword };
    users.push(user);

    res.json({ message: "User registered successfully" });
});

// Signin
app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, "secretKey", { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
});

app.listen(5000, () => console.log("Server running on port 5000"));
