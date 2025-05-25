export type SchoolT = {
  id: string;
  name: string;
  logo: string;
};

export const SCHOOLS: Record<string, SchoolT> = {
  "los-proceres": {
    id: "los-proceres",
    name: "U.E. Colegio Los Próceres",
    logo: "los-proceres.png",
  },
  loyola: {
    id: "loyola",
    name: "Colegio Loyola Gumilla",
    logo: "loyola.png",
  },
};
