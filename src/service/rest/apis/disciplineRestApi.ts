import { api } from "../../../lib/axios/axios";
import { IRegisterDisciplineInputs } from "../../../pages/collaboration-disciplines/create-discipline/CreateDiscipline";
import { IEditDisciplineInputs } from "../../../pages/collaboration-disciplines/list-disciplines/components/ModalEdit";
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

export const editDisciplines = async (idDiscipline: number, body: IEditDisciplineInputs): Promise<Discipline> => {
  const { data } = await api.put(`${PATH}/${idDiscipline}`, body)
  return data
}

export const deleteDisciplines = async (idDiscipline: number): Promise<void> => {
  const { data } = await api.delete(`${PATH}/${idDiscipline}`)
  return data
}
