import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/UI/dialog";
import { useChild } from "@/contexts/ChildContext";
import formatBabyAge from "@/utils/formatBabyAge";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UserPlus, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChildren } from "@/hooks/useChildren";
import { useEffect } from "react";

interface BabySelectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect?: (childId: number) => void;
  title?: string;
  description?: string;
}

export function BabySelectDialog({
  open,
  onOpenChange,
  onSelect,
  title,
  description,
}: BabySelectDialogProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedChildId, setSelectedChildId } = useChild();
  const { fetchChildren, children } = useChildren();

  useEffect(() => {
    fetchChildren();
  }, [open]);

  const handleSelect = (childId: number) => {
    setSelectedChildId(childId);
    if (onSelect) {
      onSelect(childId);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-white border-none shadow-xl gap-6 overflow-hidden max-h-[85vh] flex flex-col">
        <DialogHeader className="text-center pb-2 border-b border-gray-100 shrink-0">
          <DialogTitle className="text-xl font-bold ">
            {title || t("Select Baby")}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            {description || t("Choose a baby to analyze their cry")}
          </DialogDescription>
        </DialogHeader>

        {children.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center flex-1">
            {/* <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-400">
              <Baby className="w-8 h-8" />
            </div> */}
            <p className="font-semibold text-gray-700 mb-2">
              {t("No babies found")}
            </p>
            <p className="text-xs text-gray-500 max-w-xs mb-6">
              {t(
                "Please add a baby in your profile settings to use this feature.",
              )}
            </p>
            <button
              onClick={() => {
                onOpenChange(false);
                navigate("/myprofile/children");
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-semibold text-sm hover:opacity-90 transition cursor-pointer shadow-sm"
            >
              <UserPlus size={16} />
              {t("Go to Profile")}
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 py-1 hide-scrollbar">
            {children.map((child) => {
              const isSelected = selectedChildId === child.childId;
              const isBoy = child.gender === "Boy";

              return (
                <div
                  key={child.childId}
                  onClick={() => handleSelect(child.childId)}
                  className={cn(
                    "relative flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-all duration-200",
                    isSelected
                      ? isBoy
                        ? "border-blue-400 bg-blue-50/40 shadow-sm"
                        : "border-primary bg-primary/20 shadow-sm"
                      : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/65 bg-white",
                  )}
                >
                  {/* Photo or Gender Icon */}
                  <div className="relative shrink-0">
                    {child.photoUrl ? (
                      <img
                        src={child.photoUrl}
                        alt={child.fullName}
                        className={cn(
                          "w-12 h-12 rounded-full object-cover border-2 shadow-sm",
                          isBoy ? "border-blue-400" : "border-primary",
                        )}
                      />
                    ) : (
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg shadow-sm bg-white",
                          isBoy
                            ? "border-blue-400 text-blue-500"
                            : "border-primary text-primary",
                        )}
                      >
                        {child.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Baby Info */}
                  <div className="flex-1 min-w-0 text-start">
                    <p className="font-semibold  truncate text-base">
                      {child.fullName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {formatBabyAge({
                        ageInDays: child.ageInDays,
                        ageInMonths: child.ageInMonths,
                      })}
                    </p>
                  </div>

                  {/* Selected checkmark indicator */}
                  {isSelected && (
                    <div className="shrink-0">
                      <CheckCircle2
                        className={cn(
                          "w-5 h-5",
                          isBoy ? "text-blue-500" : "text-primary",
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-gray-100 shrink-0">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 border border-gray-200 rounded-full font-semibold text-gray-600 text-sm hover:bg-gray-50 transition cursor-pointer"
          >
            {t("Cancel")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
