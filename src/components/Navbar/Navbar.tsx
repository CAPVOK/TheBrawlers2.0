import { useTranslation } from "react-i18next";
import { toggleLanguage } from "../../app/i18n";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../UI";
import styles from "./styles.module.css";
import { logoutUser } from "../../core/auth/layer";
import { RoutesEnum } from "../../app/routes";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const Navbar = () => {
  const { t } = useTranslation();
  const { toggleThemeMode } = useTheme();
  const [opened, { toggle }] = useDisclosure();

  const { pathname } = useLocation();

  const toggleMenu = () => {
    toggle();
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSection}>
        <p className={styles.title}>The Brawlers 2.0</p>
        <Link to={RoutesEnum.Home}>
          <p
            className={clsx(styles["navbar-link"], {
              [styles.active]: pathname === RoutesEnum.Home,
            })}
          >
            {t("common.Home")}
          </p>
        </Link>
        <Link to={RoutesEnum.Stack}>
          <p
            className={clsx(styles["navbar-link"], {
              [styles.active]: pathname === RoutesEnum.Stack,
            })}
          >
            {t("components.cluster.clusters")}
          </p>
        </Link>
      </div>
      <div className={styles.menu}>
        <Burger
          opened={opened}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          color="var(--clr-on-surface)"
        />
        <div className={clsx(styles.menuItems, { [styles.show]: opened })}>
          <Button onClick={toggleLanguage} label={t("common.ChangeLanguage")} />
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
