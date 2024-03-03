"use server";

import { connectToDatabase } from "@/lib/mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";
import User from "../models/user.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
    try {
        connectToDatabase();

        // eslint-disable-next-line no-unused-vars
        const { userId, limit = 3 } = params;

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        // find interations for the user and group by tags
        // we

        return [
            { _id: "1", name: "tag1" },
            { _id: "2", name: "tag2" },
            { _id: "3", name: "tag3" },
        ];
    } catch (err) {
        console.log(err);
    }
}
