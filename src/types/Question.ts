import { Activity } from "./Activity"
import { Answer } from "./Answer"

export type Question = {
  id: number
  description: string
  activity: Activity
  answers: Answer[]
  idAnswerCorrect: number
}