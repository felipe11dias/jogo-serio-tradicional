import {
  Control,
  useFieldArray,
  UseFormRegister
} from "react-hook-form";
import { AnswerQuestions, IEditActivityInputs } from "./EditActivities";

export function EditAnswers ({
  question,
  indexQuestion,
  control,
  register
}: {
  question: AnswerQuestions;
  indexQuestion: number;
  control: Control<IEditActivityInputs>;
  register: UseFormRegister<IEditActivityInputs>;
}) {
  const { fields } = useFieldArray({
    control,
    name: `questions.${indexQuestion}.answers` 
  });

  return (
    <>
      {fields.map((item: any, index: number) => {
        return (
          <>
            <div style={{ marginLeft: 'auto', width: "80%" }} className='flex flex-col text-textHintColor py-2' key={item.id}>
              <h3>Resposta {index + 1}:</h3>
              <textarea className='text-textColorSecondary rounded-lg bg-backgroundColorInput mt-2 p-2  focus:bg-backgroundColorInput focus:outline-none' placeholder="Resposta*" {...register(`questions.${indexQuestion}.answers.${index}.description`)} />
              <div className="w-full">
                <h4>Selecionar como resposta correta:</h4>
                <input className="my-2" type="radio" checked={question.answers[index].id === parseInt(question.idAnswerCorrect)} value={question.answers[index].id} {...register(`questions.${indexQuestion}.idAnswerCorrect`)} />
              </div>
            </div>
          </>
        )
      })}
    </>
  )     
}