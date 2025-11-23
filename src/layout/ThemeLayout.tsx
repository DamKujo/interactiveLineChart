import { createContext, useContext, useEffect, useState } from "react";

const StorageKey = "features-color-theme";

const themesValue = {
  light: "light",
  dark: "dark",
};

export type Themes = keyof typeof themesValue;

const ThemeContext = createContext<
  | {
      theme: Themes;
      setTheme: (theme: Themes) => void;
      themesValue: { [key: string]: string };
    }
  | undefined
>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'You can use "useTheme" hook only within a <ThemeProvider> component.'
    );
  }

  return context;
};

const getTheme = (): Themes => {
  let theme = localStorage.getItem(StorageKey);

  if (!theme) {
    localStorage.setItem(StorageKey, "light");
    theme = "light";
  }

  return theme as Themes;
};

const ThemeLayout = (props: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Themes>(getTheme);

  useEffect(() => {
    localStorage.setItem(StorageKey, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themesValue,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export { useTheme };
export default ThemeLayout;
