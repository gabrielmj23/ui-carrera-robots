import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Card } from "./components/ui/card";
import { BotIcon, Clock, Flag } from "lucide-react";
import { SCHOOLS, type SchoolT } from "./constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

export default function App() {
  const [tiempos, setTiempos] = useState<string[]>([]);
  const [tiempoCrono, setTiempoCrono] = useState<string>("00:00.00");
  const [colegio, setColegio] = useState<SchoolT | null>(null);

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
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-purple-100 to-blue-100 p-6 flex items-center justify-center">
      <Card className="px-12 border-0 shadow-xl bg-white">
        <div className="flex items-center justify-center gap-4">
          <BotIcon size={40} className="text-gray-800" />
          <h1 className="font-bold text-gray-800">
            Competencia Intercolegial de Robótica
          </h1>
          <BotIcon size={40} className="text-gray-800" />
        </div>
        <div className="grid md:grid-cols-2 gap-6 pt-5">
          <div className="flex flex-col items-center justify-center order-2 md:order-1">
            {!!colegio ? (
              <>
                <img
                  src={colegio.logo}
                  alt="Colegio Los Próceres Logo"
                  className="w-40 h-40 object-contain"
                />
                <h2 className="text-xl font-bold mt-2 text-gray-800">
                  {colegio.name}
                </h2>
              </>
            ) : (
              <>
                <Select
                  onValueChange={(value) => {
                    const selectedSchool = Object.values(SCHOOLS).find(
                      (school) => school.id === value
                    );
                    setColegio(selectedSchool || null);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar colegio" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(SCHOOLS).map((school) => (
                      <SelectItem key={school.id} value={school.id}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-md border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium text-blue-700">Tiempo</h3>
              </div>
              <div className="text-5xl font-bold text-center py-4 text-blue-800 font-mono tracking-wider">
                {tiempoCrono}
              </div>
            </div>

            <ul className="space-y-3">
              {tiempos.map((tiempo, index) => (
                <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg border border-green-100 shadow-sm">
                  <Flag className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-sm text-green-700 font-medium">
                      Vuelta {index + 1}
                    </div>
                    <div className="text-xl font-bold text-green-800">
                      {tiempo}
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
