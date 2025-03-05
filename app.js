import express from 'express'
import multer from "multer";
import uploadImageController from './controller/imageController.js'
import uploadJsonController from './controller/jsonController.js'
import dotenv from "dotenv";

dotenv.config();

const app = express()
app.use(express.json());

const port = process.env.PORT || 3000

// Configurar Multer solo en rutas que manejan archivos
const storage = multer.memoryStorage(); // Guarda en RAM sin escribir en disco
const upload = multer({ storage });

app.post('/image', upload.single("image"), uploadImageController)

app.post('/json', uploadJsonController)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})