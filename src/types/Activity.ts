import { Question } from "./Question"

export type Activity = {
  id: number
  name: string
  user: string
  idUser: number
  discipline: string
  idDiscipline: number
  questions: Question[]
}