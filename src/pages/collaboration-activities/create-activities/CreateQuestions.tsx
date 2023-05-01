import {
  Control,
  UseFormRegister,
  useFieldArray
} from "react-hook-form";
import { IRegisterActivityInputs } from "./CreateActivities";
import { CreateAnswers } from "./CreateAnswers";

export function CreateQuestions ({
  control,
  register
}: {
  control: Control<IRegisterActivityInputs>;
  register: UseFormRegister<IRegisterActivityInputs>;
}) {
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "questions"
  });
  
  return (
    <>
      <button
        type="button"
        onClick={() => append({ description: "Description question", answers: [{description: ""}, {description: ""}, {description: ""}, {description: ""}], idAnswerCorrect: "0" })}
      >
        Adicionar
      </button>

      {fields.map((item, index: number) => {
        return (
          <li key={item.id}>
            <div className="mb-3">
              <label>Questão {index + 1}:</label>
              <input type="text" placeholder="Questão*" {...register(`questions.${index}.description`, { required: true })} />

              <CreateAnswers 
                indexQuestion={index}
                {...{ control, register }}
              />
            </div>
            
            <button type="button" onClick={() => remove(index)}>
              Remover
            </button>
          </li>
        );
      })}
    </>
  )
}