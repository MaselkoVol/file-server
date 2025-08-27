import { forwardRef, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Button from "../../ui/Button/Button";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import "./FolderError.scss";
import { getAbsolutePathname } from "../../../shared/utils/pathname";
export type FolderErrorProps = {
  className?: string;
  errorCode: string;
  isHome: boolean;
  refetch: () => void;
};

const FolderError = forwardRef<HTMLDivElement, FolderErrorProps>(
  ({ className, errorCode, isHome, refetch }, ref) => {
    const { t } = useTranslation(["folder", "translation"]);
    const navigate = useNavigate();

    const handleGoHome = useCallback(() => {
      navigate(getAbsolutePathname(""));
    }, [navigate]);
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
          <Button
            onClick={handleGoHome}
            variant="accent"
            className="folder-error__home-button"
          >
            {t("GO_HOME", { ns: "translation" })}
          </Button>
        )}
      </ErrorMessage>
    );
  },
);

export default memo(FolderError);
