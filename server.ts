import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Obtener el portPath desde los argumentos de la CLI o variable de entorno
const portPath = process.argv[2] || process.env.SERIAL_PORT || "/dev/pts/3";
const baudRate = 115200;

console.log(`Usando puerto serial: ${portPath} a ${baudRate} bps`);

const serialPort = new SerialPort({ path: portPath, baudRate });
const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", (data: string) => {
  // Envía los datos recibidos a todos los clientes conectados
  console.log("Datos recibidos:", data.trim());
  io.emit("tiempo", data.trim());
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
