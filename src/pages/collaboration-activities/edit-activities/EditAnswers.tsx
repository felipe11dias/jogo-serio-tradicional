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
        console.log("item", item)
        console.log("`questions.${indexQuestion}.answers.${index}.id`", `questions.${indexQuestion}.answers.${index}.id`)
        return (
          <>
            <div style={{ marginLeft: 'auto', width: "80%" }} className="mb-3" key={item.id}>
              <label>Resposta {index + 1}:</label>
              <input type="text" placeholder="Resposta*" {...register(`questions.${indexQuestion}.answers.${index}.description`)} />
              <input type="radio" checked={question.answers[index].id === parseInt(question.idAnswerCorrect)} value={question.answers[index].id} {...register(`questions.${indexQuestion}.idAnswerCorrect`)} />
            </div>
          </>
        )
      })}
    </>
  )     
}