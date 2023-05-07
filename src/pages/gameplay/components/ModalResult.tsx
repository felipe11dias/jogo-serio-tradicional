import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import FullScreenLoader from "../../../components/loader/full-screen-loader/FullScreenLoader";
import GameSeriusContext, { GameSeriusType } from "../../../context/GameContext/GameContext";
import { useAppSelector } from "../../../redux/store";
import { createOrEditRatings } from "../../../service/rest/apis/rankingRestApi";
import { AnswerQuestions } from "../../collaboration-activities/create-activities/CreateActivities";

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
  fullTime: string
  questionsHit: number
  idActivity: number
  idUser: number
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgb(18, 18, 18)',
  border: '2px solid rgb(0, 0, 0)',
  boxShadow: 24,
  p: 4,
  color: '#fff'
};

const schemaRanking = z.object({
  game: z.string()
    .min(1, 'Jogo é obrigatório'),
  time: z.string()
    .min(1, 'Tempo é obrigatório'),
  fullTime: z.string()
    .min(1, 'Tempo total é obrigatório'),
  questionsHit: z.number()
    .min(1, 'Quantidade de questões corretas é obrigatório'),
  idUser: z.number()
    .min(1, 'Usuário é obrigatório'),
  idActivity: z.number()
    .min(1, 'Atividade é obrigatório')
});

export default function ModalResult(result: ResultProps) {
  const user = useAppSelector(state => state.userState.user)
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;
  const [modalIsOpen, setIsOpen] = useState<boolean>(result.open);
  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<IRegisterOrEditRanking>({
    resolver: zodResolver(schemaRanking),
    defaultValues: {
      game: result.game,
      time: result.time,
      fullTime: result.fullTime,
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

  const onSubmitHandler: SubmitHandler<IRegisterOrEditRanking> = async (values) => {
    console.log(values)
    await createOrEditRatings(values);
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
          <button onClick={closeModal}>X</button>
          <h2>Resultado do jogo </h2>
          <table>
            <thead>
              <tr>Questão</tr>
              <tr>Resultado</tr>
            </thead>
            <tbody>
              {
                result.questions.map( (question, index) => {
                  return (
                    <>
                      <td>{question.description} ?</td>
                      <td>{parseInt(question.idAnswerCorrect) === result.answers[index] ? "Resposta correta" : "Resposta incorreta"}</td>
                    </>
                  )
                })
              }
            </tbody>
          </table>
          <form>
            <button className="" type="button" onClick={closeModal}>Cancelar</button>
            <button type="button" onClick={handleSubmit(onSubmitHandler)}>Salvar</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}