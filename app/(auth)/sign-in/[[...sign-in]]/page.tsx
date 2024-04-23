import { SignIn } from "@clerk/nextjs";
import "../../../globals.css";
export default function Page() {
    return (
        <div className="mt-16">
            <SignIn />
        </div>
    );
}
