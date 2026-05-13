import api from "./instance";


export interface Child {
  childId: number;
  fullName: string;
  gender: "Boy" | "Girl";
  birthDate: string;
  ageInMonths: number;
  ageInDays: number;
  deliveryType: "Normal" | "Cesarean";
  feedingTypeForBaby:
    | "Breastfeeding"
    | "Formula"
    | "SolidFood";
  photoUrl: string | null;
}

export interface AddChildData {
  fullName: string;
  gender: string;
  birthDate: string;
  deliveryType: string;
  feedingTypeForBaby: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  count?: number;
}


export const GetChildren = async () => {
  const response = await api.get<ApiResponse<Child[]>>(
    `/Children`
  );

  return response.data;
};


export const GetChildById = async (childId: number) => {
  const response = await api.get<ApiResponse<Child>>(
    `/Children/${childId}`
  );

  return response.data;
};


export const AddChild = async (data: AddChildData) => {
  const response = await api.post<ApiResponse<Child>>(
    `/Children`,
    data
  );

  return response.data;
};


export const UpdateChild = async (
  id: number,
  data: AddChildData
) => {
  const response = await api.put<ApiResponse<Child>>(
    `/Children/${id}`,
    data
  );

  return response.data;
};

export const DeleteChild = async (id: number) => {
  const response = await api.delete<ApiResponse<null>>(
    `/Children/${id}`
  );

  return response.data;
};

export const UploadChildPhoto = async (
  id: number,
  photo: File
) => {
  const formData = new FormData();

  formData.append("photo", photo);

  const response = await api.post(
    `/Children/${id}/photo`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const DeleteChildPhoto = async (id: number) => {
  const response = await api.delete(
    `/Children/${id}/photo`
  );

  return response.data;
};