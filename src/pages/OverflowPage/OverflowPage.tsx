import { Link } from "react-router-dom";
import { toggleLanguage } from "../../app/i18n";
import { RoutesEnum } from "../../app/routes";
import { useTheme } from "../../hooks/useTheme";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

export const OverflowPage = () => {
  const { t } = useTranslation();
  const { toggleThemeMode } = useTheme();
  return (
    <div className={styles.page}>
      <h1>Overflow Page</h1>
      <p>{t("common.PrivacyPolicy")}</p>
      <button onClick={toggleLanguage}>change Language</button>
      <button onClick={toggleThemeMode}>change theme</button>
      <Link to={RoutesEnum.Home}>To Main</Link>
    </div>
  );
};
