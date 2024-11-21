// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

// Endpoint to check if the server is running
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST /bfhl to process the data
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body; // Destructure the 'data' from the body
        if (!data || !Array.isArray(data)) {
            throw new Error("Invalid input format. Expected an array under 'data'.");
        }

        // Process the input data
        let numbers = [], alphabets = [], highestLowercase = [];
        data.forEach((item) => {
            if (!isNaN(item)) numbers.push(item); // Collect numbers
            else alphabets.push(item); // Collect alphabets
            if (item === item.toLowerCase() && /^[a-z]$/.test(item)) highestLowercase.push(item); // Lowercase letters
        });

        // Response
        res.status(200).json({
            is_success: true,
            user_id: "rishabh_singh_11051996", // Replace with your actual user ID
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercase.sort().pop() || null, // Get the highest lowercase alphabet
            is_prime_found: numbers.some((num) => isPrime(num)), // Check if any number is prime
        });
    } catch (err) {
        res.status(400).json({ is_success: false, message: err.message }); // Send error response if something goes wrong
    }
});

// Helper function to check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Start server on a specific port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
