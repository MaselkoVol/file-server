import { forwardRef, memo } from "react";
import { useTranslation } from "react-i18next";
import { getAbsolutePathname } from "../../../shared/utils/pathname";
import Button from "../../ui/buttons/Button/Button";
import LinkButton from "../../ui/buttons/LinkButton/LinkButton";
import "./FolderError.scss";
import ErrorMessage from "../../ui/messages/ErrorMessage/ErrorMessage";
export type FolderErrorProps = {
  className?: string;
  errorCode: string;
  isHome: boolean;
  refetch: () => void;
};

const FolderError = forwardRef<HTMLDivElement, FolderErrorProps>(
  ({ className, errorCode, isHome, refetch }, ref) => {
    const { t } = useTranslation(["folder", "translation"]);

    return (
      <ErrorMessage
        errorCode={errorCode}
        ref={ref}
        className={`${className} folder-error`}
        message={t("FOLDER_LOAD_FAILED", { ns: "folder" })}
      >
        <Button
          variant={isHome ? "accent" : "secondary"}
          onClick={refetch}
          className="folder-error__again-button"
        >
          {t("TRY_AGAIN", { ns: "translation" })}
        </Button>
        {!isHome && (
          <LinkButton
            to={getAbsolutePathname("")}
            variant="accent"
            className="folder-error__home-button"
          >
            {t("GO_HOME", { ns: "translation" })}
          </LinkButton>
        )}
      </ErrorMessage>
    );
  },
);

export default memo(FolderError);
