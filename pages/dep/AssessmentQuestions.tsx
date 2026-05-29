import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAssessmentQuestions,
  getQuestionOptions,
  submitAssessment,
} from "../../services/dep";
import LoadingState from "@/components/ui/LoadingState";
import { useTranslation } from "react-i18next";

interface Question {
  questionId: number;
  assessmentId: number;
  questionText: string;
  questionOrder: number;
  isReverse: boolean;
}

interface Option {
  optionId: number;
  questionId: number;
  optionText: string;
  score: number;
  optionOrder: number;
}

interface Answer {
  questionId: number;
  optionId: number;
  score: number;
}

const AssessmentQuestions = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getAssessmentQuestions(id);
        const sorted = res.sort(
          (a: Question, b: Question) => a.questionOrder - b.questionOrder,
        );
        setQuestions(sorted);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [id]);

  useEffect(() => {
    if (!questions.length) return;
    const fetchOptions = async () => {
      try {
        const questionId = questions[currentIndex].questionId;
        const res = await getQuestionOptions(questionId);
        const sorted = res.sort(
          (a: Option, b: Option) => a.optionOrder - b.optionOrder,
        );
        setOptions(sorted);
        setSelectedOptionId(null);
      } catch (err) {
        console.error("Failed to fetch options:", err);
      }
    };
    fetchOptions();
  }, [questions, currentIndex]);

  const handleNext = async () => {
    if (selectedOptionId === null) return;

    const selectedOption = options.find((o) => o.optionId === selectedOptionId);
    if (!selectedOption) return;

    const newAnswers: Answer[] = [
      ...answers,
      {
        questionId: questions[currentIndex].questionId,
        optionId: selectedOptionId,
        score: selectedOption.score,
      },
    ];
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      try {
        setSubmitting(true);
        // const token = localStorage.getItem("token");

        // const payload = {
        //   answers: newAnswers.map((a) => ({
        //     questionId: a.questionId,
        //     optionId: a.optionId,
        //    })),
        // };

        const res = await submitAssessment(id, newAnswers);

        console.log("SUBMIT RESULT:", res);

        navigate(`/assessment/${id}/result`, { state: { result: res } });
      } catch (err) {
        console.error("Submit failed:", err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      navigate(-1);
    } else {
      setCurrentIndex(currentIndex - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const progress = questions.length
    ? ((currentIndex + 1) / questions.length) * 100
    : 0;

  if (loading) {
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        style={{ background: "var(--color-background)" }}
      >
        <div className="flex justify-center items-center min-h-screen">
          <LoadingState />
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-background)" }}
    >
      <div className="w-full h-1.5 bg-gray-200">
        <motion.div
          className="h-full"
          style={{ background: "var(--color-primary)" }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="flex items-center justify-between px-(--space-lg) py-(--space-md)">
        <button
          onClick={handleBack}
          className="text-primary text-4xl font-bold hover:opacity-70 transition"
        >
          ‹
        </button>
        <span className="text-(--text-small)">
          {t("Question")} {currentIndex + 1} {t("of")} {questions.length}
        </span>
      </div>

      <div className="flex-1 flex items-start justify-center px-(--space-lg) py-(--space-md)">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion?.questionId}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-3xl p-(--space-lg) w-full max-w-xl flex flex-col gap-(--space-lg)"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <h2 className="font-bold text-(--text-normal) text-center leading-snug">
              {currentQuestion?.questionText}
            </h2>

            <div className="flex flex-col gap-(--space-sm)">
              {options.map((option) => (
                <button
                  key={option.optionId}
                  onClick={() => setSelectedOptionId(option.optionId)}
                  className=" px-(--space-md) py-(--space-sm) rounded-xl border-2 transition-(--transition-fast) text-(--text-small) "
                  style={{
                    borderColor:
                      selectedOptionId === option.optionId
                        ? "var(--color-primary)"
                        : "#e5e7eb",
                    background:
                      selectedOptionId === option.optionId
                        ? "#fff0f6"
                        : "white",
                    color:
                      selectedOptionId === option.optionId
                        ? "var(--color-primary)"
                        : "inherit",
                    borderLeft: `4px solid ${
                      selectedOptionId === option.optionId
                        ? "var(--color-primary)"
                        : "#e5e7eb"
                    }`,
                  }}
                >
                  {option.optionText}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={selectedOptionId === null || submitting}
              className="w-full py-(--space-sm) rounded-full text-white font-bold transition-(--transition-fast)"
              style={{
                background:
                  selectedOptionId !== null && !submitting
                    ? "var(--color-primary)"
                    : "#f9a8c9",
                cursor:
                  selectedOptionId !== null && !submitting
                    ? "pointer"
                    : "not-allowed",
              }}
            >
              {submitting
                ? t("Submitting...")
                : currentIndex + 1 === questions.length
                  ? t("Submit")
                  : t("Next Question")}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssessmentQuestions;
