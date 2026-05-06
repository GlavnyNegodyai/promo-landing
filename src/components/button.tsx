import { forwardRef, type ReactNode } from "react";
import styles from "./button.module.css";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, onClick, disabled }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${className ?? ""}`}
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
