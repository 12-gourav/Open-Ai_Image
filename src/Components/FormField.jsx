import React from "react";

const FormField = ({
  labelname,
  type,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  name,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2",
        marginBottom: "1rem",
        flexDirection: "column",
      }}
    >
      <label
        htmlFor={name}
        style={{ display: "block", fontWeight: "400", color: "#000" }}
      >
        {name}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default FormField;

{
}
