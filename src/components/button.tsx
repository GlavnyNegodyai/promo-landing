import type { ReactNode } from "react";

import styles from "./button.module.css";

type ButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function Button({ children, className }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className ?? ""}`}>
      {children}
    </button>
  );
}
