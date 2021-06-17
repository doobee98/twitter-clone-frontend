import { useState } from 'react';

const useInput = (defaultValue?: string) => {
  const [value, setValue] = useState(defaultValue || '');
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, onChangeValue, setValue] as [
    string,
    (e: React.ChangeEvent<HTMLInputElement>) => void,
    React.Dispatch<React.SetStateAction<string>>,
  ];
};

export default useInput;
