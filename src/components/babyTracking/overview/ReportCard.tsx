"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";

type Report = {
  reportId: number;
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

    recommendations: string[];
  };
};

type Props = {
  data: Report;
  onOpen: () => void;
  onDelete: (id: number) => Promise<void>;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function ReportCard({ data, onOpen, onDelete }: Props) {
  const summary = data.reportContent.summary;
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await onDelete(data.reportId);
      toast.success("Report deleted");
    } catch (err: any) {
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <Dialog>
      <Card
        className="border bg-white hover:shadow-md transition-all"
        onClick={onOpen}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <CardTitle className="text-lg">{data.childName} Report</CardTitle>

              <div className="text-sm text-gray-500">
                {formatDate(data.periodStart)} → {formatDate(data.periodEnd)}
              </div>
            </div>

            <Badge
              className={`rounded-full px-3 py-1 ${
                data.growthStatus === "Good"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {data.growthStatus}
            </Badge>
          </div>

          <CardAction>
            <DialogTrigger className={"flex gap-2"}>
              <div className="hover:text-primary transition cursor-pointer">
                <Eye size={20} />
              </div>
              <div
                onClick={(e)=>handleDelete(e)}
                className="hover:text-red-500 transition cursor-pointer"
              >
                <FaRegTrashCan size={18} />
              </div>
            </DialogTrigger>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-500">Days</p>
              <p className="font-semibold text-lg">{summary.totalDays}</p>
            </div>

            <div className="bg-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-500">Feedings</p>
              <p className="font-semibold text-lg">
                {summary.feedingRecordsCount}
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-500">Growth Records</p>
              <p className="font-semibold text-lg">
                {summary.growthRecordsCount}
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-500">Sleep Records</p>
              <p className="font-semibold text-lg">
                {summary.sleepRecordsCount}
              </p>
            </div>
          </div>

          {/* Insight */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-3">
            <p className="text-sm text-primary font-medium">
              {summary.keyInsight}
            </p>
          </div>

          {/* Created At */}
          <div className="text-xs text-gray-400">
            Created at {formatDate(data.createdAt)}
          </div>
        </CardContent>
      </Card>

      {/* FULL REPORT DIALOG */}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-5">
          {/* Header */}
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold">
              {data.childName} Growth Report
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {formatDate(data.periodStart)} → {formatDate(data.periodEnd)}
            </p>
          </div>

          {/* Overview */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Overview</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-sm text-gray-500">Overall Status</p>
                <p className="font-semibold">{summary.overallStatus}</p>
              </div>

              <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-sm text-gray-500">Total Days</p>
                <p className="font-semibold">{summary.totalDays}</p>
              </div>
            </div>
          </div>

          {/* Insight */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Key Insight</h3>

            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-sm">
              {summary.keyInsight}
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Recommendations</h3>

            <div className="space-y-2">
              {data.reportContent.recommendations.map((item, index) => (
                <div key={index} className="bg-gray-100 rounded-xl p-3 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReportCard;
