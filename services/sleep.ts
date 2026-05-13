import api from "./instance";

// sleep
type sleepRecord = {
  childId: number;
  sleepDate: string;
  sleepHoursTotal: string;
  notes: string;
};

// sleep
export const AddSleepRecord = async (
  childId: number,
  data: sleepRecord,
) => {
  const response = await api.post(`/children/${childId}/sleep-records`, data);
  return response.data;
};

export const GetSleepRecords = async (childId: number) => {
  const response = await api.get(`/children/${childId}/sleep-records`);
  return response.data;
};

export const GetSleepRecord = async (childId: number, id: number) => {
  const response = await api.get(`/children/${childId}/sleep-records/${id}`);
  return response.data;
};

export const EditSleepRecord = async (
  childId: number,
  data: sleepRecord,
  id: number,
) => {
  const response = await api.put(
    `/children/${childId}/sleep-records/${id}`,
    data,
  );
  return response.data;
};

export const DeleteSleepRecord = async (childId: number, id: number) => {
  const response = await api.delete(
    `/children/${childId}/sleep-records/${id}`,
  );
  return response.data;
};

export const GetSleepStatistics = async (childId: number) => {
  const response = await api.get(
    `/children/${childId}/sleep-records/statistics`,
  );
  return response.data;
};

export const GetSleepWeekly = async (childId: number) => {
  const response = await api.get(`/children/${childId}/sleep-records/weekly`);
  return response.data;
};

export const GetSleepMonthly = async (childId: number) => {
  const response = await api.get(
    `/children/${childId}/sleep-records/monthly`,
  );
  return response.data;
};
