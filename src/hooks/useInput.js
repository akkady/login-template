import useLocalstorage from "./useLocalstorage";

const useInput = (key, initValue) => {
  const [value, setValue] = useLocalstorage(key, initValue);

  const reset = () => setValue(initValue);

  const attributeObj = {
    value,
    onchange: (e) => setValue(e.target.value),
  };

  return [value, reset, attributeObj];
};

export default useInput;
