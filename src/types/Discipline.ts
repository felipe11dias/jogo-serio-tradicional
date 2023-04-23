import { Activity } from "./Activity"

export type Discipline = {
  id: number
  user: string
  name: string
  theme: string
  activities: Array<Activity> | null
}
