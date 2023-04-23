import { api } from "../../../lib/axios/axios";
import { IRegisterDisciplineInputs } from "../../../pages/collaboration-disciplines/create-discipline/CreateDiscipline";
import { Discipline } from "../../../types/Discipline";

const PATH: string = 'disciplines';

export const listDisciplines = async (): Promise<Discipline[]> => {
  const { data } = await api.get(`${PATH}`)
  return data.content
}

export const createDisciplines = async (body: IRegisterDisciplineInputs): Promise<Discipline> => {
  const { data } = await api.post(`${PATH}/register`, body)
  return data
}