import { IUser } from "../auth/types";
import { ICase, ICluster } from "../case/types";

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatusEnum;
  created_at: string;
  formed_at?: string;
  completed_at?: string;
  case?: ICase;
  cluster: ICluster;
  user: IUser;
}

export enum TaskStatusEnum {
  Draft,
  InProgress,
  Completed,
}

export type GetTasksResponseType = ITask[] | null;
