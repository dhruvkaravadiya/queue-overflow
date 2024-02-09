import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

const QuestionPageSkeleton = () => {
    return (
        <div className="flex flex-col gap-8">
            {/* Skeleton for the title */}
            <Skeleton className="h-[30px] w-[200px]" />

            {/* Skeleton for the form */}
            <div className="flex flex-col gap-6">
                {/* Skeleton for form fields */}
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-[20px] w-[100px] rounded-full" />
                    <Skeleton className="h-[200px] w-[100%]" />
                    <Skeleton className="h-[20px] w-[100px] rounded-full" />
                </div>

                {/* Skeleton for submit button */}
                <Skeleton className="h-[40px] w-[150px]" />
            </div>
        </div>
    );
};

export default QuestionPageSkeleton;
