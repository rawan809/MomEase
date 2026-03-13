import React from "react";
import { GoScreenNormal } from "react-icons/go";


function EmptyResponse({ title }: { title: string }) {
  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center h-full text-muted font-semibold ">
      <p className="text-5xl">
        <GoScreenNormal />
      </p>
      <p>{title}</p>
    </div>
  );
}

export default EmptyResponse;
