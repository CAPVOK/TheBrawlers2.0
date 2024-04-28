import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { ISidebarComonProps } from "./typing";
import { SkeletonItem } from "../components";
import axios, { AxiosResponse } from "axios";

type ItemComponent<ItemType> = React.ComponentType<ItemType>;

function Sidebar<ItemType, DataType>(
  props: ISidebarComonProps<ItemType, DataType>
) {
  const {
    title,
    item,
    url,
    requestConfig,
    skeletons,
    debounce,
    rebaseFunction,
  } = props;

  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    const response: AxiosResponse<DataType[], unknown> = await axios.get(
      url,
      requestConfig
    );
    if (response.data) {
      setData(response.data);
    } else {
      setData([]);
    }
  };

  async function getTasksWithDebounce() {
    const loadingTimer = setTimeout(() => setIsLoading(true), debounce);
    getData().finally(() => {
      clearTimeout(loadingTimer);
      setIsLoading(false);
    });
  }

  async function getTasksWithoutDebounce() {
    setIsLoading(true);
    getData().finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    debounce ? getTasksWithDebounce() : getTasksWithoutDebounce();
    const intervalId = setInterval(() => {
      getData();
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items: JSX.Element[] = Array.from(
    { length: data.length },
    (_, index) => {
      const ItemComponentInstance = item as ItemComponent<ItemType>;
      return (
        <ItemComponentInstance key={index} {...rebaseFunction(data[index])} />
      );
    }
  );

  return (
    <div className={styles.sidebar}>
      {title && (
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
      <div className={styles["scroll-block"]}>
        <div className={styles.content}>
          {isLoading
            ? Array.from({ length: skeletons.length }).map((_, index) => (
                <SkeletonItem height={skeletons.height} key={index} />
              ))
            : !!data.length && items.map((item) => item)}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
