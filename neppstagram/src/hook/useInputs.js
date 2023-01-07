import { useState } from "react";

export const useInputs = (initialState) => {
  const [inputs, setInputs] = useState(initialState);

  const handleInputs = (e) => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const reset = () => {
    setInputs(initialState);
  };

  return [inputs, handleInputs, reset];
};
