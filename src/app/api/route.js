// const express = require("express");
// const axios = require("axios");

// const app = express();
// const port = 3001; // Puerto para tu servidor intermedio

// app.use(express.json());

// app.post("/generate-image", async (req, res) => {
//   try {
//     const response = await axios.post(
//       "https://api.prodia.com/v1/sd/generate",
//       req.body,
//       {
//         headers: {
//           "X-Prodia-Key": "e8346eb2-6187-4748-a42f-7241580ee1f1",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al obtener la imagen" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Servidor intermedio escuchando en el puerto ${port}`);
// });
