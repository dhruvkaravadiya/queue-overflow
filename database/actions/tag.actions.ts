"use server";

import { connectToDatabase } from "@/lib/mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import User from "../models/user.model";
import Tag from "../models/tag.model";

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

export async function getAllTags(params: GetAllTagsParams) {
    try {
        connectToDatabase();
        const tags = await Tag.find({});
        return { tags };
    } catch (err) {
        console.log(err);
    }
}
