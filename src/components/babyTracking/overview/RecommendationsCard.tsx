import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  recommendations?: string[];
};

export default function RecommendationsCard({ recommendations }: Props) {
  const { t } = useTranslation();

  if (!recommendations || recommendations.length === 0) {
    return (
      <Card className="border-0 shadow-md">
        <CardContent className="p-5">
          <p className="text-sm text-gray-400 text-center py-6">
            {t("No recommendations available.")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md bg-gray-100">
      <CardContent className="p-5 space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Lightbulb size={15} className="text-primary" />
          <p className="text-base font-semibold">{t("Recommendations")}</p>
        </div>

        {/* List */}
        <div className="space-y-2">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-accent rounded-2xl px-4 py-3"
            >
              <span className="mt-0.5 w-5 h-5 rounded-full bg-prirtext-primary text-xs flex items-center justify-center shrink-0 font-medium">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">{t(rec)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}