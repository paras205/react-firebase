import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  label,
  name,
  onChange,
  multiple
}) => {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        className="input"
        placeholder={placeholder}
        value={value}
        name={name}
        type={type}
        id={name}
        onChange={onChange}
        required
        autoComplete="off"
        multiple={multiple}
      />
    </div>
  );
};

export default Input;
