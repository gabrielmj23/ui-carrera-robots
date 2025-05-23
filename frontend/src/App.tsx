import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

export default function App() {
  const [tiempos, setTiempos] = useState<string[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("tiempo", (data: string) => {
      setTiempos((prev) => [...prev, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1 className="font-bold">Competencia Intercolegial de Robótica</h1>
      <div className="grid grid-cols-12 gap-1 py-3">
        <div className="col-span-5">
          <img alt="Logo del colegio"></img>
          <span className="text-lg">Nombre del colegio</span>
        </div>
        <div className="col-span-7">
          <div className="pb-2">
            <h2 className="text-start text-xl font-bold">Tiempo</h2>
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
