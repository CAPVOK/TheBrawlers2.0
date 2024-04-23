import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";
import { ColorsType } from "../../../types/styles.types";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  color?: ColorsType;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  label,
  color = "primary",
  isLoading = false,
  fullWidth,
  icon,
  ...rest
}) => {
  const buttonClasses = clsx(styles.button, {
    [styles.primary]: color === "primary",
    [styles.secondary]: color === "secondary",
    [styles.tertiary]: color === "tertiary",
    [styles.error]: color === "error",
    [styles.success]: color === "success",
    [styles.width]: fullWidth,
    [styles.disabled]: rest.disabled || isLoading,
  });

  return (
    <button
      className={buttonClasses}
      {...rest}
      disabled={rest.disabled || isLoading}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label && label}
    </button>
  );
};

export default Button;
