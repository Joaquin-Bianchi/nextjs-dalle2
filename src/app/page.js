"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  return (
    <main className="flex flex-col items-center   p-24">
      <h1 className="text-4xl text-white ">DALLE-2 Art Generator</h1>
      <form
        className="flex items-baseline "
        onSubmit={(e) => {
          e.preventDefault();
          console.log(prompt);
        }}
      >
        <input
          className="bg-gray-800 px-2 py-1 text-lg  text-white  rounded"
          type="text"
          placeholder="Write your prompt"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          required
        />
        <button className="bg-yellow-400  px-2 py-1 text-lg mt-2 rounded  font-normal text-slate-950 hover:bg-yellow-500">
          Generate
        </button>
      </form>
    </main>
  );
}
