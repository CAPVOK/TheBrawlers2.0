import { FC } from "react";
import styles from "./style.module.css";
import { clsx } from "clsx";

interface ICaseItemProps {
  clickHandler: () => void;
  title: string;
  text: string;
  isActive: boolean;
}

const CaseItem: FC<ICaseItemProps> = (props) => {
  const { clickHandler, title, isActive, text } = props;
  return (
    <div
      className={clsx(styles.case, { [styles.active]: isActive })}
      onClick={clickHandler}
    >
      <p className={styles.title}>{title}</p>
      {isActive && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default CaseItem;
