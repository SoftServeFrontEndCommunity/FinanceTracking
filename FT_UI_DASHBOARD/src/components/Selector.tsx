import React from "react";
import {
  Select,
  FormControlProvider,
  Option,
  FieldMessage,
  Label,
} from "@pluralsight/react";

export enum DateRange {
  LAST_MONT = "LAST_MONT",
  LAST_QUARTER = "LAST_QUARTER",
  LAST_SEMESTER = "LAST_SEMESTER",
  LAST_YEAR = "LAST_YEAR",
}

interface DateSelectorProps {
  range: DateRange;
  handleChange: (value: DateRange) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  range,
  handleChange,
}) => {
  return (
    <FormControlProvider>
      <Label htmlFor="fruit">Transaction Date</Label>
      <Select
        pandoSize="m"
        describedBy="select:help"
        id="fruit"
        name="fruit"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          handleChange(event.target.value as DateRange)
        }
        value={range}
      >
        <Option value="LAST_MONT">Last Month</Option>
        <Option value="LAST_QUARTER">Last Quarter</Option>
        <Option value="LAST_SEMESTER">Last Semester</Option>
        <Option value="LAST_YEAR">Last Year</Option>
      </Select>
      <FieldMessage id="select:help">
        Please choose your date range.
      </FieldMessage>
    </FormControlProvider>
  );
};
