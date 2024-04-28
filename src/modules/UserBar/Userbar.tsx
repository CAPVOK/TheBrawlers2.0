import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import { getUsers, tasksByUserId } from "../../core/user/layer";
import UserItem from "../../components/UserItem/UserItem";
import { Button } from "@mantine/core";
import { ITask } from "../../core/task/types";

function Userbar() {
  const { t } = useTranslation();

  const [users, setUsers] = useState<IUser[]>([]);
  const [isUser, setIsUser] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleUserClick = () => {
    setIsUser(!isUser);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("common.Users")}</h2>
      </div>
      <div className={styles["scroll-block"]}>
        <div className={styles.content}>
          {users ? (
            <>
              {users.map((user) => (
                <>
                  <UserItem
                    key={user.id}
                    clickHandler={() => {
                      handleUserClick();
                    }}
                    email={user.email}
                    isActive={user.isActive}
                    avgDuration={user.avgDuration}
                    id={0}
                  />
                  {isUser ? (
                    <>
                      <Button
                        onClick={() =>
                          tasksByUserId(user.userId, 1).then((data) =>
                            setTasks(data)
                          )
                        }
                      >
                        Status1
                      </Button>
                      <Button
                        onClick={() =>
                          tasksByUserId(user.userId, 2).then((data) =>
                            setTasks(data)
                          )
                        }
                      >
                        Status2
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </>
          ) : (
            <>no data</>
          )}
        </div>
      </div>
    </div>
  );
}

export { Userbar };
