import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <div className="px-4 md:px-6 mx-auto w-full max-w-[90rem]">{children}</div>
  );
}
