import { Link } from "react-router-dom";
import { toggleLanguage } from "../../app/i18n";
import { useTheme } from "../../hooks/useTheme";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import { RoutesEnum } from "../../app/routes";
import { logoutUser } from "../../core/auth/layer";
import { Button } from "../../components/UI";
import { Sidebar } from "../../modules/Sidebar/Sidebar";

export const MainPage = () => {
  const { t } = useTranslation();
  const { toggleThemeMode } = useTheme();
  return (
    <div className={styles.page}>
      <Sidebar />
      <div>
        <h1>Main Page</h1>
        <p>{t("common.PrivacyPolicy")}</p>
        <Button onClick={toggleLanguage} label="change language" />
        <Button
          onClick={toggleThemeMode}
          color="tertiary"
          label="change theme"
        />
        <Button onClick={logoutUser} label="logout" />
        <Link to={RoutesEnum.Stack}>To Some</Link>
      </div>
      <div>lkvdflk</div>
    </div>
  );
};
