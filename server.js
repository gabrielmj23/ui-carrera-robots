// Configuración del backend Node.js para leer datos seriales y servir el frontend
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Configura aquí el puerto serial (ajusta el path según tu sistema)
const portPath = "/dev/ttyUSB0"; // Cambia esto por el puerto correcto
const serialPort = new SerialPort(portPath, { baudRate: 12500 });
const parser = serialPort.pipe(new Readline({ delimiter: "\n" }));

parser.on("data", (data) => {
  // Envía los datos recibidos a todos los clientes conectados
  io.emit("tiempo", data.trim());
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Servir el frontend de Vite (build) si es necesario
// app.use(express.static('frontend/dist'));

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
