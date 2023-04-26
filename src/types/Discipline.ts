import { Activity } from "./Activity";

export type Discipline = {
  id: number
  user: string
  idUser: number
  name: string
  theme: string
  activities: Array<Activity> | null
}
