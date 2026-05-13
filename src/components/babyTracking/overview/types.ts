export type GrowthReportSummary = {
  overallStatus: "Good" | "Needs Attention" | "Poor" | string;
  totalDays: number;
  growthRecordsCount: number;
  sleepRecordsCount: number;
  feedingRecordsCount: number;
  keyInsight: string;
};

export type MonthlyBreakdown = {
  month: string;
  weightGain: number;
  heightGain: number;
  status: string;
};

export type GrowthAnalysis = {
  totalWeightGain: number;
  totalHeightGain: number;
  monthlyWeightGainAverage: number;
  monthlyHeightGainAverage: number;
  weightStatus: string;
  heightStatus: string;
  trend: "Increasing" | "Decreasing" | "Stable" | "No Data" | string;
  monthlyBreakdown: MonthlyBreakdown[];
};

export type SleepAnalysis = {
  averageSleepHours: number;
  goodSleepDays: number;
  poorSleepDays: number;
  currentStatus: "Good" | "Poor" | "No Data" | string;
  message: string;
};

export type FeedingAnalysis = {
  averageFeedingsPerDay: number;
  goodFeedingDays: number;
  poorFeedingDays: number;
  currentStatus: "Good" | "Poor" | "No Data" | string;
  message: string;
};

export type GrowthReportContent = {
  summary: GrowthReportSummary;
  growthAnalysis: GrowthAnalysis;
  sleepAnalysis: SleepAnalysis;
  feedingAnalysis: FeedingAnalysis;
  recommendations: string[];
};

export type GrowthReport = {
  reportId: number;
  childId: number;
  childName: string;
  periodStart: string;
  periodEnd: string;
  growthStatus: string;
  createdAt: string;
  reportContent: GrowthReportContent;
};
