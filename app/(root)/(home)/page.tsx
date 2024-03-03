import LocalSearchBar from "@/app/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Filter from "../../components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/app/components/home/HomeFilters";
import NoResult from "@/app/components/shared/NoResult";
import QuestionCard from "@/app/components/cards/QuestionCard";
import { getAllQuestions } from "@/database/actions/question.actions";

export default async function Home() {
    const result: any = await getAllQuestions({});
    // const user = await getUserById(result.questions[0].author._id);
    // console.log(user);
    return (
        <>
            <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
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
            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
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
            <div className="mt-10 flex w-full flex-col gap-6">
                {result.questions.length > 0 ? (
                    result.questions.map((question: any) => (
                        <QuestionCard
                            key={question._id}
                            _id={question._id as string}
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
                        title="There's no Question to show!"
                        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Your query could be the next big thing others could learn from. Get Involved 💡"
                        link="/ask-question"
                        linkTitle="Ask A question"
                    />
                )}
            </div>
        </>
    );
}
