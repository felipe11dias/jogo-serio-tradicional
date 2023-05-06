import { api } from "../../../lib/axios/axios";
import { IRegisterActivityInputs } from "../../../pages/collaboration-activities/create-activities/CreateActivities";
import { IEditActivityInputs } from "../../../pages/collaboration-activities/edit-activities/EditActivities";
import { Activity } from "../../../types/Activity";

const PATH: string = 'activities';

export const listActivities = async (params: any): Promise<any> => {
  const { data } = await api.get(`${PATH}`, { params })
  return data
}

export const listActivitiesByDiscipline = async (idDiscipline: number, params: any): Promise<any> => {
  const { data } = await api.get(`${PATH}/discipline/${idDiscipline}`, { params })
  return data
}

export const getActivity = async (id: string): Promise<IEditActivityInputs> => {
  const { data } = await api.get(`${PATH}/${parseInt(id)}`)
  return data
}

export const createActivities = async (body: IRegisterActivityInputs): Promise<Activity> => {
  const { data } = await api.post(`${PATH}/register`, body)
  return data
}

export const editActivitiy = async (idActivity: string, body: IEditActivityInputs): Promise<Activity> => {
  const { data } = await api.put(`${PATH}/${parseInt(idActivity)}`, body)
  return data
}

export const deleteActivitiy = async (idActivity: number): Promise<void> => {
  const { data } = await api.delete(`${PATH}/${idActivity}`)
  return data
}
