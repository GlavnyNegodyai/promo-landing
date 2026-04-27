import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode,
  className?: string;
};

export default function Button({children, className}: ButtonProps) {
    return(
        <button className={`${className ? className: 'bg-(--green) text-(--black)'} p-2 rounded-2xl capitalizwv`}>
            {children}
        </button>
    );
}