import {
  LoginPage,
  MainPage,
  NotFoundPage,
  OverflowPage,
  RegisterPage,
} from "../../pages";
import AdminPage from "../../pages/AdminPage/AdminPage";
import { NewTaskPage } from "../../pages/NewTaskPage/NewTaskPage";
import { IAppRoute } from "./types";

/**
 * Маршруты приложения
 */
export enum RoutesEnum {
  Home = "/",
  Register = "/register",
  Login = "/login",
  Stack = "/stack_overflow",
  NewTask = "/new-task",
  Admin = "/admin",
}

/**
 * Массив объектов маршрутов приложения.
 * Каждый объект представляет собой маршрут приложения с различными свойствами.
 * @property {string} label - Название маршрута для отображения в боковой панели или навигационном меню.
 * @property {string} path - Путь к маршруту.
 * @property {boolean} [index] - Опция, указывающая, что это индексный маршрут (например, для домашней страницы).
 * @property {boolean} [isPrivate] - Опция, указывающая, что маршрут доступен только для авторизованных пользователей.
 * @property {JSX.Element} [icon] - Иконка, связанная с маршрутом.
 * @property {JSX.Element} element - React-компонент, который будет отображаться при переходе по этому маршруту.
 * @property {IAppRoute[]} [children] - Дочерние маршруты (если есть).
 */
export const routes: IAppRoute[] = [
  {
    path: RoutesEnum.Home,
    index: true,
    isPrivate: true,
    element: <MainPage />,
  },
  {
    isPrivate: true,
    path: RoutesEnum.Stack,
    element: <OverflowPage />,
  },
  {
    isPrivate: false,
    path: RoutesEnum.NewTask,
    element: <NewTaskPage />,
  },
  {
    isPrivate: false,
    path: RoutesEnum.Admin,
    element: <AdminPage />,
  },
  {
    path: RoutesEnum.Login,
    element: <LoginPage />,
  },
  {
    path: RoutesEnum.Register,
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
