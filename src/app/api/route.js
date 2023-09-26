// api/generate.js (o el nombre que desees)
const fetch = require("node-fetch");

export default async function handler(req, res) {
  const { prompt } = req.body;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-Prodia-Key": "e8346eb2-6187-4748-a42f-7241580ee1f1",
    },
    body: JSON.stringify({ prompt: prompt }),
  };

  try {
    const response = await fetch(
      "https://api.prodia.com/v1/sd/generate",
      options
    );
    if (!response.ok) {
      throw new Error("Error al obtener la imagen");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la imagen" });
  }
}
