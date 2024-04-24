export interface ITask {
  id: number;
  title: string;
  description: string;
  created_at: string;
  status?: TaskStatusEnum;
  cluster?: number;
  email?: string;
}

export enum TaskStatusEnum {
  Draft,
  InProgress,
  Completed,
}

export interface IGetTasksResponse {
  tasks?: ITask[];
}


