import { Button, IButtonProps } from "../../components/UI";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAdminUsers } from "../../store/adminSlice";
import { tasksByUserId } from "../../core/user/layer";
import { ITask } from "../../core/task/types";

function AdminContent() {
  const { t } = useTranslation();
  const { activeAdminUser, closeAdminUser } = useAdminUsers();
  const [usersData, setUserData] = useState<ITask[]>([]);
  const [status, setStatus] = useState(0);

  const handleButtonClick = (status: number) => {
    setStatus(status);
    if (activeAdminUser !== -1 && status !== 0) {
      tasksByUserId(activeAdminUser, status).then((data) => {
        if (data) {
          setUserData(data);
        } else setUserData([]);
      });
    }
  };

  const closeButtonProps: IButtonProps = {
    onClick: () => {
      closeAdminUser();
      setStatus(0);
    },
    label: t("common.Close"),
    color: "error",
  };

  if (activeAdminUser === -1) {
    return <div className={styles.nodata}>{t("pages.noClusters")}</div>;
  }

  return (
    <div className={styles.overflow}>
      {activeAdminUser ? (
        <div className={styles.content}>
          <div className={styles.nav}>
            <div className={styles.clusterTitle}>
              <div className={styles.margins}>
                <Button
                  label="Приняты"
                  color="primary"
                  onClick={() => {
                    handleButtonClick(1);
                  }}
                />
              </div>
              <div className={styles.margins}>
                <Button
                  label="Завершены"
                  color="primary"
                  onClick={() => {
                    handleButtonClick(2);
                  }}
                />
              </div>
            </div>
            <Button {...closeButtonProps} />
          </div>
          <h1 className={styles.title}>
            {t("Задачи, закрепленные за пользователем:")}
          </h1>
          <div className={styles.reverse}>
            {usersData && usersData.length > 0 ? (
              usersData.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.headingSolution}>
                    <h1>
                      Название: {item.title} #{item.id}
                    </h1>
                    <div className={styles.buttonGroup}></div>
                  </div>
                  <p>Описание: {item.description}</p>
                  <p>Описание: {item.description}</p>
                </div>
              ))
            ) : (
              <p>Нет задач</p>
            )}
          </div>
        </div>
      ) : (
        <p>Загрузка</p>
      )}
    </div>
  );
}

export { AdminContent };
