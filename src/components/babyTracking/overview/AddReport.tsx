import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

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
  const [mode, setMode] = useState<"months" | "period">("months");

  const [lastMonths, setLastMonths] = useState(1);

  const [periodStart, setPeriodStart] = useState("");
  const [periodEnd, setPeriodEnd] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      //  Validation

      if (mode === "months") {
        if (!lastMonths || lastMonths <= 0) {
          toast.error("Please enter valid months");
          return;
        }

        await addReport({
          lastMonths,
        });
      }

      if (mode === "period") {
        if (!periodStart || !periodEnd) {
          toast.error("Please select start and end dates");
          return;
        }

        await addReport({
          periodStart,
          periodEnd,
        });
      }

      toast.success("Report generated successfully");

      // reset
      setLastMonths(1);
      setPeriodStart("");
      setPeriodEnd("");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="bg-primary/80 text-white rounded-xl px-3 py-2 cursor-pointer hover:bg-primary transition-all md:text-[16px] text-sm">
            Add Report
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="border-b pb-5">
            <DialogTitle>Add Growth Report</DialogTitle>
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
                Last Months
              </button>

              <button
                onClick={() => setMode("period")}
                className={`px-3 py-2 rounded-lg border transition-all ${
                  mode === "period"
                    ? "bg-primary text-white border-primary"
                    : "bg-white"
                }`}
              >
                Date Period
              </button>
            </div>

            {/* Last Months */}
            {mode === "months" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="months">Number of months</label>

                <input
                  id="months"
                  type="number"
                  min={1}
                  value={lastMonths}
                  onChange={(e) => setLastMonths(Number(e.target.value))}
                  className="border px-3 py-2 rounded-md"
                />
              </div>
            )}

            {/* Period */}
            {mode === "period" && (
              <>
                <div className="flex flex-col gap-2">
                  <label htmlFor="start">Start Date</label>

                  <input
                    id="start"
                    type="datetime-local"
                    value={periodStart}
                    onChange={(e) => setPeriodStart(e.target.value)}
                    className="border px-3 py-2 rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="end">End Date</label>

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
              {loading ? "Generating..." : "Generate Report"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddReport;
