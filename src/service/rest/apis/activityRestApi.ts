import { api } from "../../../lib/axios/axios";
import { IRegisterActivityInputs } from "../../../pages/collaboration-activities/create-activities/CreateActivities";
import { Activity } from "../../../types/Activity";

const PATH: string = 'activities';

export const listActivities = async (): Promise<Activity[]> => {
  const { data } = await api.get(`${PATH}`)
  return data.content
}

export const createActivities = async (body: IRegisterActivityInputs): Promise<Activity> => {
  const { data } = await api.post(`${PATH}/register`, body)
  return data
}
