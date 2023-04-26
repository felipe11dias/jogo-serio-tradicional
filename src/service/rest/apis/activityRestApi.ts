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

export const editDisciplines = async (idDiscipline: number, body: any): Promise<Activity> => {
  const { data } = await api.put(`${PATH}/${idDiscipline}`, body)
  return data
}

export const deleteDisciplines = async (idDiscipline: number): Promise<void> => {
  const { data } = await api.delete(`${PATH}/${idDiscipline}`)
  return data
}