"use server";

import { connectToDatabase } from "@/lib/mongoose";
import User from "../models/user.model";
import {
    CreateUserParams,
    DeleteUserParams,
    UpdateUserParams,
    GetAllUsersParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "../models/question.model";

export async function getUserById(clerkId: any) {
    try {
        connectToDatabase();

        const user = await User.findOne({ clerkId });
        return user;
    } catch (err) {
        console.log(err);
    }
}

export async function createUser(userData: CreateUserParams) {
    try {
        connectToDatabase();

        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    } catch (err) {
        console.log(err);
    }
}

export async function updateUser(params: UpdateUserParams) {
    try {
        connectToDatabase();
        const { clerkId, updateData, path } = params;
        await User.findOneAndUpdate({ clerkId }, updateData, {
            new: true,
        });
        revalidatePath(path);
    } catch (err) {
        console.log(err);
    }
}

export async function deleteUser(params: DeleteUserParams) {
    try {
        connectToDatabase();
        const { clerkId } = params;
        const user = await User.findOneAndDelete({ clerkId });
        if (!user) {
            throw new Error("User not found");
        }
        // const userQuestionIds = await Question.find({
        //     author: user._id,
        // }).distinct("_id");
        await Question.deleteMany({ author: user._id });

        // TODO : delete user answers , comments etc

        const deletedUser = await User.findByIdAndDelete(user._id);
        return deletedUser;
    } catch (err) {
        console.log(err);
    }
}

export async function getAllUsers(params: GetAllUsersParams) {
    connectToDatabase();
    try {
        // const { page = 1, pageSize = 10, filter, searchQuery } = params;
        const users = await User.find({}).sort({ createdAt: -1 });
        return { users };
    } catch (err) {
        console.log(err);
    }
}
