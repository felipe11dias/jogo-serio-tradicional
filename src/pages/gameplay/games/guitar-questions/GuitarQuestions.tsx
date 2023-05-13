import { Tooltip } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import Countdown from "react-countdown";
import GameSeriusContext, { GameSeriusType } from "../../../../context/GameContext/GameContext";
import { useAppSelector } from "../../../../redux/store";
import { User } from "../../../../redux/types/User";
import { getActivity } from "../../../../service/rest/apis/activityRestApi";
import { IEditActivityInputs } from "../../../collaboration-activities/edit-activities/EditActivities";
import ModalResult, { ResultProps } from "../../components/ModalResult";
import './style.css';

export default function GuitarQuestions() {
  const user: User | null = useAppSelector(state => state.userState.user)
  
  const colors = ['#1b9b1e', '#991213', '#a3960d', '#0a4c99']
  const { gameSerius, saveGameSerius } = useContext(GameSeriusContext) as GameSeriusType;
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [fullTime, setFullTime] = useState<number>(0);
  const [time, setTime] = useState<number | null>(0);
  const [timeQuestions, setTimeQuestions] = useState<number>(0);
  const [timePadding, setTimePadding] = useState<number>(0.5);
  const [topAtt, setTopAtt] = useState<number>(0);
  const [leftAtt, setLeftAtt] = useState<string[]>(['16%', '35%', '54.5%', '74%']);
  const [score, setScore] = useState<number>(0);
  const [activity, setActivity] = useState<IEditActivityInputs>();
  const [result, setResult] = useState<ResultProps>({ idUser: user?.id || -1, idActivity: -1, time: '', fullTime: '', game: 'Mirando respostas', questions: [], open: true, answers: [] });

  useMemo(() => {
    getActivity(gameSerius.activitySelected.toString()).then( data => {
      setActivity(data)
      setResult({
        ...result,
        questions: data.questions,
        idActivity: data.id
      })
    }).catch( error => {
      return null
    })
  }, [])

  const ScoreFinishGame = () => (
    <>
      <ModalResult game={result.game} idUser={result.idUser} idActivity={result.idActivity} time={result.time} fullTime={result.fullTime} questions={result.questions} open={result.open} answers={result.answers} />
      <h1>Fim de jogo!</h1>
    </>
  )

  const renderer = ({ minutes, seconds, completed }: { minutes: number, seconds: number, completed: boolean }) => {
    if (completed) {
      finishGame()
      return <ScoreFinishGame />;
    }else {
      return (
        <div className='mt-2 p-2 w-full flex justify-center'>
          <h1 className='text-2xl text-white'>{(time !== null) ? <>Tempo restante:</> : <></>} {minutes}:{seconds}</h1>
        </div>
      )
    }
  };

  function msToTimeString(s: number) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
  
    return mins + ':' + secs;
  }

  function initStartGame(timeVar: number) {
    result.fullTime = msToTimeString(timeVar)
    setResult(result)
    setTime(timeVar)
    setFullTime(timeVar)
    setTopAtt(topAtt + (100/(timeVar/1000)))
    setTimeQuestions(timeVar / (activity?.questions.length || 1))
  }

  function finishGame() {
    result.time = msToTimeString(time || 0)
    // Preenche as questão não marcadas a tempo com um valor incorreto.
    if(result.questions.length > result.answers.length) {
      for(var i = 0; i < (result.questions.length - result.answers.length); i++) {
        result.answers.push(-1)
      }
    }
    
    setResult(result)
    setTime(null)
  }

  const getColors = (size: number): string[] => {
    return Array.from(Array(size).keys()).map( _ => '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
  }

  function selectionAnswer(id: number) {
    result.answers.push(id)
    setResult(result)
    if(activity?.questions.length === (questionIndex + 1)) {
      finishGame()
    }else {
      setTimePadding(0.5)
      setTimeQuestions((time || 1) / (activity?.questions.length || 1))
      setQuestionIndex(questionIndex + 1)
    }
  }

  function handleTick(t: any) {
    if(timeQuestions === 0) {
      if(activity?.questions.length === (questionIndex + 1)) {
        finishGame()
      }else {
        setQuestionIndex(questionIndex + 1)
        setTimeQuestions((time || 1) / (activity?.questions.length || 1))
      }
    }else {
      if(topAtt < 50) {
        setTimePadding(0.5)
      }else if(topAtt >= 50 && topAtt < 80) {
        setLeftAtt(['15.5%', '35%', '54.5%', '74%'])
        setTimePadding(0.8)
      }else {
        setLeftAtt(['15%', '34.5%', '54%', '73.5%'])
        setTimePadding(1.2)
      }
      setTimeQuestions(timeQuestions - 1000)
    }
    setTopAtt(topAtt + (100/(fullTime/1000)))
    setTime(t.total)
  }

  return(
    <div className="w-full min-height-inherit flex justify-center flex-col">
      {
        (time !== null) ?
        <>
          <h1 className='mt-2 w-100 text-center text-textColorSecondary font-bold'>GUITARRA DAS QUESTÕES</h1>
          <div className='my-4'>
            <h2 className='mb-4 w-100 text-textColorSecondary font-bold'>Instruções:</h2>
            <p className='w-100 text-start text-textColorSecondary'>
              Para cada questão existe as resposta no 'mirando palavras'. <br/>
              Para responder uma questão basta selecionar a resposta que você acredita ser a correta. <br/>
              Você pode visualizar o conjunto de letras selecionadas de cada questão nos campos de respostas disponíveis abaixo das questões. <br/>

              <b>Observação: Certifique-se de que a ordem das letras selecionadas seja equivalentes as posições corretas na tabela do caça palavras. Caso contrário será invalidado a resposta.</b>
            </p>
          </div>
        </> :
        <></>
      }
      {
        !startGame ? 
        <>
          <div className='flex w-full justify-center'>
            <button className='mt-2 p-2 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg' type="button" onClick={() => setStartGame(true)}>Iniciar o jogo</button>
          </div>
        </> 
        :
        <>
          {
            startGame && time === 0 ?
            <>
              <div className="">
                <h1>Selecione o tempo de jogo</h1>
                <select className='mt-2 p-2 bg-backgroundColorInput' onChange={(event) => initStartGame(parseInt(event.target.value))}>
                  <option>Selecione</option>
                  <option value={10000}>10 segundos</option>
                  <option value={20000}>20 segundos</option>
                  <option value={30000}>30 segundos</option>
                  <option value={40000}>40 segundos</option>
                  <option value={50000}>50 segundos</option>
                  <option value={60000}>1 minutos</option>
                  <option value={120000}>2 minutos</option>
                  <option value={240000}>4 minutos</option>
                  <option value={300000}>5 minutos</option>
                  <option value={1800000}>30 minutos</option>
                  <option value={3599999}>1 hora</option>
                </select>
              </div>
            </> :
            <>
            <div className="flex items-center justify-center flex-col min-w-full rounded mb-3" id={time !== null ? "board-guitar" : ""}>
              <div className={"my-2 " + time === null ? 'flex justify-center h-full w-full text-center' : ''}>
                <Countdown date={Date.now() + (time || 0)} onTick={(t) => handleTick(t)} renderer={renderer} />
              </div>

              {
                (time !== null) ?
                <div className="my-2 text-white">
                  {activity?.questions[questionIndex].description + '?'}
                </div>
                :
                <></>
              }

              {
                (time !== null) ?
                  <div className="px-4 pb-2 flex h-full w-full min-height-inherit relative ">
                    <div className="line-left" />
                    <div className="px-8 h-full w-full flex bg-backgroundColorSecondary opacity-80 rounded">
                      <div className="line-straight" id="answer1" />
                      <div className="line-straight" id="answer2" />
                      {
                        activity?.questions[questionIndex].answers.map( (answer, index) => {
                          return(
                            <>
                              <Tooltip className=" rounded absolute" style={{ padding: `${timePadding}em`, left: `${leftAtt[index]}`, backgroundColor: colors[index], top: `${topAtt}%`}} title={answer.description}>
                                <button type="button" className="" onClick={() => selectionAnswer(answer.id)}>Resposta {index + 1}</button>
                              </Tooltip>
                            </>
                          )
                        })
                      }
                      <div className="line-straight" id="answer3" />
                      <div className="line-straight" id="answer4" />
                    </div>
                    <div className="line-right" />
                  </div>
                :
                <></>
              }
            </div>
          </>
          }
        </>
      }

    </div>
  )

}