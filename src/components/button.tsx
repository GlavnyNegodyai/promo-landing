import { forwardRef, type ReactNode } from "react";
import styles from "./button.module.css";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isForForm?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, onClick, disabled, isForForm = false }, ref) => {
    const buttonClassName = `${styles.button} ${className ?? ""} text-xl`;

    if (isForForm) {
      return (
        <a href="#contact-us" className={buttonClassName}>
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonClassName}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
