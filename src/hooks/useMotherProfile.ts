import {
  GetProfileData,
  UploadProfilePhoto,
  DeleteProfilePhoto,
} from "../../services/motherProfile";
import { useEffect, useState } from "react";

export type MotherProfile = {
  motherId: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  isFirstTimeMother: boolean;
  numberOfChildren: number;
  mentalHealthStatus: string | null;
  healthStatus: string | null;
  profilePictureUrl: string | null;
  createdAt: string;
};

export function useMotherProfile() {
  const [profileData, setProfileData] = useState<MotherProfile>();

  const featchProfileData = async () => {
    try {
      const res = await GetProfileData();
      setProfileData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    featchProfileData();
  }, []);

  const uploadPhoto = async (photo: File) => {
    try {
      await UploadProfilePhoto(photo);
      await featchProfileData();
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };
  const deletePhoto = async () => {
    try {
      await DeleteProfilePhoto();
      await featchProfileData();
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  return { profileData, uploadPhoto,deletePhoto };
}
