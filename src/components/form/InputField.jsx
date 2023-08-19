import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

import { defaultLabel } from "../../utils/helper";

export default function FormTextField({
  name,
  label = defaultLabel(name),
  placeholder,
  margin = "normal",
  variant = "outlined",
  error,
  helperText,
  autoComplete,
  defaultValue = "",
  ...rest
}) {
  const { control, formState } = useFormContext();

  const { errors, defaultValues } = formState;

  const defaultFieldValue = defaultValue || defaultValues?.[name];
  const hasError = error || !!errors?.[name];
  const errText = helperText || errors?.[name]?.message;
  const autoCompleteField = autoComplete || name;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <TextField
            onChange={field.onChange}
            fullWidth
            name={name}
            label={label}
            placeholder={placeholder}
            margin={margin}
            variant={variant}
            error={hasError}
            helperText={errText}
            autoComplete={autoCompleteField}
            defaultValue={defaultFieldValue}
            {...rest}
          />
        );
      }}
    />
  );
}
