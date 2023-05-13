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
        className='text-center my-5 py-2 px-2 mx-1 bg-buttonColor shadow-lg shadow-hoverColorButton/50 hover:shadow-hoverColorButton/40 text-textColorPrimary font-semibold rounded-lg'
        type="button"
        onClick={() => append({ description: "Description question", answers: [{description: ""}, {description: ""}, {description: ""}, {description: ""}], idAnswerCorrect: "0" })}
      >
        Adicionar questão
      </button>

      {fields.map((item, index: number) => {
        return (
          <li className="list-none" key={item.id}>
            <div className='flex flex-col text-textHintColor py-2'>
              <h3>Questão {index + 1}:</h3>
              <input className='text-textColorSecondary rounded-lg bg-backgroundColorInput mt-2 p-2  focus:bg-backgroundColorInput focus:outline-none' type="text" placeholder="Questão*" {...register(`questions.${index}.description`, { required: true })} />

              <CreateAnswers 
                indexQuestion={index}
                {...{ control, register }}
              />
            </div>
            
            <button className="my-5 rounded p-2 bg-errTextColor text-white" type="button" onClick={() => remove(index)}>
              Remover questão {index + 1}
            </button>
          </li>
        );
      })}
    </>
  )
}