"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { AnswerValidation } from "@/lib/validations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { NEXT_PUBLIC_TINY_MCE_EDITOR_API_KEY } from "@/config";
import { useTheme } from "@/app/context/ThemeProvider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const AnswerForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { mode } = useTheme();
    const editorRef = useRef(null);
    const form = useForm<z.infer<typeof AnswerValidation>>({
        resolver: zodResolver(AnswerValidation),
        defaultValues: {
            answer: "",
        },
    });
    const handleCreateAnswer = (data) => {};
    return (
        <div>
            <div className="mt-4 flex flex-col items-center justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <h4 className="paragraph-semibold  text-dark400_light800">
                    Write Your Answer Here
                </h4>
                <Button
                    className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
                    onClick={() => {}}
                >
                    <Image
                        src={"/assets/icons/stars.svg"}
                        alt="stars"
                        width={12}
                        height={12}
                        className="object-contain"
                    />
                    <span className="text-sm">Generate Answer</span>
                </Button>
            </div>
            <Form {...form}>
                <form
                    className="mt-6 flex w-full flex-col gap-10"
                    onSubmit={form.handleSubmit(handleCreateAnswer)}
                >
                    <FormField
                        control={form.control}
                        name="answer"
                        render={({ field }) => (
                            <FormItem className="w-full flex-col gap-3">
                                <FormControl className="mt-3.5">
                                    {/* // Text Editor */}
                                    <Editor
                                        apiKey={
                                            NEXT_PUBLIC_TINY_MCE_EDITOR_API_KEY
                                        }
                                        onInit={(evt, editor) => {
                                            // @ts-ignore
                                            // eslint-disable-next-line no-undef
                                            editorRef.current = editor;
                                        }}
                                        onBlur={field.onBlur}
                                        onEditorChange={(content) =>
                                            field.onChange(content)
                                        }
                                        init={{
                                            height: 350,
                                            menubar: false,
                                            plugins: [
                                                "advlist",
                                                "autolink",
                                                "lists",
                                                "link",
                                                "image",
                                                "charmap",
                                                "preview",
                                                "anchor",
                                                "searchreplace",
                                                "visualblocks",
                                                "codesample",
                                                "fullscreen",
                                                "insertdatetime",
                                                "media",
                                                "table",
                                                "wordcount",
                                            ],
                                            toolbar:
                                                "undo redo | " +
                                                "codesample | bold italic forecolor | alignleft aligncenter |" +
                                                "alignright alignjustify | bullist numlist outdent indent",

                                            content_style:
                                                "body { font-family:Inter; font-size:16px }",
                                            skin:
                                                mode === "dark"
                                                    ? "oxide-dark"
                                                    : "oxide",
                                            content_css:
                                                mode === "dark"
                                                    ? "dark"
                                                    : "light",
                                        }}
                                    />
                                </FormControl>

                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button
                            type="button"
                            className="primary-gradient w-fit text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AnswerForm;
