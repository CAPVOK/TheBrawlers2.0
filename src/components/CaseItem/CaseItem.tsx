import { FC, MouseEvent } from "react";
import styles from "./style.module.css";
import { clsx } from "clsx";
import { Button } from "../UI";

interface ICaseItemProps {
  clickCardHandler: () => void;
  clickButtonHandler: () => void;
  title: string;
  text: string;
  isActive: boolean;
}

const CaseItem: FC<ICaseItemProps> = (props) => {
  const { clickCardHandler, clickButtonHandler, title, isActive, text } = props;

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (target.closest("button")) {
      clickButtonHandler();
    } else {
      clickCardHandler();
    }
  };

  return (
    <div
      className={clsx(styles.case, { [styles.active]: isActive })}
      onClick={clickHandler}
      tabIndex={0}
    >
      <p className={styles.title}>{title}</p>
      <div className={styles.content}>
        <p className={styles.text}>{text}</p>
        <Button
          color="tertiary"
          label="Использовать"
          fullWidth
          tabIndex={isActive ? 0 : -1}
        />
      </div>
    </div>
  );
};

export default CaseItem;
