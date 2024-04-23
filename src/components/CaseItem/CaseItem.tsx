import { FC } from "react";
import styles from "./style.module.css";
import { clsx } from "clsx";

interface ICaseItemProps {
  clickHandler: () => void;
  title: string;
  isActive: boolean;
}

const CaseItem: FC<ICaseItemProps> = (props) => {
  const { clickHandler, title, isActive } = props;
  return (
    <div
      className={clsx(styles.case, { [styles.active]: isActive })}
      onClick={clickHandler}
    >
      <p className={styles.text}>{title}</p>
    </div>
  );
};

export default CaseItem;
