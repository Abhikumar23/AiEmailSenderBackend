// backend/controller/email.js

const { GoogleGenerativeAI } = require("@google/generative-ai");
const nodemailer = require("nodemailer"); 
require("dotenv").config();

const genAI =new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Email content using Gemini
exports.generate = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    // Updated model name ---
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" , max_tokens: 300,});

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ email: text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({
      error: "Gemini generation failed",
      details: error.message,
    });
  }
};

// Send Email using Nodemailer
exports.send = async (req, res) => {
  const { recipients, subject, body } = req.body;

  if (!recipients || !recipients.length || !subject || !body) {
    return res.status(400).json({ error: "Recipients, subject, and body are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `Your Name <${process.env.EMAIL_USER}>`,
      to: recipients.join(","), // Works great for an array of emails
      subject,
      html: body,
    });

    res.json({ success: true, message: "Email sent successfully!" });

  } catch (err) {
    console.error("Send Email Error:", err);
    res.status(500).json({ error: "Failed to send email", details: err.message });
  }
};