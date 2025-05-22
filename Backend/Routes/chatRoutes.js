// CommonJS approach
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

// Parse JSON bodies
router.use(express.json());

const knowledgeFilePath = "Knowledge.json";

function loadKnowledge() {
  try {
    return JSON.parse(fs.readFileSync(knowledgeFilePath, "utf8"));
  } catch (error) {
    console.error("Error loading knowledge file:", error.message);
    return [];
  }
}

function saveKnowledge(data) {
  try {
    fs.writeFileSync(knowledgeFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error saving knowledge file:", error.message);
    throw error;
  }
}

async function queryGemini(prompt) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
  } catch (error) {
    console.error("Error querying Gemini API:", error.message);
    throw error;
  }
}

router.post("/query", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const knowledge = loadKnowledge();
    const context = knowledge
      .map((item) => `${item.title}:\n${item.content}`)
      .join("\n\n");

    const prompt = `
You are a helpful assistant answering only using the company's internal data. Also if user try to do some informal converstion, try to shift the conversation towards company related talks. Be humble. Be concise. Also if user is ending the talk, say a thank you message and ask to visit again the site. If the answer is not present in the provided context, respond with "Sorry I don't know this. For more information you can visit to {https://GlobalHealth.com/}"

Context: ${context}

Question: ${question}

Give a clear, concise answer based only on the context above.`;

    const answer = await queryGemini(prompt);
    res.json({ answer });
  } catch (err) {
    console.error("Error processing query:", err.message);
    res.status(500).json({ error: "Failed to process query" });
  }
});

router.post("/addData", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    const knowledge = loadKnowledge();
    const newData = { title, content };
    knowledge.push(newData);
    saveKnowledge(knowledge);

    res.json({ message: "Data added successfully", newEntry: newData });
  } catch (err) {
    console.error("Error adding data:", err.message);
    res.status(500).json({ error: "Failed to add data" });
  }
});

module.exports = router;