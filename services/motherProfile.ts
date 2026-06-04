import api from "./instance";

export const GetProfileData = async () => {
  const response = await api.get(`/MotherProfile`);
  return response.data;
};

export const UploadProfilePhoto = async (photo: File) => {
  const formData = new FormData();

  formData.append("photo", photo);

  const response = await api.post(`/MotherProfile/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const DeleteProfilePhoto = async () => {
  const response = await api.delete(`/MotherProfile/photo`);
  return response.data;
};

// Users Profile

export const GetUserProfile = async () => {
  const response = await api.get(`/Users/profile`);
  return response.data;
};

export const UpdateUserProfile = async (data: {
  firstName: string;
  lastName: string;
  phone: string;
  age: number;
}) => {
  const response = await api.put(`/Users/profile`, data);
  return response.data;
};

export const ChangePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const response = await api.put(`/Users/change-password`, data);
  return response.data;
};