import React, { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Spinner.module.css";
import { ColorsType } from "../../../types/styles.types";

export interface ISpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  color?: ColorsType | "on-surface" | "surface";
}

const Spinner: React.FC<ISpinnerProps> = ({ color = "on-surface", ...rest }) => {
  const spinClasses = clsx(styles.spinner, {
    [styles.primary]: color === "primary",
    [styles.secondary]: color === "secondary",
    [styles.tertiary]: color === "tertiary",
    [styles.error]: color === "error",
    [styles.success]: color === "success",
    [styles["on-surface"]]: color === "on-surface",
    [styles["surface"]]: color === "surface",
  });

  return <span className={spinClasses} {...rest} />;
};

export default Spinner;
