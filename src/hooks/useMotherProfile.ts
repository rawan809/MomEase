import {
  GetProfileData,
  UploadProfilePhoto,
  DeleteProfilePhoto,
  GetUserProfile,
  UpdateUserProfile,
  ChangePassword,
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

export type UserProfile = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  role: string;
  createdAt: string;
};

export function useMotherProfile() {
  const [profileData, setProfileData] = useState<MotherProfile>();
  const [userProfile, setUserProfile] = useState<UserProfile>();

  const featchProfileData = async () => {
    try {
      const res = await GetProfileData();
      setProfileData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await GetUserProfile();
      setUserProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    featchProfileData();
    fetchUserProfile();
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

  const updateUserProfile = async (data: {
    firstName: string;
    lastName: string;
    phone: string;
    age: number;
  }) => {
    try {
      await UpdateUserProfile(data);
      await fetchUserProfile();
      await featchProfileData();
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  const changePassword = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    try {
      return await ChangePassword(data);
    } catch (err: any) {
      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  return {
    profileData,
    userProfile,
    uploadPhoto,
    deletePhoto,
    updateUserProfile,
    changePassword,
    featchProfileData,
    fetchUserProfile,
  };
}
