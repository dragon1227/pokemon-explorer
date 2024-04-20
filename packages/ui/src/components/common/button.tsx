import type { MouseEventHandler, ReactNode } from "react";

export type ISize = "sm" | "md" | "lg" | "xl" | "full";

export type IVariant = "outline" | "solid" | "none";

export type IColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

export interface IButton {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  rounded?: ISize;
  variant?: IVariant;
  color?: IColor;
  className?: string;
  disabled?: boolean;
}

const buttonStyleVariants = {
  round: {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  },
  color: {
    primary:
      "bg-blue-500 disabled:bg-blue-400 disabled:text-white/60 text-white",
    secondary: "bg-steal-400 disabled:bg-steal-300 text-white",
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white",
    warning: "bg-yellow-600 text-white",
    info: "bg-cyan-600 text-white",
    light: "bg-white/20 text-white",
    dark: "bg-black/70 text-gray-100",
  },
  variant: {
    outline: "border border-slate-300/30",
    solid: "border border-slate-300",
    none: "border-none",
  },
  basic: "backdrop-blur-md px-2 py-1",
};

export default function Button({
  rounded = "md",
  className,
  color = "primary",
  children,
  variant = "solid",
  ...props
}: IButton): JSX.Element {
  const cn = [
    buttonStyleVariants.basic,
    buttonStyleVariants.round[rounded],
    buttonStyleVariants.color[color],
    buttonStyleVariants.variant[variant],
    className,
  ].join(" ");
  return (
    <button type="button" {...props} className={cn}>
      {children}
    </button>
  );
}
