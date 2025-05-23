import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const App: React.FC = () => {
  const [tiempos, setTiempos] = useState<string[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("tiempo", (data: string) => {
      setTiempos((prev) => [data, ...prev]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>Tiempos de Carrera en Vivo</h1>
      <ul>
        {tiempos.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
