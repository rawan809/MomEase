import api from "./instance";

export interface GrowthReportPayload {
  periodStart?: string;
  periodEnd?: string;
  lastMonths?: number;
}

export interface GrowthReport {
  reportId: number;
  childId: number;
  childName: string;
  periodStart: string;
  periodEnd: string;
  growthStatus: string;
  createdAt: string;

  reportContent: {
    summary: {
      overallStatus: string;
      totalDays: number;
      growthRecordsCount: number;
      sleepRecordsCount: number;
      feedingRecordsCount: number;
      keyInsight: string;
    };

    growthAnalysis: {
      totalWeightGain: number;
      totalHeightGain: number;
      monthlyWeightGainAverage: number;
      monthlyHeightGainAverage: number;
      weightStatus: string;
      heightStatus: string;
      trend: string;
      monthlyBreakdown: any[];
    };

    sleepAnalysis: {
      averageSleepHours: number;
      goodSleepDays: number;
      poorSleepDays: number;
      currentStatus: string;
      message: string;
    };

    feedingAnalysis: {
      averageFeedingsPerDay: number;
      goodFeedingDays: number;
      poorFeedingDays: number;
      currentStatus: string;
      message: string;
    };

    correlations: {
      sleepAndGrowth: {
        hasCorrelation: boolean;
        type: string;
        message: string;
      };

      feedingAndGrowth: {
        hasCorrelation: boolean;
        type: string;
        message: string;
      };

      overallInsight: string;
    };

    charts: {
      weightChart: any[];
      heightChart: any[];
      sleepChart: any[];
      feedingChart: any[];
      weightPercentiles: any[];
      heightPercentiles: any[];
      sleepReference: any[];
      feedingReference: any[];
    };

    recommendations: string[];
  };
}

export const AddGrowthReport = async (
  childId: number,
  data: GrowthReportPayload,
) => {
  const response = await api.post(`/children/${childId}/growth-reports`, data);

  return response.data;
};

export const GetGrowthReports = async (childId: number) => {
  const response = await api.get(`/children/${childId}/growth-reports`);

  return response.data;
};

export const GetGrowthReportById = async (
  childId: number,
  reportId: number,
) => {
  const response = await api.get(
    `/children/${childId}/growth-reports/${reportId}`,
  );

  return response.data;
};

// export const GetLatestGrowthReport = async (childId: number) => {
//   const response = await api.get(`/children/${childId}/growth-reports/latest`);

//   return response.data;
// };

export const DeleteGrowthReport = async (childId: number, reportId: number) => {
  const response = await api.delete(
    `/children/${childId}/growth-reports/${reportId}`,
  );

  return response.data;
};
