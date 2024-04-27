import styles from "./styles.module.css";

const Fire = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.flame} id="flame-2"></div>
        <div className={styles.flame} id="flame-1"></div>
        <div className={styles.flame} id="flame-3"></div>
        <div className={styles.smallElement} id="small-element-1"></div>
        <div className={styles.smallElement} id="small-element-2"></div>
        <div className={styles.flameBottom}>
          <div className={styles.mainFire}></div>
        </div>
        <div className={styles.wood} id="wood-1"></div>
        <div className={styles.wood} id="wood-2"></div>
      </div>
    </div>
  );
};

export default Fire;
