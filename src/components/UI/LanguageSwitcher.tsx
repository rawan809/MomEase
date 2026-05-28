import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

// Desktop button

export function LanguageButton() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200
                 text-sm font-medium  bg-white
                 hover:bg-gray-50 hover:border-gray-300
                 active:scale-95
                 transition-all duration-150 select-none cursor-pointer"
    >
      <Globe size={15} className="text-primary shrink-0" />
      <span className="w-5 text-center">{language === "en" ? "ع" : "EN"}</span>
    </button>
  );
}

//  Mobile

export function LanguageToggleMobile() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-between px-2 py-2">
      {/* label */}
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
        <Globe size={18} className="text-primary" />
        {language === "en" ? "Language" : "اللغة"}
      </div>

      {/* segmented control */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm font-medium">
        <button
          onClick={() => language !== "en" && toggleLanguage()}
          className={`cursor-pointer px-3 py-1.5 transition-colors duration-150 ${
            language === "en"
              ? "bg-primary text-white"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => language !== "ar" && toggleLanguage()}
          className={` cursor-pointer px-3 py-1.5 transition-colors duration-150 border-l border-gray-200 ${
            language === "ar"
              ? "bg-primary text-white"
              : "bg-white  hover:bg-gray-50"
          }`}
        >
          ع
        </button>
      </div>
    </div>
  );
}
