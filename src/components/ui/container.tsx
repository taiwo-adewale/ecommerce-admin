import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  return <div className="px-6 mx-auto w-full">{children}</div>;
}
