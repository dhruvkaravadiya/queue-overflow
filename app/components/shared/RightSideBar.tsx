import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import Image from "next/image";
import { getAllTags } from "@/database/actions/tag.actions";
const topQuestions = [
    {
        _id: "1",
        title: "How to install docker on linux using the command line?",
    },
    {
        _id: "2",
        title: "How to install docker on linux using the command line?",
    },
    {
        _id: "3",
        title: "How to install docker on linux using the command line?",
    },
    {
        _id: "4",
        title: "How to install docker on linux using the command line?",
    },
    {
        _id: "5",
        title: "How to install docker on linux using the command line?",
    },
];

const RightSideBar = async () => {
    const result = await getAllTags({});
    const top5Tags = result?.tags
        .sort((a, b) => b.questions.length - a.questions.length)
        .slice(0, 5);
    return (
        <section
            className="background-light900_dark200 light-border
    sticky right-0 top-0 flex h-screen w-[350px] 
    flex-col overflow-y-auto border-l  
    p-6 pt-36 shadow-light-300 
    dark:shadow-none max-xl:hidden lg:w-[266px]"
        >
            <div>
                <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
                <div className="mt-7 flex w-full flex-col gap-[30px]">
                    {topQuestions.map((question) => (
                        <Link
                            key={question._id}
                            href={`/questions/${question._id}`}
                            className="flex cursor-pointer items-center justify-between gap-7"
                        >
                            <p className="body-medium text-dark500_light700">
                                {question.title}
                            </p>
                            <Image
                                src="/assets/icons/chevron-right.svg"
                                alt="chevron-right"
                                height={20}
                                width={20}
                                className="invert-colors"
                            />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mt-16">
                <h3 className="h3-bold text-dark200_light900 ">Popular Tags</h3>
                <div className="mt-7 flex flex-col gap-4">
                    {top5Tags?.map((tag) => (
                        <RenderTag
                            key={tag._id}
                            _id={tag._id}
                            name={tag.name}
                            totalQuestions={tag.questions.length}
                            showCount
                            clickable={true}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RightSideBar;
