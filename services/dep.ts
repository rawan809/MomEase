import axios from "axios";

const API_URL = "/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Accept-Language": "en",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export interface Question {
  questionId: number;
  assessmentId: number;
  questionText: string;
  questionOrder: number;
  isReverse: boolean;
}

export interface Option {
  optionId: number;
  questionId: number;
  optionText: string;
  score: number;
  optionOrder: number;
}

export interface Answer {
  questionId: number;
  optionId: number;
}

// APIs
export const getAssessmentQuestions = async (id: string | undefined) => {
  const res = await api.get(`/assessments/${id}/questions`);
  return res.data;
};

export const getQuestionOptions = async (questionId: number) => {
  const res = await api.get(`/questions/${questionId}/options`);
  return res.data;
};

export const submitAssessment = async (
  id: string | undefined,
  answers: Answer[],
) => {
  const res = await api.post(`/assessments/${id}/submit`, {
    answers: answers.map((a) => ({
      questionId: a.questionId,
      optionId: a.optionId,
    })),
  });

  return res.data;
};

export const getAssessments = async () => {
  const res = await api.get(`/assessments`);
  return res.data;
};
