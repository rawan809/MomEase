import { createContext, useContext, useState, useEffect } from "react";
import {
  GetChildren,
  GetChildById,
  AddChild,
  UpdateChild,
  DeleteChild,
  UploadChildPhoto,
  DeleteChildPhoto,
} from "../../services/children";
import { useAuth } from "./AuthContext";

export type Child = {
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

export type ChildPayload = {
  fullName: string;
  gender: string;
  birthDate: string;
  deliveryType: string;
  feedingTypeForBaby: string;
};

type ChildContextType = {
  children: Child[];
  selectedChildId: number | null;
  setSelectedChildId: (id: number | null) => void;
  selectedChild: Child | null;
  loading: boolean;
  refreshChildren: () => Promise<Child[] | void>;
  fetchChildren: () => Promise<Child[] | void>;
  fetchChildById: (id: number) => Promise<Child | void>;
  addChild: (data: ChildPayload) => Promise<Child>;
  editChild: (id: number, data: ChildPayload) => Promise<Child>;
  deleteChild: (id: number) => Promise<void>;
  uploadPhoto: (id: number, photo: File) => Promise<void>;
  deletePhoto: (id: number) => Promise<void>;
};

const ChildContext = createContext<ChildContextType | null>(null);

export function ChildProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [childrenList, setChildrenList] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all children
  async function fetchChildren() {
    setLoading(true);
    try {
      const res = await GetChildren();
      const list = res.data || [];
      setChildrenList(list);

      // Auto-select the first child if none is selected yet
      if (list.length > 0 && selectedChildId === null) {
        setSelectedChildId(list[0].childId);
      }
      return list;
    } catch (error) {
      console.error("Error fetching children:", error);
    } finally {
      setLoading(false);
    }
  }

  // Fetch single child by id
  async function fetchChildById(id: number) {
    try {
      const res = await GetChildById(id);
      if (selectedChildId === id) {
        setSelectedChild(res.data);
      }
      return res.data;
    } catch (error) {
      console.error("Error fetching child by id:", error);
    }
  }

  // Effect to automatically sync selectedChild details when selectedChildId or children list changes
  useEffect(() => {
    if (selectedChildId !== null) {
      const found = childrenList.find((c) => c.childId === selectedChildId);
      if (found) {
        setSelectedChild(found);
      } else {
        // If not found in current list, fetch it
        fetchChildById(selectedChildId);
      }
    } else {
      setSelectedChild(null);
    }
  }, [selectedChildId, childrenList]);

  // Initial fetch
  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      fetchChildren();
    }
  }, [isAuthenticated]);

  // CRUD Actions
  const addChild = async (data: ChildPayload) => {
    setLoading(true);
    try {
      const res = await AddChild(data);
      if (!res.success) {
        throw new Error(res.message);
      }
      const newChild = res.data;
      // setChildrenList((prev) => [newChild, ...prev]);

      // If it was the first baby, auto-select it
      setChildrenList((prev) => {
        if (prev.length === 0) {
          setSelectedChildId(newChild.childId);
        }

        return [newChild, ...prev];
      });
      return newChild;
    } catch (err: any) {
      console.error(err);
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editChild = async (id: number, data: ChildPayload) => {
    setLoading(true);
    try {
      const res = await UpdateChild(id, data);
      if (!res.success) {
        throw new Error(res.message);
      }
      const updatedChild = res.data;
      setChildrenList((prev) =>
        prev.map((child) => (child.childId === id ? updatedChild : child)),
      );
      if (selectedChildId === id) {
        setSelectedChild(updatedChild);
      }
      return updatedChild;
    } catch (err: any) {
      console.error(err);
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteChild = async (id: number) => {
    setLoading(true);
    try {
      const res = await DeleteChild(id);
      if (!res.success) {
        throw new Error(res.message);
      }
      setChildrenList((prev) => prev.filter((child) => child.childId !== id));
      if (selectedChildId === id) {
        // Find another child to select or null
        const remaining = childrenList.filter((child) => child.childId !== id);
        if (remaining.length > 0) {
          setSelectedChildId(remaining[0].childId);
        } else {
          setSelectedChildId(null);
          setSelectedChild(null);
        }
      }
    } catch (err: any) {
      console.error(err);
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadPhoto = async (id: number, photo: File) => {
    setLoading(true);
    try {
      const res = await UploadChildPhoto(id, photo);
      const updatedPhotoUrl = res.data?.photoUrl;
      setChildrenList((prev) =>
        prev.map((child) =>
          child.childId === id
            ? { ...child, photoUrl: updatedPhotoUrl || child.photoUrl }
            : child,
        ),
      );
      if (selectedChildId === id) {
        setSelectedChild((prev) =>
          prev ? { ...prev, photoUrl: updatedPhotoUrl || prev.photoUrl } : null,
        );
      }
      // return res.data;
    } catch (err: any) {
      console.error(err);
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePhoto = async (id: number) => {
    setLoading(true);
    try {
      await DeleteChildPhoto(id);
      setChildrenList((prev) =>
        prev.map((child) =>
          child.childId === id ? { ...child, photoUrl: null } : child,
        ),
      );
      if (selectedChildId === id) {
        setSelectedChild((prev) => (prev ? { ...prev, photoUrl: null } : null));
      }
    } catch (err: any) {
      console.error(err);
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChildContext.Provider
      value={{
        children: childrenList,
        selectedChildId,
        setSelectedChildId,
        selectedChild,
        loading,
        refreshChildren: fetchChildren,
        fetchChildren,
        fetchChildById,
        addChild,
        editChild,
        deleteChild,
        uploadPhoto,
        deletePhoto,
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
