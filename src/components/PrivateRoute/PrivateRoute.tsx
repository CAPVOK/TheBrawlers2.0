import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/authSlice";
import { RoutesEnum } from "../../app/routes/routes";
import { FC, ReactNode } from "react";
import { USER_EMAIL_KEY } from "../../core/auth/layer";

export const PrivateRoute: FC<{ children?: ReactNode }> = ({ children }) => {
  const { isAuth, saveUser } = useAuth();

  if (!isAuth) {
    const email = localStorage.getItem(USER_EMAIL_KEY);
    if (email) {
      saveUser(email);
    } else {
      return <Navigate to={RoutesEnum.Login} />;
    }
  }

  return children || <Outlet />;
};