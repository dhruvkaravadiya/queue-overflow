import LocalSearchBar from "@/app/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Filter from "../../components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/app/components/home/HomeFilters";
import NoResult from "@/app/components/shared/NoResult";
import QuestionCard from "@/app/components/cards/QuestionCard";

const questions = [
    {
        _id: "1",
        title: "Demo question number 1 in Queue Overflow",
        tags: [
            { _id: "1", name: "python" },
            { _id: "2", name: "sql" },
        ],
        author: { _id: "1", name: "John Doe" },
        upvotes: 10,
        views: 120,
        answers: [],
        createdAt: new Date("2024-02-01T13:58:09.292Z"),
    },
    {
        _id: "2",
        title: "Demo question number 2 in Queue Overflow",
        tags: [
            { _id: "1", name: "python" },
            { _id: "2", name: "sql" },
        ],
        author: { _id: "1", name: "John Doe" },
        upvotes: 10,
        views: 120,
        answers: [],
        createdAt: new Date("2024-02-01T13:58:09.292Z"),
    },
    {
        _id: "3",
        title: "Demo question number 3 in Queue Overflow",
        tags: [
            { _id: "1", name: "python" },
            { _id: "2", name: "sql" },
        ],
        author: { _id: "1", name: "John Doe" },
        upvotes: 10,
        views: 12000000,
        answers: [],
        createdAt: new Date("2024-02-01T13:58:09.292Z"),
    },
    {
        _id: "4",
        title: "Demo question number 4 in Queue Overflow",
        tags: [
            { _id: "1", name: "python" },
            { _id: "2", name: "sql" },
        ],
        author: { _id: "1", name: "John Doe" },
        upvotes: 10,
        views: 120,
        answers: [],
        createdAt: new Date("2024-02-01T13:58:09.292Z"),
    },
    {
        _id: "5",
        title: "Demo question number 5 in Queue Overflow",
        tags: [
            { _id: "1", name: "python" },
            { _id: "2", name: "sql" },
        ],
        author: { _id: "1", name: "John Doe" },
        upvotes: 10,
        views: 120,
        answers: [],
        createdAt: new Date("2024-02-01T13:58:09.292Z"),
    },
];
export default function Home() {
    return (
        <>
            <div
                className="flex w-full flex-col-reverse justify-between gap-4 
        sm:flex-row sm:items-center"
            >
                <h1 className="h1-bold text-dark100_light900">All Questions</h1>
                <Link
                    href="/ask-question"
                    className="flex justify-end max-sm:w-full"
                >
                    <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
                        Ask A Question
                    </Button>
                </Link>
            </div>
            <div
                className="mt-11 flex justify-between gap-5 
            max-sm:flex-col sm:items-center"
            >
                <LocalSearchBar
                    route="/"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeHolder="Search for Questions"
                    otherClasses="flex-1"
                />
                <Filter
                    filters={HomePageFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                    containerClasses="hidden max-md:flex"
                />
            </div>
            <div className="max-md:hidden">
                <HomeFilters />
            </div>
            <div className="mt-10 flex w-full flex-col gap-6 ">
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <QuestionCard
                            key={question._id}
                            _id={question._id}
                            title={question.title}
                            tags={question.tags}
                            author={question.author}
                            upvotes={question.upvotes}
                            views={question.views}
                            answers={question.answers}
                            createdAt={question.createdAt}
                        />
                    ))
                ) : (
                    <NoResult
                        title="There`s no Question to show!"
                        description="Be the first to break the silence! 🚀 Ask a Question and
                    kickstart the discussion. Your query could be the next big thing
                    others could learn from. Get Invovled 💡"
                        link="/ask-question"
                        linkTitle="Ask A question"
                    />
                )}
            </div>
        </>
    );
}
