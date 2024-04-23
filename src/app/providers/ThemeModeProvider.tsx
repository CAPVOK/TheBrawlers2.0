import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const StorageKey = "features-color-theme-mode";

/**
 * Возможные темы приложения описанные в App.css
 */
const supportedThemeModes = {
  light: "light",
  dark: "dark",
};

type ThemeModeType = keyof typeof supportedThemeModes;

const getTheme = (): ThemeModeType => {
  const theme = localStorage.getItem(StorageKey);
  if (theme && Object.values(supportedThemeModes).includes(theme)) {
    return theme as ThemeModeType;
  } else {
    localStorage.setItem(StorageKey, "light");
    return "light";
  }
};

export const ThemeContext = createContext<{
  themeMode: ThemeModeType;
  setThemeMode: (theme: ThemeModeType) => void;
  supportedThemeModes: typeof supportedThemeModes;
  toggleThemeMode: () => void;
}>({
  themeMode: "light",
  setThemeMode: () => {},
  supportedThemeModes,
  toggleThemeMode: () => {},
});

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeModeType>(getTheme);

  const setThemeMode = useCallback((theme: ThemeModeType) => {
    localStorage.setItem(StorageKey, theme);
    setThemeModeState(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleThemeMode = useCallback(() => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  }, [themeMode, setThemeMode]);

  const contextValue = useMemo(
    () => ({ themeMode, setThemeMode, supportedThemeModes, toggleThemeMode }),
    [themeMode, setThemeMode, toggleThemeMode]
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
