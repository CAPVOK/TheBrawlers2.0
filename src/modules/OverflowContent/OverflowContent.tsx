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
import { ICase } from "../../core/case/types";
import { useDisclosure } from "@mantine/hooks";

function OverflowContent() {
  const { t } = useTranslation();
  const { activeCluster, clusters, closeCluster } = useClusters();
  const { closeCase } = useCases();
  const [heading, setHeading] = useState("");
  const [headingEditing, setHeadingEditing] = useState("");
  const [solution, setSolution] = useState("");
  const [solutionEditing, setSolutionEditing] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [casesData, setCasesData] = useState<ICase[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (activeCluster !== -1) {
      getCasesByCluster(activeCluster).then((data) => {
        if (data) {
          setCasesData(data);
        }
      });
    }
  }, [activeCluster]);

  useEffect(() => {
    const clusterData = [...clusters].find(
      (cluster) => cluster.id === activeCluster
    );
    if (clusterData) {
      setEditedTitle(clusterData.name);
    }
  }, [activeCluster, clusters]);

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

  const handleEditCase = (caseId: number) => {
    updateCase({
      caseId: caseId,
      title: headingEditing,
      solution: solutionEditing,
    }).then(() => {
      if (activeCluster !== -1) {
        getCasesByCluster(activeCluster).then((data) => {
          if (data) {
            setCasesData(data);
          }
        });
      }
    });
    setSolutionEditing("");
    setHeadingEditing("");
  };

  const handleDeleteCase = (caseId: number) => {
    deleteCase(caseId).then(() => {
      if (activeCluster !== -1) {
        getCasesByCluster(activeCluster).then((data) => {
          if (data) {
            setCasesData(data);
          }
        });
      }
    });
  };

  const handleAddCase = () => {
    createCaseToCluster({
      clusterId: activeCluster,
      title: heading,
      solution: solution,
    }).then(() => {
      if (activeCluster !== -1) {
        getCasesByCluster(activeCluster).then((data) => {
          if (data) {
            setCasesData(data);
          }
        });
      }
      setSolution("");
      setHeading("");
    });
  };

  if (activeCluster === -1) {
    return <div className={styles.nodata}>{t("pages.noClusters")}</div>;
  }

  return (
    <div className={styles.overflow}>
      {activeCluster ? (
        <div className={styles.content}>
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
                  <IconCheck
                    stroke={2}
                    onClick={handleSaveChanges}
                    style={{ cursor: "pointer" }}
                  />
                  <IconX
                    stroke={2}
                    onClick={handleCancelChanges}
                    style={{ cursor: "pointer" }}
                  />
                </>
              ) : (
                <>
                  <h1>{editedTitle}</h1>
                  <IconPencil
                    stroke={2}
                    onClick={handleEditIconClick}
                    style={{ cursor: "pointer" }}
                  />
                </>
              )}
            </div>
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
                    <IconPencil
                      stroke={2}
                      onClick={open}
                      style={{ cursor: "pointer" }}
                    />
                    <IconTrash
                      stroke={2}
                      onClick={() => handleDeleteCase(item.id)}
                      style={{ cursor: "pointer" }}
                    />
                    <Modal
                      opened={opened}
                      onClose={close}
                      title={t("common.Edit")}
                      centered
                    >
                      <TextInput
                        label={t("common.Heading")}
                        withAsterisk
                        placeholder={t("common.AddText")}
                        value={headingEditing}
                        onChange={(e) => setHeadingEditing(e.target.value)}
                      />
                      <Textarea
                        label={t("components.case.Solution")}
                        withAsterisk
                        placeholder={t("components.case.AddSolutionText")}
                        value={solutionEditing}
                        onChange={(e) => setSolutionEditing(e.target.value)}
                        autosize
                        minRows={3}
                        maxRows={6}
                      />
                      <div className={styles.margins}>
                        <Button
                          label={t("components.case.AddCase")}
                          color="success"
                          fullWidth
                          onClick={() => handleEditCase(item.id)}
                        />
                      </div>
                    </Modal>
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

export { OverflowContent };
