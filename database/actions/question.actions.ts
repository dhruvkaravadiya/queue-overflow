"use server";

import { connectToDatabase } from "@/lib/mongoose";
import Question from "../models/question.model";
import Tag from "../models/tag.model";
import {
    CreateQuestionParams,
    GetQuestionByIdParams,
    GetQuestionsParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";

export async function createQuestion(params: CreateQuestionParams) {
    try {
        connectToDatabase();
        const { title, content, tags, author, path } = params;
        const question = await Question.create({
            title,
            content,
            author,
        });
        const tagDocuments = [];
        // Create tags if they don't exist,
        // IF exist , get them

        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, "i") } },
                {
                    $setOnInsert: { name: tag },
                    $push: { questions: question._id },
                },
                { upsert: true, new: true }
            );
            tagDocuments.push(existingTag._id);
        }
        await Question.findByIdAndUpdate(question._id, {
            $push: { tags: { $each: tagDocuments } },
        });

        revalidatePath(path);
    } catch (err) {
        console.log(err);
    }
}

export async function getAllQuestions(params: GetQuestionsParams) {
    try {
        connectToDatabase();
        const questions = await Question.find({})
            .populate({ path: "tags", model: Tag, select: "name" })
            .populate({ path: "author", model: User, select: "name" })
            .sort({ createdAt: -1 });
        return { questions };
    } catch (err) {
        console.log(err);
    }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
    try {
        connectToDatabase();
        const { questionId } = params;
        const question = await Question.findById(questionId)
            .populate({
                path: "tags",
                model: Tag,
                select: "_id name",
            })
            .populate({
                path: "author",
                model: "User",
                select: "_id clerkId name picture",
            });

        return question;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
