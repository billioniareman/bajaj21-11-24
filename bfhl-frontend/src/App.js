import React, { useState } from "react";

const Home = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await fetch("/api/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsedInput.data, file_b64: parsedInput.file_b64 }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert("Invalid JSON input");
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;
    let filteredData = {};
    if (filter.includes("Alphabets")) filteredData.alphabets = response.alphabets;
    if (filter.includes("Numbers")) filteredData.numbers = response.numbers;
    if (filter.includes("Highest Lowercase Alphabet"))
      filteredData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    return JSON.stringify(filteredData, null, 2);
  };

  return (
    <div>
      <title>Your Roll Number</title>
      <textarea
        placeholder='Enter JSON input'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <label>Select Filters:</label>
        <select
          multiple
          onChange={(e) =>
            setFilter(Array.from(e.target.selectedOptions, (option) => option.value))
          }
        >
          <option>Alphabets</option>
          <option>Numbers</option>
          <option>Highest Lowercase Alphabet</option>
        </select>
      </div>
      <pre>{renderFilteredResponse()}</pre>
    </div>
  );
};

export default Home;
