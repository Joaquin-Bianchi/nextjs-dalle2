"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Estado para la URL de la imagen

  const handleGenerateImage = async () => {
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

      const responseData = await response.json();
      const job = responseData.job; // Obtenemos el "job" de la respuesta
      setImageUrl(`https://images.prodia.xyz/${job}.png`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center mt-8">
      <h1 className="text-4xl text-white font-sans">Image Generator</h1>
      <form
        className="flex items-baseline mt-5"
        onSubmit={async (e) => {
          e.preventDefault();
          handleGenerateImage();
        }}
      >
        <input
          className="bg-gray-800 px-2 py-1 text-lg text-white rounded"
          type="text"
          placeholder="Write your prompt"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          required
        />
        <button className="bg-yellow-400 px-2 py-1 text-lg mt-2 rounded font-normal text-slate-950 hover:bg-yellow-500">
          Generate
        </button>
      </form>
      {imageUrl && (
        <img src={imageUrl} alt="Generated Image" width={200} height={200} />
      )}
    </main>
  );
}
