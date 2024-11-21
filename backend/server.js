const atob = require("atob");

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ operation_code: 1 });
  } else if (req.method === "POST") {
    try {
      const { data, file_b64 } = req.body;

      const numbers = data.filter((item) => !isNaN(item)).map(Number);
      const alphabets = data.filter((item) => isNaN(item));

      const lowercaseAlphabets = alphabets.filter((char) => /[a-z]/.test(char));
      const highestLowercase = lowercaseAlphabets.sort().slice(-1);

      const isPrimeFound = numbers.some(isPrime);

      let fileValid = false;
      let fileMimeType = null;
      let fileSizeKB = 0;

      if (file_b64) {
        try {
          const buffer = Buffer.from(file_b64, "base64");
          fileMimeType = "application/octet-stream";
          fileSizeKB = (buffer.length / 1024).toFixed(2);
          fileValid = true;
        } catch (e) {
          fileValid = false;
        }
      }

      res.status(200).json({
        is_success: true,
        user_id: "your_name_ddmmyyyy",
        email: "your_email@example.com",
        roll_number: "your_roll_number",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase,
        is_prime_found: isPrimeFound,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB,
      });
    } catch (error) {
      res.status(500).json({ is_success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
