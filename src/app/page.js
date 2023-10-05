"use client";
import { useState } from "react";
import { RiImage2Line, RiImageEditFill } from "react-icons/ri";
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleGenerateImage = async () => {
    const jobId = await fetchJobId();

    if (jobId) {
      const image = await fetchImage(jobId);

      if (image) {
        setImageUrl(image);
      }
    }
  };
  const fetchJobId = async () => {
    try {
      // Realiza la solicitud para obtener un jobId
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "X-Prodia-Key": "e8346eb2-6187-4748-a42f-7241580ee1f1",
        },
        body: JSON.stringify({ prompt: prompt }), // Aquí usas la variable 'prompt'
      };

      // Realiza la solicitud con 'fetch' y espera la respuesta
      const response = await fetch(
        "https://api.prodia.com/v1/sd/generate",
        options
      );

      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error("Error en la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const fetchImage = async (jobId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-Prodia-Key": "e8346eb2-6187-4748-a42f-7241580ee1f1",
      },
    };

    fetch(`https://api.prodia.com/v1/job/${jobId}`, options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  return (
    <main className="flex flex-col items-center mt-8">
      <div className=" flex gap-1 ">
        <RiImage2Line size="50px" className="text-white" />
        <h1 className="text-5xl text-white font-sans font-bold   ">
          xProdia Image Generation
        </h1>
      </div>
      <form
        className="flex items-baseline w-[540px] mt-14"
        onSubmit={async (e) => {
          e.preventDefault();
          handleGenerateImage();
        }}
      >
        <input
          className="bg-[#3f3f3f] px-7 py-3 w-full text-xl text-white   rounded outline-none"
          type="text"
          placeholder="Write your prompt"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          required
        />
        <button className="bg-yellow-400 px-7 py-3 text-lg mt-2 rounded font-normal text-slate-950 hover:bg-yellow-500">
          Generate
        </button>
      </form>
      <div className="bg-[#1e1e1e] w-[540px] h-[540px] text-white grid place-content-center">
        <h3>Esperando el prompt</h3>
        {imageUrl && (
          <img src={imageUrl} alt="Generated Image" width={200} height={200} />
        )}
      </div>
    </main>
  );
}
