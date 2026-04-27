import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function SubHeadline({ children }: Props) {
  return (
    <div>
    <h3 className="w-fit rounded-[16px] text-(--green) bg-(--white) font-[Bitcount] lowercase bg-(--white) px-3 py-2 pt-3 mb-6 text-2xl leading-[1]">
      {children}
    </h3>
    </div>

  );
}
