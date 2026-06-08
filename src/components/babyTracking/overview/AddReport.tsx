import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface AddReportData {
  periodStart?: string;
  periodEnd?: string;
  lastMonths?: number;
}

function AddReport({
  addReport,
}: {
  addReport: (data: AddReportData) => Promise<void>;
}) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"months" | "period">("months");

  const [lastMonths, setLastMonths] = useState("1");

  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");

  const [loading, setLoading] = useState(false);
  const months = Number(lastMonths);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      //  Validation

      if (mode === "months") {
        if (!months || months <= 0) {
          toast.error(t("Please enter valid months"));
          return;
        }

        await addReport({
          lastMonths: months,
        });
      }

      if (mode === "period") {
        if (!periodStart || !periodEnd) {
          toast.error(t("Please select start and end dates"));
          return;
        }

        await addReport({
          periodStart,
          periodEnd,
        });
      }

      toast.success(t("Report generated successfully"));

      // reset
      setLastMonths("1");
      setPeriodStart("");
      setPeriodEnd("");
    } catch (err: any) {
      toast.error(err.message || t("Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-primary/80 text-white rounded-xl px-3 py-2 cursor-pointer hover:bg-primary transition-all md:text-[16px] text-sm">
            {t("Add Report")}
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="border-b pb-5">
            <DialogTitle>{t("Add Growth Report")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 flex flex-col">
            {/* Mode Switch */}
            <div className="flex gap-2">
              <button
                onClick={() => setMode("months")}
                className={`px-3 py-2 rounded-lg border transition-all ${
                  mode === "months"
                    ? "bg-primary text-white border-primary"
                    : "bg-white"
                }`}
              >
                {t("Last Months")}
              </button>

              <button
                onClick={() => setMode("period")}
                className={`px-3 py-2 rounded-lg border transition-all ${
                  mode === "period"
                    ? "bg-primary text-white border-primary"
                    : "bg-white"
                }`}
              >
                {t("Date Period")}
              </button>
            </div>

            {/* Last Months */}
            {mode === "months" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="months">{t("Number of months")}</label>

                <input
                  id="months"
                  type="number"
                  min={1}
                  value={lastMonths}
                  onChange={(e) => setLastMonths(e.target.value)}
                  className="border px-3 py-2 rounded-md"
                />
              </div>
            )}

            {/* Period */}
            {mode === "period" && (
              <>
                <div className="flex flex-col gap-2">
                  <label htmlFor="start">{t("Start Date")}</label>

                  <input
                    id="start"
                    type="datetime-local"
                    value={periodStart}
                    onChange={(e) => setPeriodStart(e.target.value)}
                    className="border px-3 py-2 rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="end">{t("End Date")}</label>

                  <input
                    id="end"
                    type="datetime-local"
                    value={periodEnd}
                    onChange={(e) => setPeriodEnd(e.target.value)}
                    className="border px-3 py-2 rounded-md"
                  />
                </div>
              </>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-primary/80 text-white rounded-xl px-3 py-2 cursor-pointer hover:bg-primary transition-all md:text-[16px] text-sm disabled:opacity-50"
            >
              {loading ? t("Generating...") : t("Generate Report")}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddReport;