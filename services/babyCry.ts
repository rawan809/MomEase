import api from "./instance"

export interface CryAnalysisResponse {
  cryId: number;
  audioUrl: string;
  result: string;
  confidence: number;
  advice: string;
  childId: number;
  createdAt: string;
  allScores: {
    belly_pain: number;
    burping: number;
    discomfort: number;
    hungry: number;
    laugh: number;
  };
}

export const analyzeCry = async ({
  childId,
  audioFile,
}: {
  childId: number;
  audioFile: File | Blob;
}): Promise<CryAnalysisResponse> => {
  const formData = new FormData();
  formData.append("audio", audioFile);

  const response = await api.post(`/children/${childId}/cry-analysis`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};