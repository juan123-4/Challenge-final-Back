//Inicializa Firebase Admin
const admin = require("firebase-admin");
const serviceAccount = require("./config/fireBase");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const express = require('express')
const dbConnection = require('./config/config')
const app = express()
require('dotenv').config()
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authroutes = require("./routes/authRoutes");

// Habilitar CORS para todas las solicitudes
app.use(cors({
    origin: "http://localhost:5173", // el frontend
    credentials: true // para permitir cookies
  }));

const PORT = process.env.PORT || 3009
const routes = require('./routes/routes');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser()); 

app.use('/', routes);
app.use("/", authroutes);

dbConnection()

app.listen(PORT, () => {
  console.log(`Express está escuchando en el puerto http://localhost:${PORT}`)
})
