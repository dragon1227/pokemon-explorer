import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme as useNextTheme } from "next-themes"
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState, type ReactNode } from 'react';


export default function Providers({ children }: { children: ReactNode }) {
  const { theme } = useNextTheme()
  const [darkMode, setDarkMode] = useState<boolean>(false)
  useEffect(() => {
    setDarkMode(theme === 'dark')
  }, [theme])

  const muiTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#0f2037" : "#EEEEEE",
        paper: darkMode ? "#1f2937" : "#EEEEEE",
      }
    },
  });
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
