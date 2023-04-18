import useLocalstorage from "./useLocalstorage";

const useToggle = (key, initValue) => {
  const [value, setValue] = useLocalstorage(key, initValue);

  const toggle = (value) => {
    setValue((prev) => {
      return typeof value === "boolean" ? value : !prev;
    });
  };

  return [value, toggle];
};

export default useToggle;
