import React from "react";
import QuestionForm from "@/app/components/Forms/QuestionForm";
import { getUserById } from "@/database/actions/user.actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
const AskQuestion = async () => {
    const { userId } = auth();
    if (!userId) {
        redirect("/sign-in");
    }
    const mongoUser = await getUserById(userId);
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
