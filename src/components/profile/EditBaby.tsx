import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CgBoy } from "react-icons/cg";
import { CgGirl } from "react-icons/cg";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useState } from "react";
import { FiCalendar, FiHeart, FiEdit } from "react-icons/fi";
import { LuMilk } from "react-icons/lu";
import { useChildren } from "@/hooks/useChildren";
import { toast } from "sonner";
import type { Child } from "@/hooks/useChildren";

type Props = {
  child?: Child;
  onEdit?: (id: number, data: any) => Promise<any>;
  onUploadPhoto: (id: number, photo: File) => Promise<void>;
  onDeletePhoto: (id: number) => Promise<void>;
};

function EditBaby({ child, onEdit, onDeletePhoto, onUploadPhoto }: Props) {
  const { addChild, uploadPhoto } = useChildren();
  const isEditMode = !!child && !!onEdit;

  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(child?.gender ?? "Boy");
  const isBoy = gender === "Boy";
  const [fullName, setFullName] = useState(child?.fullName ?? "");
  const [birthDate, setBirthDate] = useState(
    child?.birthDate ? child.birthDate.split("T")[0] : "",
  );
  const [deliveryType, setDeliveryType] = useState(
    child?.deliveryType ?? "Normal",
  );
  const [feedingTypeForBaby, setFeedingTypeForBaby] = useState(
    child?.feedingTypeForBaby ?? "Breastfeeding",
  );
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    child?.photoUrl ? child.photoUrl : null,
  );

  // Reset form fields whenever the dialog opens
  const handleOpenChange = (o: boolean) => {
    if (o) {
      setGender(child?.gender ?? "Boy");
      setFullName(child?.fullName ?? "");
      setBirthDate(child?.birthDate ? child.birthDate.split("T")[0] : "");
      setDeliveryType(child?.deliveryType ?? "Normal");
      setFeedingTypeForBaby(child?.feedingTypeForBaby ?? "Breastfeeding");
      setPhoto(null);
      setPreview(
        child?.photoUrl ? `${child.photoUrl}` : null,
      );
    }
    setOpen(o);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (isEditMode) {
        await onEdit(child.childId, {
          fullName,
          gender,
          birthDate,
          deliveryType,
          feedingTypeForBaby,
        });
        if (photo) await onUploadPhoto(child.childId, photo);
        if (!photo) await onDeletePhoto(child.childId);
        toast.success("Baby updated successfully");
      } else {
        const newChild = await addChild({
          fullName,
          gender,
          birthDate,
          deliveryType,
          feedingTypeForBaby,
        });
        if (photo) await uploadPhoto(newChild.childId, photo);
        setFullName("");
        setBirthDate("");
        setGender("Boy");
        setDeliveryType("Normal");
        setFeedingTypeForBaby("Breastfeeding");
        setPhoto(null);
        setPreview(null);
        toast.success("Baby added successfully");
      }
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <div
          className={`flex items-center gap-1 cursor-pointer transition-all
                ${isBoy ? "hover:text-blue-600" : "hover:text-pink-600"}`}
        >
          <FiEdit />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-162.5 rounded-xl overflow-hidden p-0">
        {/* form */}
        <div className=" px-5 py-3 space-y-2">
          {/* name */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Baby Name</label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter baby name"
              className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all"
            />
          </div>

          {/* gender */}
          <div className="space-y-3">
            <label className="font-medium">Gender</label>

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

                <span className="font-semibold">Boy</span>
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

                <span className="font-semibold">Girl</span>
              </button>
            </div>
          </div>

          {/* birth date */}
          <div className="flex flex-col gap-2">
            <label className="font-medium flex items-center gap-2">
              <FiCalendar />
              Birth Date
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
                Delivery Type
              </label>
              <select
                name="deliveryType"
                id="deliveryType"
                value={deliveryType}
                onChange={(e) =>
                  setDeliveryType(e.target.value as "Normal" | "Cesarean")
                }
                className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all w-full"
              >
                <option value="Normal">Normal</option>
                <option value="Cesarean">Cesarean</option>
              </select>
            </div>

            <div className="space-y-3 flex-1">
              <label className="font-medium flex items-center gap-2">
                <LuMilk />
                Feeding Type
              </label>
              <select
                value={feedingTypeForBaby}
                onChange={(e) =>
                  setFeedingTypeForBaby(
                    e.target.value as "Breastfeeding" | "Formula" | "SolidFood",
                  )
                }
                name="feedingType"
                id="feedingType"
                className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all w-full"
              >
                <option value="Breastfeeding">Breastfeeding</option>
                <option value="Formula">Formula</option>
                <option value="SolidFood">Solid Food</option>
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
                  Remove photo
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

                <p className="font-medium">Upload Baby Photo</p>

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
            {loading
              ? isEditMode
                ? "Saving..."
                : "Adding..."
              : isEditMode
                ? "Save Changes"
                : "Add Baby"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditBaby;
