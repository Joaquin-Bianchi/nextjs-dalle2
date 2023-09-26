"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerateImage = async () => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    };

    try {
      const response = await fetch("/api/generate", options);
      if (!response.ok) {
        throw new Error("Error al obtener la imagen");
      }

      const responseData = await response.json();
      const imageUrl = responseData.imageUrl;
      setGeneratedImage(imageUrl);
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
