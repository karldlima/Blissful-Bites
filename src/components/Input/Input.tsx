import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref): JSX.Element => {
    return <input ref={ref} {...props} />;
  }
);
Input.displayName = "Input";
