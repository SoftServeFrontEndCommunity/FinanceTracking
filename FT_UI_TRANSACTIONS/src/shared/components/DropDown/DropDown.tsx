import { FormControlProvider, Option, Select } from "@pluralsight/react";
import React, { ChangeEvent } from "react";

interface DropDownProps {
  name: string;
  options: string[];
  onSelect: (selectOption: string) => void;
}

export const DropDown: React.FC<DropDownProps> = ({
  name,
  options,
  onSelect,
}) => {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    onSelect(value);
  }

  return (
    <>
      <div> {`Select ${name}`}</div>
      <FormControlProvider>
        <Select pandoSize="m" id={name} name={name} onChange={handleChange}>
          {options.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </FormControlProvider>
    </>
  );
};
