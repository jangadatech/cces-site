import { theme } from '@/themes';
import { PaletteOptions, createTheme } from '@mui/material/styles';


interface CustomPaletteOptions extends PaletteOptions {
    neutral?: {
      100: string;
      200: string;
      350: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      alt: string;
    };
  }

const customTheme = createTheme({
  palette: {
    primary: {
      "100": theme.colors.dark_100,
      "200": theme.colors.dark_200,
      "300": theme.colors.dark_300,
      "400": theme.colors.dark_400,
      "500": theme.colors.dark_500,
      "600": theme.colors.dark_600,
      light: theme.colors.dark_100,
      main: theme.colors.dark_300,
      dark: theme.colors.dark_600,
    },
    info: {
      "100": theme.colors.primary_100,
      "200": theme.colors.primary_200,
      "300": theme.colors.primary_300,
      "400": theme.colors.primary_400,
      "500": theme.colors.primary_500,
      "600": theme.colors.primary_600,
      "700": theme.colors.primary_700,
      light: theme.colors.primary_100,
      main: theme.colors.primary_500,
      dark: theme.colors.primary_700,
    },
    secondary: {
      "100": theme.colors.secondary_100,
      "200": theme.colors.secondary_200,
      "300": theme.colors.secondary_300,
      "400": theme.colors.secondary_400,
      "500": theme.colors.secondary_500,
      "600": theme.colors.secondary_600,
      "700": theme.colors.secondary_700,
      main: theme.colors.secondary_300,
      light: theme.colors.secondary_100,
      dark: theme.colors.secondary_700,
    },
    error: {
      main: theme.colors.danger
    },
    grey: {
      "100": theme.colors.neutral_100,
      "200": theme.colors.neutral_200,
      "300": theme.colors.neutral_300,
      "400": theme.colors.neutral_400,
      "500": theme.colors.neutral_500,
      "600": theme.colors.neutral_600,
    },
    success: {
      main: theme.colors.success
    },
    background: {
      default: theme.colors.neutral_100,
      paper: theme.colors.neutral_100,
    }
    
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  },
});

export default customTheme;
