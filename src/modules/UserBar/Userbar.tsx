import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import { getUsers, tasksByUserId } from "../../core/user/layer";
import UserItem from "../../components/UserItem/UserItem";
import { Button } from "@mantine/core";
import { ITask } from "../../core/task/types";
import { useAdminUsers } from "../../store/adminSlice";

function Userbar() {
  const { t } = useTranslation();
  const { activeAdminUser, adminUsers, changeActiveAdminUser, closeAdminUser } =
    useAdminUsers();

  useEffect(() => {
    getUsers();
  }, []);

  const handleUserClick = (id: number) => {
    changeActiveAdminUser(id);
    closeAdminUser();
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>{t("common.Users")}</h2>
      <div className={styles["scroll-block"]}>
        <div className={styles.content}>
          {adminUsers.map((item) => (
            <UserItem
              key={item.id}
              email={item.email}
              clickHandler={() => handleUserClick(item.id)}
              isActive={activeAdminUser === item.id}
              avgDuration={item.avarage_duration}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { Userbar };
