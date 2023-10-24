import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import FullScreenLoader from "../../../components/loader/full-screen-loader/FullScreenLoader";
import { createRanking } from "../../../service/rest/apis/rankingRestApi";
import { AnswerQuestions } from "../../collaboration-activities/edit-activities/EditActivities";

export type ResultProps = {
  game: string
  time: string
  fullTime: string
  open: boolean
  questions: AnswerQuestions[]
  answers: number[]
  idActivity: number
  idUser: number
}

export type IRegisterOrEditRanking = {
  game: string
  time: string
  fulltime: string
  questions: number
  questionsHit: number
  idActivity: number
  idUser: number
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: '#fff',
  borderRadius: '0.5rem',
  border: '2px solid #3349f1',
  boxShadow: 24,
  p: 4,
  color: '#000'
};

const schemaRanking = z.object({
  game: z.string()
    .min(1, 'Jogo é obrigatório'),
  time: z.string()
    .min(1, 'Tempo é obrigatório'),
  fulltime: z.string()
    .min(1, 'Tempo total é obrigatório'),
  questionsHit: z.number()
    .min(1, 'Quantidade de questões corretas é obrigatório'),
  questions: z.number()
    .min(1, 'Quantidade de questões da atividade é obrigatório'),
  idUser: z.number()
    .min(1, 'Usuário é obrigatório'),
  idActivity: z.number()
    .min(1, 'Atividade é obrigatório')
});

export default function ModalResult(result: ResultProps) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(result.open);
  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<IRegisterOrEditRanking>({
    resolver: zodResolver(schemaRanking),
    defaultValues: {
      game: result.game,
      time: result.time,
      fulltime: result.fullTime,
      questionsHit: getQuestionsHit(),
      questions: (result.questions.length + 1),
      idActivity: result.idActivity,
      idUser: result.idUser
    }
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast.success('Resultado adicionado na classic com sucesso!');
      navigate('/environment/teacher/collaboration-activities/list', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  function getQuestionsHit(): number {
    let qtd: number = 0;
    result.questions.map( (question, index) => {
      if(parseInt(question.idAnswerCorrect) === result.answers[index]) qtd++;
    })
    return qtd;
  }

  const onSubmit: any = async (values: any, event: any) => {
    event.preventDefault();
    await createRanking(values).then( response => {
      toast.success("Resultado do jogo salvo. Você pode verificar na classificação.")
    });
    closeModal()
  }

  if(isSubmitting) {
    return (
      <>
        <FullScreenLoader/>
      </>
    )
  }

  function closeModal() {
    setIsOpen(false);
    navigate("/environment/student/game-select", { replace: true })
  }

  return (
    <div>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button className="float-right" onClick={closeModal}>X</button>
          <h1 className="mb-4 w-full text-center">Resultado do jogo</h1>
          <table className="border-2 border-solid border-textColorThird mb-4 w-full text-sm text-center text-primary dark:text-textHintColor ">
            <thead className="text-xs text-primary uppercase bg-bgTableHeaderColor dark:bg-primary dark:text-textHintColor ">
              <tr>
                <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Questão</th>
                <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Resposta selecionada</th>
                <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Resposta correta</th>
                <th scope="col" className="border-2 border-solid border-textColorThird px-6 py-3">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {
                result.questions.map( (question, index) => {
                  return (
                    <tr className="text-textColorSecondary">
                      <td className="px-1 text-start border-2 border-solid border-textColorThird">{question.description} ?</td>
                      <td className="px-1 text-start border-2 border-solid border-textColorThird">{question.answers.find((ans) => ans?.id === result?.answers[index])?.description || 'Nenhuma resposta selecionada'}</td>
                      <td className="px-1 text-start border-2 border-solid border-textColorThird">{question.answers.find((ans) => ans?.id === parseInt(question.idAnswerCorrect))?.description}</td>
                      <td className="px-1 text-start border-2 border-solid border-textColorThird">{parseInt(question.idAnswerCorrect) === result.answers[index] ? "Resposta correta" : "Resposta incorreta"}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <div className="mt-9 flex justify-end">
            <button className="w-24 rounded mx-6 p-2 bg-errTextColor text-white hover:scale-125 hover:cursor-pointer" type="button" onClick={closeModal}>Cancelar</button>
            <button className="w-24 rounded p-2 bg-backgroundColorFooterPrimary text-white hover:scale-125 hover:cursor-pointer" onClick={(e) => onSubmit(getValues(), e)}>Salvar</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}