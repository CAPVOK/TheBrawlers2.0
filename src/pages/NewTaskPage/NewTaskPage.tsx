import { TextInput, Title, Container, Button, Textarea } from "@mantine/core";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { addNewTask } from "../../core/task/layer";

export const NewTaskPage = () => {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleAddTask = () => {
    addNewTask({
      title: title,
      description: description,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <p className={styles.title}>The Brawlers 2.0</p>
      </nav>

      <Container size={600} my={60}>
        <Title ta="center" className={styles.title}>
          {t("components.task.AddTask")}
        </Title>
        <TextInput
          label={t("common.Heading")}
          withAsterisk
          placeholder={t("common.AddText")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          label={t("common.Description")}
          withAsterisk
          placeholder={t("common.AddText")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autosize
          minRows={3}
          maxRows={6}
        />
        <div className={styles.margins}>
          <Button
            color="green"
            fullWidth
            onClick={() => handleAddTask()}
            variant="filled"
          >
            {t("common.Save")}
          </Button>
        </div>
      </Container>
    </div>
  );
};
