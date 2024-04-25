import { useTranslation } from "react-i18next";
import { toggleLanguage } from "../../app/i18n";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../UI";
import styles from "./styles.module.css";
import { logoutUser } from "../../core/auth/layer";
import { RoutesEnum } from "../../app/routes";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { t } = useTranslation();
  const { toggleThemeMode } = useTheme();
  const [opened, { toggle }] = useDisclosure();

  const toggleMenu = () => {
    toggle();
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSection}>
        <p className={styles.title}>The Brawlers2.0</p>
        <Link to={RoutesEnum.Home}>
          <Button label={t("common.Home")} />
        </Link>
        <Link to={RoutesEnum.Stack}>
          <Button label={t("common.StackOverflow")} />
        </Link>
      </div>
      <div className={styles.menu}>
        <Burger
          opened={opened}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        />
        <div className={`${styles.menuItems} ${opened ? styles.show : ''}`}>
          <Button
            onClick={toggleLanguage}
            label={t("common.ChangeLanguage")}
          />
          <Button
            onClick={toggleThemeMode}
            color="tertiary"
            label={t("common.ChangeTheme")}
          />
          <Button
            onClick={logoutUser}
            label={t("common.Logout")}
            color="error"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
