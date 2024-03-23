import { ThemeOptions, alpha, createTheme, getContrastRatio } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        spanBlock: true;
    }
}

interface ExtendedTypographyOptions extends TypographyOptions {
    spanBlock: React.CSSProperties;
}

export const mainTheme = createTheme({
    typography: {
        spanBlock: {
            display: 'inline'
        },
    } as ExtendedTypographyOptions,
    palette: {
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#fff',
            light: alpha('#fff', 0.5),
            dark: alpha('#fff', 0.9),
            contrastText: getContrastRatio('#fff', '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
} as ThemeOptions);

export const secondaryTheme = createTheme({
    palette: {
        primary: {
            main: '#808080',
        },
        secondary: {
            main: '#fb8627',
            light: alpha('#fb8627', 0.5),
            dark: alpha('#fb8627', 0.9),
            contrastText: getContrastRatio('#fb8627', '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
});