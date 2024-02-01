import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { getFormattedNumber, getTimeStamp } from "@/lib/utils";

interface QuestionProps {
    _id: string;
    title: string;
    tags: { _id: string; name: string }[];
    author: { _id: string; name: string };
    upvotes: number;
    views: number;
    answers: Array<object>;
    createdAt: Date;
}

const QuestionCard = ({
    _id,
    title,
    tags,
    author,
    upvotes,
    views,
    answers,
    createdAt,
}: QuestionProps) => {
    return (
        <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
            <div className="flex flex-col-reverse items-start justify-between gap-5 sm:grow">
                <div>
                    <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
                        {getTimeStamp(createdAt)}
                    </span>
                    <Link
                        href={`/question/${_id}`}
                        className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1"
                    >
                        <h3>{title}</h3>
                    </Link>
                </div>
            </div>
            <div className="mt-3.5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
                ))}
            </div>
            <div className="flex-between mt-6 w-full flex-wrap gap-3">
                <Metric
                    imgUrl="assets/icons/avatar.svg"
                    alt="Author"
                    value={author.name}
                    title={` - asked ${getTimeStamp(createdAt)}`}
                    textStyles="body-medium text-dark400_light700"
                    isAuthor={true}
                    href={`/profile/${author._id}`}
                />
                <Metric
                    imgUrl="assets/icons/like.svg"
                    alt="Upvotes"
                    value={getFormattedNumber(upvotes)}
                    title="Upvotes"
                    textStyles="small-medium text-dark400_light800"
                    href={""}
                />
                <Metric
                    imgUrl="assets/icons/message.svg"
                    alt="message"
                    value={getFormattedNumber(answers.length)}
                    title="Answers"
                    textStyles="small-medium text-dark400_light800"
                    href={""}
                />
                <Metric
                    imgUrl="assets/icons/eye.svg"
                    alt="Views"
                    value={getFormattedNumber(views)}
                    title="Views"
                    textStyles="small-medium text-dark400_light800"
                    href={""}
                />
            </div>
        </div>
    );
};

export default QuestionCard;
