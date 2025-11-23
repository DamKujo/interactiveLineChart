import type {
  FormButtonExport,
  FormButtonProps,
  FormSelectProps,
} from "./../../types/index.type";
import style from "./FormElems.module.scss";

export function FormSelect({
  value,
  options,
  name,
  onChangeValue,
}: FormSelectProps) {
  return (
    <select
      name={name}
      id={name}
      value={value}
      className={style.selectWrapper}
      onChange={(val) => onChangeValue(val.target.value)}
    >
      {options?.map((opt) => (
        <option key={opt.id} value={opt.value}>
          {opt.value}
        </option>
      ))}
    </select>
  );
}

export function FormButton({ value, onChangeTheme }: FormButtonProps) {
  const handleTheme = () => {
    switch (value) {
      case "dark":
        onChangeTheme("light");
        break;
      case "light":
        onChangeTheme("dark");
        break;
    }
  };

  return (
    <button className={style.buttonWrapper} onClick={() => handleTheme()}>
      {value === "dark" ? "Light" : "Dark"}
    </button>
  );
}

export function FormButtonExport({
  handleExport,
  isLoading,
}: FormButtonExport) {
  return (
    <button className={style.buttonWrapper} onClick={() => handleExport()}>
      {!isLoading ? "Export" : "Loading..."}
    </button>
  );
}
