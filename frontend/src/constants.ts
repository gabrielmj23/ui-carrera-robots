export type SchoolT = {
  id: string;
  name: string;
  logo: string;
  robots: string[];
};

export const SCHOOLS: Record<string, SchoolT> = {
  "fe-alegria": {
    id: "fe-alegria",
    name: "Fe y Alegría Simón Rodríguez",
    logo: "fe-alegria.png",
    robots: ["Hopebot", "Hoppy", "Kratos"],
  },
  "jesus-obrero": {
    id: "jesus-obrero",
    name: "U.E. Colegio Jesús Obrero",
    logo: "jesus-obrero.png",
    robots: ["McQueen"],
  },
  "los-proceres": {
    id: "los-proceres",
    name: "U.E. Colegio Los Próceres",
    logo: "los-proceres.png",
    robots: ["TurboRacer"],
  },
  loyola: {
    id: "loyola",
    name: "Colegio Loyola Gumilla",
    logo: "loyola.png",
    robots: ["Turb0"],
  },
  "miguel-otero": {
    id: "miguel-otero",
    name: "U.E. Colegio Miguel Otero Silva",
    logo: "miguel-otero.png",
    robots: ["MOS Thunderbolt"],
  },
  "monte-sacro": {
    id: "monte-sacro",
    name: "U.E. Colegio Monte Sacro",
    logo: "monte-sacro.png",
    robots: ["Dragonforce", "Flash"],
  },
  nazaret: {
    id: "nazaret",
    name: "U.E. Colegio Nazaret",
    logo: "nazaret.png",
    robots: ["StormRunner"],
  },
  lourdes: {
    id: "lourdes",
    name: "U.E. Colegio Nuestra Señora de Lourdes",
    logo: "lourdes.png",
    robots: ["Velociraptor"],
  },
};
