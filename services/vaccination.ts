import api from "./instance";

export const GetVaccinationList = async (childId: number) => {
  const response = await api.get(`/children/${childId}/vaccinations`);
  return response.data;
};

export const GetVaccination = async (childId: number, id: number) => {
  const response = await api.get(`/children/${childId}/vaccinations/${id}`);
  return response.data;
};

export const UpdateVaccination = async (
  childId: number,
  id: number,
  data: {
    status: "Pending" | "Done" | "Missed";
    takenDate?: string;
  },
) => {
  const response = await api.put(
    `/children/${childId}/vaccinations/${id}`,
    data,
  );
  return response.data;
};

export const DeleteVaccination = async (childId: number, id: number) => {
  const response = await api.delete(`/children/${childId}/vaccinations/${id}`);
  return response.data;
};

export const MarkVaccinationTaken = async (childId: number, id: number) => {
  const response = await api.put(
    `/children/${childId}/vaccinations/${id}/mark-taken`,
    {
      status: "Done",
      takenDate: new Date().toISOString(),
    },
  );
  return response.data;
};

export const GetUpcomingVaccinations = async (
  childId: number,
  daysAhead: number = 30,
) => {
  const response = await api.get(`/children/${childId}/vaccinations/upcoming`, {
    params: { daysAhead },
  });
  return response.data;
};

export const GetOverdueVaccinations = async (childId: number) => {
  const response = await api.get(`/children/${childId}/vaccinations/overdue`);
  return response.data;
};

export const GetCompletedVaccinations = async (childId: number) => {
  const response = await api.get(`/children/${childId}/vaccinations/completed`);
  return response.data;
};
