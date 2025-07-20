import type { SelectChangeEvent } from "@mui/material/Select";
import { useState, type ChangeEvent } from "react";

export const useForm = (initialForm: { [key: string]: string }, initialSelects: { [key: string] : string []}) => {

  const [formState, setFormState] = useState(initialForm);
  const [selecInput, setSelecInput] = useState(initialSelects);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {

    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  const onSelectMultipleChange = ({target}: SelectChangeEvent<string [] >) => {
    
    const { name, value } = target;

    setSelecInput({
      ...initialSelects,
    // On autofill we get a stringified value.
    [name]: value as Array<string>
  });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    //...formState,
    formState,
    selecInput,
    onInputChange,
    onSelectMultipleChange,
    onResetForm,
  };
}

