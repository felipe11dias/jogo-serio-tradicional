import { Answer } from "./Answer"

export type Question = {
  id: number
  description: string
  answers: Answer[]
  idAnswerCorrect: number
}