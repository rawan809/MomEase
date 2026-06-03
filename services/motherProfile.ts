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
