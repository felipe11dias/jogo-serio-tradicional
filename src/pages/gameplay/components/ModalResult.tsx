import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import FullScreenLoader from "../../../components/loader/full-screen-loader/FullScreenLoader";
import { createOrEditRatings, deleteByUserAndActivity } from "../../../service/rest/apis/rankingRestApi";
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
  idUser: z.number()
    .min(1, 'Usuário é obrigatório'),
  idActivity: z.number()
    .min(1, 'Atividade é obrigatório')
});

export default function ModalResult(result: ResultProps) {
  const [modalIsOpen, setIsOpen] = useState<boolean>(result.open);
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<IRegisterOrEditRanking>({
    resolver: zodResolver(schemaRanking),
    defaultValues: {
      game: result.game,
      time: result.time,
      fulltime: result.fullTime,
      questionsHit: getQuestionsHit(),
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

  const onSubmitHandler: SubmitHandler<IRegisterOrEditRanking> = async (values, evt: any) => {
    evt.preventDefault();
    evt.stopPropagation(); 

    await deleteByUserAndActivity(values.idUser, values.idActivity)
      .then( async (response) => {
        if(response.status === 204) {
          toast.success("Classificação para esse jogo já existe. Classificação será sobreposta sobre o jogo já existente.")
          await createOrEditRatings(values).then( response => {
            toast.success("Classificação sobreposta.")
          });
        }else {
          toast.error("Usuário ou atividade não encontrados.")
        }
      }).catch( async (error: any) => {
        if(error.response.status === 404) {
          await createOrEditRatings(values).then( response => {
            toast.success("Classificação salva.")
          });
        }
      })
    closeModal()
  };

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
          <form className="mt-9 flex justify-end" onSubmit={handleSubmit(onSubmitHandler)}>
            <button className="w-24 rounded mx-6 p-2 bg-errTextColor text-white hover:scale-125 hover:cursor-pointer" type="button" onClick={closeModal}>Cancelar</button>
            <button className="w-24 rounded p-2 bg-backgroundColorFooterPrimary text-white hover:scale-125 hover:cursor-pointer" type="submit">Salvar</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}