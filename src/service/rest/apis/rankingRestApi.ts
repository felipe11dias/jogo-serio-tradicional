import { api } from "../../../lib/axios/axios";
import { IRegisterOrEditRanking } from "../../../pages/gameplay/components/ModalResult";
import { Ranking } from "../../../types/Ranking";

const PATH: string = 'ratings';

export const listRatings = async (params: any): Promise<any> => {
  const { data } = await api.get(`${PATH}`, { params })
  return data
}

export const createOrEditRatings = async (body: IRegisterOrEditRanking): Promise<Ranking> => {
  const { data } = await api.post(`${PATH}/register-or-edit`, body)
  return data
}

export const deleteByUserAndActivity = async (userId: number, activityId: number): Promise<any> => {
  return (await api.delete(`${PATH}/delete/user/${userId}/activity/${activityId}`)).data
}