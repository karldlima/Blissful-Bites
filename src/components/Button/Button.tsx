import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref): JSX.Element => {
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
