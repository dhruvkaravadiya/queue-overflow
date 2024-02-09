import React from "react";
import QuestionForm from "@/app/components/Forms/QuestionForm";
import { getUserById } from "@/database/actions/user.action";
import { redirect } from "next/navigation";
const AskQuestion = async () => {
    const clerkId = "123456789";
    if (!clerkId) {
        redirect("/sign-in");
    }
    const mongoUser = await getUserById(clerkId);
    return (
        <>
            <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
            <div className="mt-9">
                <QuestionForm mongoUserId={JSON.stringify(mongoUser._id)} />
            </div>
        </>
    );
};

export default AskQuestion;
