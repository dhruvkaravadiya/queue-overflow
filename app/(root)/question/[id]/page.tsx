import AnswerForm from "@/app/components/Forms/AnswerForm";
import AllAnswers from "@/app/components/shared/AllAnswers";
import Metric from "@/app/components/shared/Metric";
import ParseHTML from "@/app/components/shared/ParseHTML";
import RenderTag from "@/app/components/shared/RenderTag";
import { getQuestionById } from "@/database/actions/question.actions";
import { getUserByClerkId } from "@/database/actions/user.actions";
import { getFormattedNumber, getTimeStamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({
    params,
    searchParams,
}: {
    params: any;
    searchParams: any;
}) => {
    const result = await getQuestionById({ questionId: params.id });
    console.log("Search Params" + searchParams);
    const { userId: clerkId } = auth();
    let mongodbUser;
    console.log("clerk id" + clerkId);
    if (clerkId) {
        mongodbUser = await getUserByClerkId(clerkId);
        console.log(mongodbUser);
    }

    return (
        <>
            <div className="flex-start w-full flex-col">
                <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                    <Link
                        href={`/profile/${result?.author.clerkId}`}
                        className="flex items-center justify-start gap-1"
                    >
                        <Image
                            src={result?.author.picture}
                            className="rounded-full"
                            width={22}
                            height={22}
                            alt="profile"
                        />
                        <p className="paragraph-semibold text-dark300_light700">
                            {result.author.nam}
                        </p>
                    </Link>
                    <div className="flex justify-end">Voting Component</div>
                </div>
                <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
                    {result.title}
                </h2>
            </div>
            <div className="mb-8 mt-5 flex flex-wrap gap-4">
                <Metric
                    imgUrl="/assets/icons/clock.svg"
                    alt="clock item"
                    value={`asked ${getTimeStamp(result.createdAt)}`}
                    title="Asked"
                    textStyles="small-medium text-dark400_light800"
                    href={""}
                />
                <Metric
                    imgUrl="/assets/icons/message.svg"
                    alt="message"
                    value={getFormattedNumber(result.answers.length)}
                    title="Answers"
                    textStyles="small-medium text-dark400_light800"
                    href={""}
                />
                <Metric
                    imgUrl="/assets/icons/eye.svg"
                    alt="Views"
                    value={getFormattedNumber(result.views)}
                    title="Views"
                    textStyles="small-medium text-dark400_light800"
                    href={""}
                />
            </div>
            <ParseHTML data={result.content}></ParseHTML>
            <div className="mt-8 flex flex-wrap gap-2">
                {result.tags.map((tag: any) => (
                    <RenderTag
                        _id={tag._id}
                        key={tag._id}
                        name={tag.name}
                        showCount={false}
                        clickable={false}
                    ></RenderTag>
                ))}
            </div>
            <AllAnswers
                questionId={result._id.toString()}
                userId={mongodbUser._id.toString()}
                totalAnswers={result.answers.length}
            />

            <AnswerForm
                question={result.content}
                questionId={result._id.toString()}
                authorId={mongodbUser._id.toString()}
            />
        </>
    );
};

export default Page;
