import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Incorrect email address" }),
  password: z.string().min(3, "Password must be at least 3 characters long").nonempty("Password is required"),
  rememberMe: z.boolean(),
})

export const TodolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string(),
  order: z.number(),
})

export type Todolist = z.infer<typeof TodolistSchema>

export const TodolistsResponseSchema = z.array(TodolistSchema)

export type Inputs = z.infer<typeof loginSchema>
