import api from "./instance";

// growth
type growthRecord = {
  weightKg: number;
  heightCm: number;
};

// growth
export const AddGrowthRecord = async (childId: number, data: growthRecord) => {
  const response = await api.post(`/children/${childId}/growth-records`, data);
  return response.data;
};

export const GetGrowthRecords = async (childId: number) => {
  const response = await api.get(`/children/${childId}/growth-records`);
  return response.data;
};

export const GetGrowthRecord = async (childId: number, id: number) => {
  const response = await api.get(`/children/${childId}/growth-records/${id}`);
  return response.data;
};

export const EditGrowthRecord = async (
  childId: number,
  data: growthRecord,
  id: number,
) => {
  const response = await api.put(
    `/children/${childId}/growth-records/${id}`,
    data,
  );
  return response.data;
};

export const DeleteGrowthRecord = async (childId: number, id: number) => {
  const response = await api.delete(
    `/children/${childId}/growth-records/${id}`,
  );
  return response.data;
};

export const GetGrowthChart = async (childId: number) => {
  const response = await api.get(`/children/${childId}/growth-records/chart`);
  return response.data;
};

export const GetGrowthStatistics = async (childId: number) => {
  const response = await api.get(
    `/children/${childId}/growth-records/statistics`,
  );
  return response.data;
};

export const GetGrowthWeekly = async (childId: number) => {
  const response = await api.get(`/children/${childId}/growth-records/weekly`);
  return response.data;
};

export const GetGrowthMonthly = async (childId: number) => {
  const response = await api.get(`/children/${childId}/growth-records/monthly`);
  return response.data;
};
