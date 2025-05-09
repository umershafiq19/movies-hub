import { ThemeProvider } from '@/context/ThemeContext';
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

export default function App({ Component, pageProps }) {
  const { darkMode } = useTheme();
  const theme = createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } });

  return (
    <ThemeProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </ThemeProvider>
  );
}
