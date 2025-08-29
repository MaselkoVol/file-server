import { forwardRef, memo } from "react";
import "./ErrorMessage.scss";
import { useTranslation } from "react-i18next";
import Icon from "../../Icon/Icon";
import { getErrorIcon } from "../../../../shared/utils/getErrorIcon";
export type ErrorMessageProps = {
  className?: string;
  errorCode: string;
  message: string;
  children?: React.ReactNode;
};

const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ className, errorCode, message, children }, ref) => {
    const { t } = useTranslation("errorCodes");

    return (
      <div ref={ref} className={`${className} error-message`}>
        <Icon className="error-message__icon">{getErrorIcon(errorCode)}</Icon>
        <p className="error-message__title">{message}</p>
        <p className="error-message__message">
          {t(errorCode, { ns: "errorCodes" })}
        </p>
        {children && (
          <div className="error-message__action-wrapper">{children}</div>
        )}
      </div>
    );
  },
);

export default memo(ErrorMessage);
