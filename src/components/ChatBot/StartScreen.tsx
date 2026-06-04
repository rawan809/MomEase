import chatbotimg from "../../assets/images/chatbot.svg";
import { useTranslation } from "react-i18next";

function StartScreen() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center text-center justify-center">
      <div>
        <img src={chatbotimg} alt="" className="w-65"/>
      </div>
      <div>
        <p className="font-semibold text-h2">
          {t("Hi,")}{" "}
          <span className="font-brand text-primary">{t("Mama!")}</span>
        </p>
        <p className="text-muted text-normal">{t("What can I help you with?")}</p>
      </div>
    </div>
  );
}

export default StartScreen;