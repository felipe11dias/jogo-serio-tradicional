import { Question } from "./Question"

export type Activity = {
  id: number
  name: string
  user: string
  discipline: string
  questions: Question[]
}