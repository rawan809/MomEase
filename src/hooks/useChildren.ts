import { useEffect, useState } from "react";

import {
  GetChildren,
  GetChildById,
  AddChild,
  UpdateChild,
  DeleteChild,
  UploadChildPhoto,
  DeleteChildPhoto,
} from "../../services/children";

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

type ChildPayload = {
  fullName: string;
  gender: string;
  birthDate: string;
  deliveryType: string;
  feedingTypeForBaby: string;
};

export function useChildren() {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  const [loading, setLoading] = useState(false);

  //  FETCH ALL

  const fetchChildren = async () => {
    setLoading(true);

    try {
      const res = await GetChildren();

      setChildren(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //  FETCH ONE

  const fetchChildById = async (id: number) => {
    try {
      const res = await GetChildById(id);

      setSelectedChild(res.data);

      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  //  ADD

  const addChild = async (data: ChildPayload) => {
    try {
      const res = await AddChild(data);
      console.log(res);

      if (!res.success) {
        throw new Error(res.message);
      }

      setChildren((prev) => [res.data, ...prev]);

      return res.data;
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  //  UPDATE

  const editChild = async (id: number, data: ChildPayload) => {
    try {
      const res = await UpdateChild(id, data);

      if (!res.success) {
        throw new Error(res.message);
      }

      setChildren((prev) =>
        prev.map((child) => (child.childId === id ? res.data : child)),
      );

      if (selectedChild?.childId === id) {
        setSelectedChild(res.data);
      }

      return res.data;
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  //  DELETE

  const deleteChild = async (id: number) => {
    try {
      const res = await DeleteChild(id);

      if (!res.success) {
        throw new Error(res.message);
      }

      setChildren((prev) => prev.filter((child) => child.childId !== id));

      if (selectedChild?.childId === id) {
        setSelectedChild(null);
      }
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  //  UPLOAD PHOTO

  const uploadPhoto = async (id: number, photo: File) => {
    try {
      const res = await UploadChildPhoto(id, photo);

      setChildren((prev) =>
        prev.map((child) =>
          child.childId === id
            ? {
                ...child,
                photoUrl: res.data?.photoUrl || child.photoUrl,
              }
            : child,
        ),
      );

      return res.data;
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  //  DELETE PHOTO

  const deletePhoto = async (id: number) => {
    try {
      await DeleteChildPhoto(id);

      setChildren((prev) =>
        prev.map((child) =>
          child.childId === id
            ? {
                ...child,
                photoUrl: null,
              }
            : child,
        ),
      );
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  //  RETURN

  return {
    children,
    selectedChild,
    loading,

    // fetch
    fetchChildren,
    fetchChildById,

    // CRUD
    addChild,
    editChild,
    deleteChild,

    // photo
    uploadPhoto,
    deletePhoto,
  };
}
