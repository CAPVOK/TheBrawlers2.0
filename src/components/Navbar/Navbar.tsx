import { useTranslation } from "react-i18next";
import { toggleLanguage } from "../../app/i18n";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../UI";
import styles from "./styles.module.css";
import { logoutUser } from "../../core/auth/layer";
import { NavLink } from "react-router-dom";
import { RoutesEnum } from "../../app/routes";

const Navbar = () => {
  const { t } = useTranslation();
  const { toggleThemeMode } = useTheme();
  return (
    <nav className={styles.nav}>
      <p className={styles.title}>The Brawlers2.0</p>
      <Button onClick={toggleLanguage} label={t("common.ChangeLanguage")} />
      <Button
        onClick={toggleThemeMode}
        color="tertiary"
        label={t("common.ChangeTheme")}
      />
      <Button onClick={logoutUser} label={t("common.Logout")} color="error" />
      <NavLink to={RoutesEnum.Stack}>
        <Button label={t("common.StackOverflow")} />
      </NavLink>
      <NavLink to={RoutesEnum.Home}>
        <Button label={t("common.Home")} />
      </NavLink>
    </nav>
  );
};

export default Navbar;
