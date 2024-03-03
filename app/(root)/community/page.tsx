import LocalSearchBar from "@/app/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import Filter from "@/app/components/shared/Filter";
import { getAllUsers } from "@/database/actions/user.actions";
import Link from "next/link";
import UserCard from "@/app/components/cards/UserCard";
const Page = async () => {
    const result = await getAllUsers({});
    return (
        <>
            <h1 className="h1-bold text-dark100_light900">All Users</h1>

            <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                <LocalSearchBar
                    route="/community"
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeHolder="Search for Amazing Minds"
                    otherClasses="flex-1"
                />
                <Filter
                    filters={UserFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                />
            </div>
            <section className="mt-12 flex flex-wrap gap-4">
                {result?.users ? (
                    result?.users.map((user) => (
                        <UserCard key={user._id} user={user} />
                    ))
                ) : (
                    <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
                        <p>No users found</p>
                        <Link
                            href="/sign-up"
                            className="mt-2 font-bold text-accent-blue"
                        >
                            Join to be the first
                        </Link>
                    </div>
                )}
            </section>
        </>
    );
};
export default Page;
