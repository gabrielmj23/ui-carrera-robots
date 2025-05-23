import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

export default function App() {
  const [tiempos, setTiempos] = useState<string[]>([]);
  const [tiempoCrono, setTiempoCrono] = useState<string>("00:00:00");

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("tiempo", (data: string) => {
      console.log("Datos recibidos:", data);
      if (data.startsWith("vuelta")) {
        const tiempo = data.split(" ")[1];
        setTiempos((prev) => [...prev, tiempo]);
      } else {
        setTiempoCrono(data);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center">
      <h1 className="font-bold pb-12">Competencia Intercolegial de Robótica</h1>
      <div className="grid grid-cols-12 gap-2 py-3">
        <div className="col-span-5 flex flex-col items-center">
          <img
            alt="Logo del colegio"
            src="los-proceres.png"
            className="h-40"
          ></img>
          <span className="text-lg">U.E. Colegio Los Próceres</span>
        </div>
        <div className="col-span-7">
          <div className="pb-2 text-start">
            <h2 className="text-start text-xl font-bold">Tiempo</h2>
            <span className="text-6xl">{tiempoCrono}</span>
          </div>
          <hr></hr>
          <ul className="text-start space-y-1 pt-2">
            {tiempos.map((tiempo, index) => (
              <li key={index}>
                Vuelta {index + 1}: {tiempo}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
