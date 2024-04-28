import { Button, IButtonProps } from "../../components/UI";
import { useCases } from "../../store/casesSlice";
import styles from "./styles.module.css";
import { useClusters } from "../../store/clasterSlice";
import { useTranslation } from "react-i18next";
import { Modal, TextInput, Textarea } from "@mantine/core";
import { ChangeEvent, useEffect, useState } from "react";
import { IconPencil, IconCheck, IconX, IconTrash } from "@tabler/icons-react";
import {
  createCaseToCluster,
  deleteCase,
  getCasesByCluster,
  updateCase,
} from "../../core/case/layer";
import { getClusters, updateClusterName } from "../../core/cluster/layer";
import { useAdminUsers } from "../../store/adminSlice";
import { getUsers, tasksByUserId } from "../../core/user/layer";
import { ITask } from "../../core/task/types";

function AdminContent() {
  const { t } = useTranslation();
  const { activeAdminUser, adminUsers, closeAdminUser } = useAdminUsers();
  const [usersData, setUserData] = useState<ITask[]>([]);

  useEffect(() => {
    if (activeAdminUser !== -1) {
      tasksByUserId(activeAdminUser).then((data) => {
        if (data) {
          setUserData(data);
        }
      });
    }
  }, [activeAdminUser]);

  const closeButtonProps: IButtonProps = {
    onClick: () => {
      closeAdminUser();
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
            <div className={styles.clusterTitle}></div>
            <Button {...closeButtonProps} />
          </div>
          <div className={styles.sendForm}>
            <TextInput
              label={t("common.Heading")}
              withAsterisk
              placeholder={t("common.AddText")}
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
            <Textarea
              label={t("components.case.Solution")}
              withAsterisk
              placeholder={t("components.case.AddSolutionText")}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              autosize
              minRows={3}
              maxRows={6}
            />
            <Button
              label={t("components.case.AddCase")}
              color="success"
              fullWidth
              onClick={handleAddCase}
            />
          </div>
          <h1 className={styles.title}>
            {t("components.case.ExistingSolutions")}
          </h1>
          <div className={styles.reverse}>
            {casesData.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.headingSolution}>
                  <h1>
                    {item.title} #{item.id}
                  </h1>
                  <div className={styles.buttonGroup}>
                    
                  </div>
                </div>
                <p>{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Загрузка</p>
      )}
    </div>
  );
}

export { AdminContent };
