import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/dialog";
import { CgBoy } from "react-icons/cg";
import { CgGirl } from "react-icons/cg";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useState } from "react";
import { FiPlus, FiCalendar, FiHeart } from "react-icons/fi";
import { LuMilk } from "react-icons/lu";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type ChildPayload = {
  fullName: string;
  gender: string;
  birthDate: string;
  deliveryType: string;
  feedingTypeForBaby: string;
};

type Props = {
  onAdd: (data: ChildPayload) => Promise<any>;
  onUpload: (id: number, photo: File) => Promise<void>;
};

function AddChild({ onAdd, onUpload }: Props) {
  const { t } = useTranslation();
  const [gender, setGender] = useState("Boy");
  const isBoy = gender === "Boy";
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deliveryType, setDeliveryType] = useState("Normal");
  const [feedingTypeForBaby, setFeedingTypeForBaby] = useState("Breastfeeding");
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const child = await onAdd({
        fullName,
        gender,
        birthDate,
        deliveryType,
        feedingTypeForBaby,
      });
      if (photo) {
        await onUpload(child.childId, photo);
      }
      setFullName("");
      setBirthDate("");
      setGender("Boy");
      setDeliveryType("Normal");
      setFeedingTypeForBaby("Breastfeeding");
      setPhoto(null);
      setPreview(null);
      toast.success(t("Baby added successfully"));
    } catch (err: any) {
      toast.error(err.message || t("Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-primary text-white p-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all shadow-lg cursor-pointer">
          <FiPlus />
          {t("Add Child")}
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-162.5 rounded-xl overflow-hidden p-0">
        {/* form */}
        <div className=" px-5 py-3 space-y-2">
          {/* name */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">{t("Baby Name")}</label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t("Enter baby name")}
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
            />
          </div>

          {/* gender */}
          <div className="space-y-3">
            <label className="font-medium">{t("Gender")}</label>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setGender("Boy")}
                className={`rounded-xl border p-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer h-20
                ${
                  gender === "Boy"
                    ? "bg-blue-50 border-blue-500 text-blue-600"
                    : "border-gray-200"
                }`}
              >
                <div className="w-10 aspect-square rounded-full bg-blue-100 flex items-center justify-center text-xl">
                  <CgBoy />
                </div>

                <span className="font-semibold">{t("Boy")}</span>
              </button>

              <button
                onClick={() => setGender("Girl")}
                className={`rounded-xl border p-5 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer h-20
                ${
                  gender === "Girl"
                    ? "bg-pink-50 border-primary text-primary"
                    : "border-gray-200"
                }`}
              >
                <div className="w-10 aspect-square rounded-full bg-pink-100 flex items-center justify-center text-xl">
                  <CgGirl />
                </div>

                <span className="font-semibold">{t("Girl")}</span>
              </button>
            </div>
          </div>

          {/* birth date */}
          <div className="flex flex-col gap-2">
            <label className="font-medium flex items-center gap-2">
              <FiCalendar />
              {t("Birth Date")}
            </label>

            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="space-y-3 flex-1 ">
              <label className="font-medium flex items-center gap-2">
                <FiHeart />
                {t("Delivery Type")}
              </label>
              <select
                name="deliveryType"
                id="deliveryType"
                value={deliveryType}
                onChange={(e) => setDeliveryType(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all w-full"
              >
                <option value="Normal">{t("Normal")}</option>
                <option value="Cesarean">{t("Cesarean")}</option>
              </select>
            </div>

            <div className="space-y-3 flex-1">
              <label className="font-medium flex items-center gap-2">
                <LuMilk />
                {t("Feeding Type")}
              </label>
              <select
                value={feedingTypeForBaby}
                onChange={(e) => setFeedingTypeForBaby(e.target.value)}
                name="feedingType"
                id="feedingType"
                className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all w-full"
              >
                <option value="Breastfeeding">{t("Breastfeeding")}</option>
                <option value="Formula">{t("Formula")}</option>
                <option value="SolidFood">{t("Solid Food")}</option>
              </select>
            </div>
          </div>

          {/* photo */}
          <label className="border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden">
            {preview ? (
              <div className="relative w-full flex flex-col items-center">
                <img
                  src={preview}
                  alt="preview"
                  className={`w-20 aspect-square object-cover rounded-full border-2 ${isBoy ? "border-blue-600" : "border-primary"}`}
                />

                {/* delete button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPhoto(null);
                    setPreview(null);
                  }}
                  className="mt-1 text-red-500 text-sm hover:underline"
                >
                  {t("Remove photo")}
                </button>
              </div>
            ) : (
              <>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mb-3
        ${isBoy ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"}`}
                >
                  <MdOutlineAddPhotoAlternate />
                </div>

                <p className="font-medium">{t("Upload Baby Photo")}</p>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setPhoto(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </>
            )}
          </label>

          {/* submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full text-white py-3 rounded-xl font-semibold transition-all hover:opacity-90
            ${isBoy ? "bg-blue-500" : "bg-primary/90"} cursor-pointer`}
          >
            {loading ? t("Adding...") : t("Add Baby")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddChild;