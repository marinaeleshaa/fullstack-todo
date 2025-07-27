"use server";

import { ITodo } from "@/interfaces";
import { TodoFormValues } from "@/validation";
import { th } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const getTodoActions = async ({ userId }: { userId: string | null }) => {
  // throw new Error("User ID is required to fetch todos");
  return await prisma.todo.findMany({
    where: {
      user_id: userId as string,
    },
    orderBy: { createdAt: "desc" },
  });
};
export const addTodoAction = async ({
  title,
  body,
  completed,
  userId,
}: TodoFormValues & { userId: string | null }) => {
  await prisma.todo.create({
    data: { title, body, completed, user_id: userId as string },
  });

  revalidatePath("/");
};
export const updateTodoAction = async (todo: ITodo) => {
  await prisma.todo.update({
    where: { id: todo.id },
    data: {
      title: todo.title,
      body: todo.body,
      completed: todo.completed,
    },
  });

  revalidatePath("/");
};
export const deleteTodoAction = async ({ id }: { id: string }) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
};
