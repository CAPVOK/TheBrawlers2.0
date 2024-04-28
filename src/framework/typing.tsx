import { AxiosRequestConfig } from "axios";
import { ComponentType } from "react";

export interface ISidebarComonProps<ItemType, DataType> {
  skeletons: ISkeletonProps;
  title?: string;
  item: ComponentType<ItemType>;
  url: string;
  debounce?: number;
  rebaseFunction: (data: DataType) => ItemType;
  /* requestHeaders:  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestConfig?: AxiosRequestConfig<any>;
  onDataUpdateHandler?: (data: DataType[]) => void;
}

interface ISkeletonProps {
  length: number;
  height?: string;
}

export interface CustomApiResponse<T> {
  data: T;
}
