

import { useState, type ChangeEvent } from 'react';

/* interface User {
    username: string;
    email: string;
    password: string;
} */

export const useForm = ( initialForm: { [key: string] : string} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = target;
        
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {''
        setFormState( initialForm );
    }
    

    return {
        //...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}
