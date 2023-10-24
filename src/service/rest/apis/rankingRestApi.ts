import { api } from "../../../lib/axios/axios";
import { IRegisterOrEditRanking } from "../../../pages/gameplay/components/ModalResult";
import { Ranking } from "../../../types/Ranking";

const PATH: string = 'ratings';

export const listRatings = async (params: any): Promise<any> => {
  const { data } = await api.get(`${PATH}`, { params })
  return data
}

export const createRanking = async (body: IRegisterOrEditRanking): Promise<Ranking> => {
  const { data } = await api.post(`${PATH}/register`, body)
  return data
}
