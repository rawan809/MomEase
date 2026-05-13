import { createContext, useContext, useState, useEffect } from "react";
import { GetChildren } from "../../services/children";

type child = {
  childId: number;
  fullName: string;
  gender: "Boy" | "Girl";
  birthDate: string;
  ageInMonths: number;
  ageInDays: number;
  deliveryType: "Normal" | "Cesarean";
  feedingTypeForBaby: "Breastfeeding" | "Formula" | "SolidFood";
  photoUrl: string | null;
};

type ChildContextType = {
  children: child[];
  selectedChildId: number | null;
  setSelectedChildId: (id: number) => void;
  refreshChildren: () => Promise<child[] | void>;
};

const ChildContext = createContext<ChildContextType | null>(null);

export function ChildProvider({ children }: { children: React.ReactNode }) {
  const [childrenList, setChildrenList] = useState<child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

  //   call children
  async function fetchChildren() {
    try {
      const res = await GetChildren();
      setChildrenList(res.data);
      if (res.data.length > 0 && !selectedChildId) {
        setSelectedChildId(res.data[0].childId);
      }
      return res.data;
    } catch (error) {
      console.error("Error fetching children:", error);
    }
  }

  useEffect(() => {
    fetchChildren();
  }, []);
  return (
    <ChildContext.Provider
      value={{
        children: childrenList,
        selectedChildId,
        setSelectedChildId,
        refreshChildren: fetchChildren,
      }}
    >
      {children}
    </ChildContext.Provider>
  );
}

export function useChild() {
  const context = useContext(ChildContext);
  if (!context) throw new Error("useChild must be used inside ChildProvider");
  return context;
}
