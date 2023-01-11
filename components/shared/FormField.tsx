import { FormControl, Input, InputAdornment, InputLabel } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import React, { HTMLInputTypeAttribute } from 'react';
import { floatInputHandler, floatPasteHandler } from 'utils/utility';

export type FormFieldProps<T> = {
  icon: JSX.Element;
  name: T;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute ;
  multiline?: boolean;
  props?: any;
  error: boolean;
}
function FormField<T extends string>({ icon, name, label, placeholder, type, multiline = false, props, error }: FormFieldProps<T>) {
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel htmlFor={name}>
        {label}
      </InputLabel>
      <InputBase
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        multiline={multiline}
        type="text"
        id={name}
        name={name}
        startAdornment={
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        }
        {...(placeholder && { placeholder })}
        {...(type === 'number' && {
          inputProps: {
            minLength: 3,
            maxLength: 80,
            onInput: floatInputHandler,
            onPaste: floatPasteHandler
          },
          inputMode: 'decimal'
        })}
        {...(props && props)}
        className={`
          relative transition-all pt-5 border-0 border-b-[1px] border-transparent border-solid
          ${error ? 'border-b-red-500' : 'border-b-themed-border'} 
          ${error ? 'focus-within:border-b-red-500' : 'focus-within:border-b-primary'} 
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] 
          after:scale-x-0 after:transition-transform after:origin-right after:duration-300
          focus-within:after:scale-x-100 focus-within:after:origin-left
          ${error ? 'after:bg-red-500' : 'after:bg-primary'}
        `}
      />
    </FormControl>
  );
};

export default FormField;