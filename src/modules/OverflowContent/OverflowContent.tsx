import { Button, IButtonProps } from "../../components/UI";
import { useCases } from "../../store/casesSlice";
import styles from "./styles.module.css";
import { useClusters } from "../../store/clasterSlice";
import TextEditor from "../TextEditor/TextEditor";
import { useTranslation } from "react-i18next";
import { TextInput } from "@mantine/core";
import { ChangeEvent, useState, useEffect } from "react";
import { IconPencil, IconCheck, IconX } from "@tabler/icons-react";

function OverflowContent() {
  const { t } = useTranslation();
  const { activeCluster, closeCluster } = useClusters();
  const { closeCase } = useCases();
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  /* useEffect(() => {
    const clusterData = CLUSTERS.find(
      (cluster) => cluster.id === activeCluster
    );
    if (clusterData) {
      setEditedTitle(clusterData.title);
    }
  }, [activeCluster]); */

  const closeButtonProps: IButtonProps = {
    onClick: () => {
      closeCluster();
      closeCase();
    },
    label: t("common.Close"),
    color: "error",
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleEditIconClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  const handleCancelChanges = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <div className={styles.clusterTitle}>
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <IconCheck stroke={2} onClick={handleSaveChanges} />
              <IconX stroke={2} onClick={handleCancelChanges} />
            </>
          ) : (
            <>
              <h1>{editedTitle}</h1>
              <IconPencil stroke={2} onClick={handleEditIconClick} />
            </>
          )}
        </div>
        <Button {...closeButtonProps} />
      </div>
      <div className={styles.sendForm}>
        <TextInput
          label="Заголовок"
          withAsterisk
          placeholder="Введите заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextEditor />
        <Button
          label={t("components.case.AddCase")}
          color="success"
          fullWidth
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.solutions}>
          {t("components.case.ExistingSolutions")}
        </h1>
        {/* {CASES.map((item) => (
          <div key={item.id} className={styles.item}>
            <h1>
              {item.title} #{item.id}
            </h1>
            <p>{item.desc}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export { OverflowContent };
