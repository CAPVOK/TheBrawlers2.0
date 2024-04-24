import { useEffect } from "react";
import { ICluster, useClusters } from "../../store/clasterSlice";
import styles from "./styles.module.css";
import { useCases } from "../../store/casesSlice";
import { useTranslation } from "react-i18next";
import { CLUSTERS } from "./Plug";
import ClusterItem from "../../components/ClusterItem/ClusterItem";

function ClusterBar() {
  const { t } = useTranslation();
  const { activeCluster, changeActiveCluster, clusters, updateClusters } =
    useClusters();
  const { closeCase } = useCases();

  /* useEffect(() => {
    const timer = setTimeout(() => {
      updateClusters(
        CLUSTERS.slice().sort((a, b) => b.frequency - a.frequency)
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [updateClusters]); */

  useEffect(() => {
    if (clusters.length > 0) {
      changeActiveCluster(clusters[0].id);
    }
  }, [changeActiveCluster, clusters]);

  function getStatus(cluster: ICluster): string {
    if (cluster.solved) {
      return t("components.cluster.status.solved");
    } else {
      return t("components.cluster.status.unsolved");
    }
  }

  const hadleClusterClick = (id: number) => {
    changeActiveCluster(id);
    closeCase();
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>{t("components.cluster.clusters")}</h2>
      <div className={styles["scroll-block"]}>
        <div className={styles.content}>
          {clusters.map((cluster) => (
            <ClusterItem
              key={cluster.id}
              title={cluster.title}
              clickHandler={() => hadleClusterClick(cluster.id)}
              isActive={activeCluster === cluster.id}
              statusTitle={getStatus(cluster)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { ClusterBar };