import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoIosArrowDown } from "react-icons/io";
import { useChild } from "@/contexts/ChildContext";
import formatBabyAge from "@/utils/formatBabyAge";
import { useState } from "react";


function BabyDropDown() {
  const { children, selectedChildId, setSelectedChildId } =
    useChild();
  const [open, setOpen] = useState(false);
  const currentChild =
    children.find((child) => child.childId === selectedChildId) || children[0];

  if (!currentChild) {
    return (
      <div className="bg-accent/50 rounded-xl p-3 border border-primary text-sm text-gray-500">
        No baby selected
      </div>
    );
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <div className="flex gap-2 items-center bg-accent/50 rounded-xl p-2  cursor-ponter hover:bg-accent/70 transition-all border-primary border">
            {currentChild.photoUrl ? (
              <img
                src={`http://momease.runasp.net${currentChild.photoUrl}`}
                alt={currentChild.fullName}
                className={`w-10 aspect-square rounded-full object-cover border-2 ${
                  currentChild.gender === "Boy"
                    ? "border-blue-500"
                    : "border-pink-500"
                }`}
              />
            ) : (
              <div
                className={`w-10 aspect-square  rounded-full bg-white border-2 flex items-center justify-center font-semibold
              ${currentChild.gender === "Boy" ? "border-blue-500 text-blue-400" : "border-primary text-primary"}`}
              >
                {currentChild.fullName.slice(0, 1)}
              </div>
            )}
            <div className="text-start">
              <p className="text-sm font-semibold">{currentChild?.fullName}</p>
              <p className="text-[12px] text-gray-500">
                {currentChild
                  ? formatBabyAge({
                      ageInDays: currentChild.ageInDays,
                      ageInMonths: currentChild.ageInMonths,
                    })
                  : "--"}
              </p>
            </div>
            <IoIosArrowDown className="text-gray-500" />
          </div>
        </PopoverTrigger>
        <PopoverContent className={"w-50"}>
          <div className="space-y-2">
            {children.map((child) => (
              <div
                key={child.childId}
                onClick={() => {
                  setSelectedChildId(child.childId);
                  setOpen(false);
                }}
                className={`flex gap-3 items-center rounded-xl p-2 cursor-pointer transition-all ${
                  selectedChildId === child.childId
                    ? "bg-gray-100 border  "
                    : "hover:bg-gray-100"
                }`}
              >
                {child.photoUrl ? (
                  <img
                    src={`http://momease.runasp.net${child.photoUrl}`}
                    alt={child.fullName}
                    className={`w-10 aspect-square rounded-full object-cover border-2 ${
                      child.gender === "Boy"
                        ? "border-blue-500"
                        : "border-pink-500"
                    }`}
                  />
                ) : (
                  <div
                    className={`w-10 aspect-square  rounded-full bg-white border-2 flex items-center justify-center font-semibold
              ${child.gender === "Boy" ? "border-blue-500 text-blue-400" : "border-primary text-primary"}`}
                  >
                    {child.fullName.slice(0, 1)}
                  </div>
                )}
                <div className="text-start">
                  <p className="text-sm">{child.fullName}</p>
                  <p className="text-[12px] text-gray-500">
                    {formatBabyAge({
                      ageInDays: child.ageInDays,
                      ageInMonths: child.ageInMonths,
                    })}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default BabyDropDown;
