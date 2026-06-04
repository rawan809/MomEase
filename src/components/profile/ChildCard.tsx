import { useState } from "react";
import { FiCalendar, FiTrash2, FiHeart, FiClock } from "react-icons/fi";
import formatBabyAge from "@/utils/formatBabyAge";
import EditBaby from "./EditBaby";
import ConfirmDeleteDialog from "@/components/community/ConfirmDeleteDialog";
import { useTranslation } from "react-i18next";

type Props = {
  child: any;
  onDelete: (childId: number) => Promise<void>;
  onEdit: (id: number, data: any) => Promise<any>;
  onUploadPhoto: (id: number, photo: File) => Promise<void>;
  onDeletePhoto: (id: number) => Promise<void>;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function ChildCard({
  child,
  onDelete,
  onEdit,
  onDeletePhoto,
  onUploadPhoto,
}: Props) {
  const { t } = useTranslation();
  const isBoy = child.gender === "Boy";
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition-all
      ${
        isBoy
          ? "border-blue-200 bg-blue-50/20"
          : "border-pink-200 bg-[#ffd6e4]/20"
      }`}
    >
      {/* top */}
      <div
        className={`p-6 flex items-center gap-5
        ${isBoy ? "bg-blue-100" : "bg-[#ffd6e4]"}`}
      >
        <div>
          {child.photoUrl ? (
            <img
              src={child.photoUrl}
              alt={child.fullName}
              className={`w-20 h-20 rounded-full object-cover border-2 ${
                isBoy ? "border-blue-500" : "border-pink-500"
              }`}
            />
          ) : (
            <div
              className={`w-20 h-20 rounded-full bg-white border-2 flex items-center justify-center font-semibold
              ${isBoy ? "border-blue-500 text-blue-400" : "border-primary text-primary"}`}
            >
              {child.fullName.slice(0, 1)}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold `}>{child.fullName}</h2>

            <div className="flex gap-3">
              {/* Edit button – uses hook's editChild via onEdit prop */}
              <EditBaby
                child={child}
                onEdit={onEdit}
                onDeletePhoto={onDeletePhoto}
                onUploadPhoto={onUploadPhoto}
              />

              {/* Delete button – opens confirm dialog */}
              <button
                onClick={() => setConfirmOpen(true)}
                className="flex items-center justify-center gap-1 hover:text-red-500 transition-all cursor-pointer"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-600 ">
            <span>{t(child.gender)}</span>
            <span>•</span>
            <span>
              {formatBabyAge({
                ageInDays: child.ageInDays,
                ageInMonths: child.ageInMonths,
              })}
            </span>
          </div>

          <div
            className={`mt-2 inline-flex px-3 py-1 rounded-full text-sm font-medium bg-white`}
          >
            {t(child.feedingTypeForBaby)}
          </div>
        </div>
      </div>

      {/* details */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              icon: <FiCalendar />,
              title: t("Birth Date"),
              value: formatDate(child.birthDate),
            },
            {
              icon: <FiClock />,
              title: t("Age In Days"),
              value: t("{{count}} Days", { count: child.ageInDays }),
            },
            {
              icon: <FiHeart />,
              title: t("Delivery Type"),
              value: t(child.deliveryType),
            },
            {
              icon: <FiHeart />,
              title: t("Feeding Type"),
              value: t(child.feedingTypeForBaby),
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl p-4
              ${isBoy ? "bg-blue-50" : "bg-[#ffd6e4]/70"}`}
            >
              <div
                className={`flex items-center gap-2 text-sm mb-2
                ${isBoy ? "text-blue-500" : "text-primary"}`}
              >
                {item.icon}
                {item.title}
              </div>

              <p className="font-semibold text-gray-700">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onDelete={() => onDelete(child.childId)}
        title={t("Delete Baby?")}
        description={t("Are you sure you want to delete {{name}}? This action cannot be undone.", { name: child.fullName })}
        successMessage={t("Baby deleted successfully")}
      />
    </div>
  );
}

export default ChildCard;