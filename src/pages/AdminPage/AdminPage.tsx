import { clsx } from "clsx";
import styles from "./styles.module.css";
import { FC } from "react";
import { Userbar } from "../../modules/UserBar/Userbar";
import { useAdminUsers } from "../../store/adminSlice";
import { AdminContent } from "../../modules/AdminContetnt/OverflowContent";

export const AdminPage: FC = () => {
  const { activeAdminUser } = useAdminUsers();
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <p className={styles.title}>The Brawlers 2.0</p>
      </nav>

      <div
        className={clsx(styles.body, { [styles.open]: activeAdminUser !== -1 })}
      >
        <Userbar />
        <AdminContent />
      </div>
    </div>
  );
};
