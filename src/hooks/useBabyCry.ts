import { useState } from "react";
import { analyzeCry } from "../../services/babyCry";
import type { CryAnalysisResponse } from "../../services/babyCry";

export interface CryAnalysisState {
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

export function useCryAnalysis() {
  const [analysisResult, setAnalysisResult] =
    useState<CryAnalysisResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const performCryAnalysis = async ({
    childId,
    audioFile,
  }: {
    childId: number;
    audioFile: File | Blob;
  }) => {
    setLoading(true);
    try {
      const res = await analyzeCry({ childId, audioFile });

      if (res && "success" in res && !(res as any).success) {
        throw new Error((res as any).message || "Something went wrong");
      }
      const data = (res as any).data ? (res as any).data : res;
      setAnalysisResult(data);

      return data;
    } catch (err: any) {
      console.log(err);

      if (err?.response?.data?.message) {
        throw new Error(err.response.data.message);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };


  const clearAnalysisResult = () => {
    setAnalysisResult(null);
  };

  return {
    analysisResult,
    loading,
    performCryAnalysis,
    clearAnalysisResult,
  };
}
