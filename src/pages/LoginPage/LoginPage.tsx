import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../app/routes/routes";
import styles from "./styles.module.css";
import { loginUser } from "../../core/auth/layer";
import { Button, IButtonProps } from "../../components/UI";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const handleLoginClick = async () => {
    setIsBtnLoading(true);
    loginUser({ email: "vova", password: "vova" }).then(() =>
      navigate(RoutesEnum.Home)
    );
  };

  const loginButtonProps: IButtonProps = {
    label: t("common.Login"),
    isLoading: isBtnLoading,
    onClick: handleLoginClick,
  };

  return (
    <div className={styles.page}>
      <h1>LoginPage h1</h1>
      <p>LoginPage p</p>
      <Button {...loginButtonProps} />
      <Link to={RoutesEnum.Register}>To register</Link>
    </div>
  );
};
