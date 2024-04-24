import { ICase } from "../../store/casesSlice";
import { ICluster } from "../../store/clasterSlice";
import { ITask, TaskStatusEnum } from "../../store/tasksSlice";

export const TASKS: ITask[] = [
  {
    id: 0,
    title: "Не работает отправка уведомлений",
    desc: "",
    cluster: 1,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 1,
    title: "Не работает отправка оплата",
    desc: "",
    cluster: 2,
    email: "vova",
    status: TaskStatusEnum.InProgress,
  },
  {
    id: 2,
    title: "Не работает отправка жопа",
    desc: "",
    cluster: 3,
    email: "vova",
    status: TaskStatusEnum.InProgress,
  },
  {
    id: 3,
    title: "Не работает отправка уведомлений",
    desc: "",
    cluster: 4,
    status: TaskStatusEnum.InProgress,
  },
  {
    id: 4,
    title: "Не работает отправка оплата another user",
    desc: "",
    cluster: 1,
    email: "lala",
    status: TaskStatusEnum.InProgress,
  },
  {
    id: 5,
    title: "Не работает отправка жопа",
    desc: "",
    cluster: 2,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 6,
    title:
      "Не работает отправка уведомлений отправка уведомлений отправка уведомлений отправка уведомлений",
    desc: "",
    cluster: 3,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 7,
    title: "Не работает отправка оплата",
    desc: "",
    cluster: 4,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 8,
    title: "Не работает отправка жопа",
    desc: "",
    cluster: 1,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 9,
    title: "Не работает отправка уведомлений",
    desc: "",
    cluster: 2,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 10,
    title: "Не работает отправка оплата",
    desc: "",
    cluster: 3,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 11,
    title: "Не работает отправка жопа",
    desc: "",
    cluster: 4,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 12,
    title: "Не работает отправка оплата",
    desc: "",
    cluster: 1,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 13,
    title: "Не работает отправка жопа last",
    desc: "",
    cluster: 2,
    status: TaskStatusEnum.Draft,
  },
];

export const CLUSTERS: ICluster[] = [
  {
    id: 0,
    title: "Первый кластер",
    solved: true,
    caseId: 1,
    frequency: 100,
  },
  {
    id: 1,
    title: "Второй кластер",
    solved: false,
    frequency: 0,
  },
  {
    id: 2,
    title: "Третий кластер",
    solved: false,
    frequency: 0,
  },
  {
    id: 3,
    title: "Четвертый кластер",
    solved: true,
    caseId: 2,
    frequency: 50,
  },
  {
    id: 4,
    title: "Пятый кластер",
    solved: false,
    frequency: 0,
  },
  {
    id: 5,
    title: "Шестой кластер",
    solved: false,
    frequency: 0,
  },
  {
    id: 6,
    title: "Седьмой кластер",
    solved: false,
    frequency: 0,
  },
  {
    id: 7,
    title: "Восьмой кластер",
    solved: false,
    frequency: 0,
  },
  {
    id: 8,
    title: "Девятый кластер",
    solved: false,
    frequency: 0,
  },
  {
    id: 9,
    title: "Десятый кластер",
    solved: false,
    frequency: 0,
  },
];

export const CASES: ICase[] = [
  {
    id: 0,
    title: "Решение проблемы",
    desc: "Как же я пиздато решил проблему",
  },
  {
    id: 1,
    title: "Решение проблемы",
    desc: "Нет, это я ее пиздато решил",
  },
];
