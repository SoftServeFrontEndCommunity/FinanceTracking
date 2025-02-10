import {
  FormControlProvider,
  Input,
  useAutoFormatDate,
} from "@pluralsight/react";

import { CalendarIcon } from "@pluralsight/icons";
import React, { ChangeEvent } from "react";

interface DateInputProps {
  name: string;
  onSelect: (selectOption: string) => void;
}

export const DateInput: React.FC<DateInputProps> = ({ name, onSelect }) => {
  const formatOptions = useAutoFormatDate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const formattedDate = new Date(event.currentTarget.value)
      .toISOString()
      .split("T")[0];
    onSelect(formattedDate);
  }
  return (
    <FormControlProvider>
      <Input
        {...formatOptions}
        describedBy="date:help"
        id={name}
        name={name}
        startIcon={CalendarIcon}
        type="text"
        pandoSize="m"
        onBlurCapture={handleChange}
      />
    </FormControlProvider>
  );
};
