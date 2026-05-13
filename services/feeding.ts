import api from "./instance";

// feeding
type feedingRecord = {
  feedingDate: string;
  feedingTimesPerDay: number;
  feedingTypeForBaby: string;
  notes: string;
};

// feeding
export const AddFeedingRecord = async (
  childId: number,
  data: feedingRecord,
) => {
  const response = await api.post(`/children/${childId}/feeding-records`, data);
  return response.data;
};

export const GetFeedingRecords = async (childId: number) => {
  const response = await api.get(`/children/${childId}/feeding-records`);
  return response.data;
};

export const GetFeedingRecord = async (childId: number, id: number) => {
  const response = await api.get(`/children/${childId}/feeding-records/${id}`);
  return response.data;
};

export const EditFeedingRecord = async (
  childId: number,
  data: feedingRecord,
  id: number,
) => {
  const response = await api.put(
    `/children/${childId}/feeding-records/${id}`,
    data,
  );
  return response.data;
};

export const DeleteFeedingRecord = async (childId: number, id: number) => {
  const response = await api.delete(
    `/children/${childId}/feeding-records/${id}`,
  );
  return response.data;
};

export const GetFeedingStatistics = async (childId: number) => {
  const response = await api.get(
    `/children/${childId}/feeding-records/statistics`,
  );
  return response.data;
};

export const GetFeedingWeekly = async (childId: number) => {
  const response = await api.get(`/children/${childId}/feeding-records/weekly`);
  return response.data;
};

export const GetFeedingMonthly = async (childId: number) => {
  const response = await api.get(
    `/children/${childId}/feeding-records/monthly`,
  );
  return response.data;
};
