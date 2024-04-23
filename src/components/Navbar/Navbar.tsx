import { useTranslation } from "react-i18next";
import { toggleLanguage } from "../../app/i18n";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../UI";
import styles from "./styles.module.css";

const Navbar = () => {
  const { t } = useTranslation();
  const { toggleThemeMode } = useTheme();
  return (
    <nav className={styles.nav}>
      <p>{t("Navbar")}</p>
      <Button onClick={toggleLanguage} label="change language" />
      <Button onClick={toggleThemeMode} color="tertiary" label="change theme" />
    </nav>
  );
};

export default Navbar;
