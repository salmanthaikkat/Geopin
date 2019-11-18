import React from "react";
import "./input.css";

const Input = props => {
  const handleChange = e => {
    e.preventDefault();
    props.onChange(e);
  };

  return (
    <input
      type={props.type}
      name={props.name}
      refs={props.ref}
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleChange}
      className={props.className}
      autoComplete="off"
      required={props.required}
      autoFocus={props.autoFocus}
      maxLength={props.maxLength}
    />
  );
};

export default Input;
