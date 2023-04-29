import {
  Control,
  useFieldArray,
  UseFormRegister
} from "react-hook-form";
import { IEditActivityInputs } from "./EditActivities";

export function EditAnswers ({
  indexQuestion,
  control,
  register
}: {
  indexQuestion: number,
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
            <div style={{ marginLeft: 'auto', width: "80%" }} className="mb-3" key={index}>
              <label>Resposta {index + 1}:</label>
              <input type="text" placeholder="Adicione a resposta" {...register(`questions.${indexQuestion}.answers.${index}.description`)} />
              <input type="radio" value={index} {...register(`questions.${indexQuestion}.idAnswerCorrect`)} />
            </div>
          </>
        )
      })}
    </>
  )     
}