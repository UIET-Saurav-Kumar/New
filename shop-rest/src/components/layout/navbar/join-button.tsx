import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useTranslation } from "next-i18next";

export default function JoinButton() {

  const { t } = useTranslation("common");

  const { openModal } = useModalAction();

  function handleJoin() {
    return openModal("OTP_LOGIN");
  }
  
  return (
    <Button className="font-semibold p-5" size="medium" onClick={handleJoin}>
      {t("Join")}
    </Button>
  );
}
