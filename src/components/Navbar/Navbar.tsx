import { useTranslation } from "react-i18next";
import { toggleLanguage } from "../../app/i18n";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../UI";
import styles from "./styles.module.css";
import { logoutUser } from "../../core/auth/layer";

const Navbar = () => {
  const { t } = useTranslation();
  const { toggleThemeMode } = useTheme();
  return (
    <nav className={styles.nav}>
      <p>{t("Navbar")}</p>
      <Button onClick={toggleLanguage} label={t("common.ChangeLanguage")} />
      <Button
        onClick={toggleThemeMode}
        color="tertiary"
        label={t("common.ChangeTheme")}
      />
      <Button onClick={logoutUser} label={t("common.Logout")} color="error" />
    </nav>
  );
};

export default Navbar;
