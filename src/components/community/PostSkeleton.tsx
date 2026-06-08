import React from "react";
import { Skeleton } from "@/components/UI/skeleton";

function PostSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm     mb-4 lg:w-140 md:w-100 w-full">
      <div className="flex w-ull items-start gap-4 mb-4">
        <Skeleton className="size-10 shrink-0 rounded-full bg-gray-200" />
        <div className="grid gap-2 w-full">
          <Skeleton className="h-4 w-37.5 bg-gray-200" />
          <Skeleton className="h-4 w-27.5 bg-gray-200" />
        </div>
      </div>
      <Skeleton className=" h-30 bg-gray-200" />
    </div>
  );
}

export default PostSkeleton;
