import { useEffect } from "react";
import { useClusters } from "../../store/clasterSlice";
import styles from "./styles.module.css";
import { useCases } from "../../store/casesSlice";
import { useTranslation } from "react-i18next";
import ClusterItem from "../../components/ClusterItem/ClusterItem";
import { getClusters } from "../../core/cluster/layer";

function ClusterBar() {
  const { t } = useTranslation();
  const { activeCluster, changeActiveCluster, clusters } = useClusters();
  // const [clustersData, setClustersData] = useState<ICluster[]>([]);
  const { closeCase } = useCases();

  /* useEffect(() => {
    const timer = setTimeout(() => {
      updateClusters(
        CLUSTERS.slice().sort((a, b) => b.frequency - a.frequency)
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [updateClusters]); */

  const clustersData = [...clusters];

  useEffect(() => {
    getClusters();
  }, []);

  const hadleClusterClick = (id: number) => {
    changeActiveCluster(id);
    closeCase();
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>{t("components.cluster.clusters")}</h2>
      <div className={styles["scroll-block"]}>
        <div className={styles.content}>
          {clustersData.map((item) => (
            <ClusterItem
              key={item.id}
              title={item.name}
              clickHandler={() => hadleClusterClick(item.id)}
              isActive={activeCluster === item.id}
              frequency={item.frequency}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { ClusterBar };
