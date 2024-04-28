import { FC } from "react";
import styles from "./styles.module.css";

const SkeletonItem: FC<{ height?: string }> = ({ height }) => {
  return (
    <div
      style={{ height: height ? height : "" }}
      className={styles.skeleton}
    ></div>
  );
};

export default SkeletonItem;
