import express from 'express'
import multer from "multer";
import { uploadImageController, uploadMetadataController } from './controller/ipfsController.js'
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express()

app.use(express.json())
app.use(cors());




const port = process.env.PORT || 3000

// Configurar Multer solo en rutas que manejan archivos
const storage = multer.memoryStorage(); // Guarda en RAM sin escribir en disco
const upload = multer({ storage });

app.post('/image', upload.single("image"), uploadImageController)
app.post('/metadata', uploadMetadataController)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})