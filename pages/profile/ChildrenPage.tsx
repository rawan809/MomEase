import ChildrenHeader from "@/components/profile/ChildrenHeader";
import ChildrenGrid from "@/components/profile/ChildrenGrid";
import EmptyResponse from "@/components/UI/EmptyResponse";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useChildren } from "@/hooks/useChildren";
import LoadingState from "@/components/UI/LoadingState";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function ChildrenPage() {
  const { t } = useTranslation();
  const {
    loading,
    children,
    deleteChild,
    editChild,
    addChild,
    uploadPhoto,
    deletePhoto,
    fetchChildren,
  } = useChildren();
  useEffect(() => {
    async () => {
      await fetchChildren();
    };
  });
  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-(--space-lg)">
        <Link
          to="/myprofile"
          className="text-sm text-primary font-semibold  flex items-center gap-1 mb-3"
        >
          <ArrowLeft size={16} /> {t("Back to Profile")}
        </Link>
        <ChildrenHeader onAdd={addChild} onUpload={uploadPhoto} />
        {loading ? (
          <div className="h-[50vh]">
            <LoadingState />
          </div>
        ) : (
          <ChildrenGrid
            children={children}
            onDelete={deleteChild}
            onEdit={editChild}
            onUploadPhoto={uploadPhoto}
            onDeletePhoto={deletePhoto}
          />
        )}
        {children.length === 0 && !loading && (
          <div className="mt-10">
            <EmptyResponse
              title={t("Add your baby to start tracking growth and care.")}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default ChildrenPage;
