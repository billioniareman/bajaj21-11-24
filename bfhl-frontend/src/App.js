// App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS for styling

function App() {
    const [jsonInput, setJsonInput] = useState(""); // Store user input
    const [response, setResponse] = useState(null); // Store API response
    const [error, setError] = useState(""); // Store error messages

    const handleSubmit = async () => {
        setError(""); // Clear any previous errors
        try {
            const parsedInput = JSON.parse(jsonInput); // Validate and parse the JSON input
            if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
                throw new Error("Input should be an object with a 'data' key containing an array.");
            }

            // Send the data to the backend
            const { data } = await axios.post("https://bajaj21-11-24.vercel.app/bfhl", { data: parsedInput.data });

            setResponse(data); // Set the response to display
        } catch (err) {
            setError("Invalid JSON or API error: " + err.message); // Handle JSON or API errors
        }
    };

    return (
        <div className="container">
            <h1>BFHL Challenge</h1>
            <textarea
                rows="6"
                placeholder='Enter JSON e.g., { "data": ["A", "1", "b"] }'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)} // Update input on change
                className="input-area"
            />
            <button onClick={handleSubmit} className="submit-btn">Submit</button>

            {/* Display error messages */}
            {error && <div className="error">{error}</div>}

            {/* Display the response in a formatted way */}
            {response && (
                <div className="response-container">
                    <h3>Response:</h3>
                    <div className="response">
                        <div><strong>User ID:</strong> {response.user_id}</div>
                        <div><strong>Numbers:</strong> {response.numbers.length ? response.numbers.join(", ") : "None"}</div>
                        <div><strong>Alphabets:</strong> {response.alphabets.length ? response.alphabets.join(", ") : "None"}</div>
                        <div><strong>Highest Lowercase Alphabet:</strong> {response.highest_lowercase_alphabet || "None"}</div>
                        <div><strong>Prime Found:</strong> {response.is_prime_found ? "Yes" : "No"}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
