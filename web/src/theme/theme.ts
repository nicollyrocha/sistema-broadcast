import { createTheme } from "@mui/material/styles";

/**
 * Tema MUI alinhado aos tokens do Tailwind (styles/index.css).
 * Ajustes finos por componente ficam no `className` (Tailwind sobrescreve o MUI via @layer).
 */
const zinc = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b",
};

export const theme = createTheme({
  palette: {
    primary: { main: "#ff5a1f", dark: "#ed4210", light: "#ff7d45", contrastText: "#fff" },
    secondary: { main: zinc[900], contrastText: "#fff" },
    error: { main: "#dc2626" },
    success: { main: "#059669" },
    info: { main: "#0284c7" },
    warning: { main: "#d97706" },
    grey: zinc,
    text: { primary: zinc[900], secondary: zinc[500] },
    divider: zinc[200],
    background: { default: zinc[50], paper: "#fff" },
  },
  typography: {
    fontFamily: '"Geist", ui-sans-serif, system-ui, sans-serif',
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, fontSize: 14, height: 36, paddingInline: 14, gap: 8 },
        sizeSmall: { height: 32, fontSize: 13, paddingInline: 10 },
        sizeLarge: { height: 44, fontSize: 15, borderRadius: 12, paddingInline: 20 },
        startIcon: { margin: 0 },
        endIcon: { margin: 0 },
        outlined: { borderColor: zinc[200], color: zinc[800], backgroundColor: "#fff", "&:hover": { borderColor: zinc[300], backgroundColor: zinc[50] } },
      },
    },
    MuiIconButton: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiTextField: { defaultProps: { size: "small", fullWidth: true } },

    /* Campos: rótulo fixo ACIMA do campo (sem o label flutuante do Material) */
    MuiInputLabel: {
      defaultProps: { shrink: true },
      styleOverrides: {
        root: {
          position: "relative",
          transform: "none",
          marginBottom: 6,
          fontSize: 13,
          fontWeight: 500,
          lineHeight: 1.4,
          color: zinc[700],
          "&.Mui-focused": { color: zinc[700] },
          "&.Mui-error": { color: "#dc2626" },
        },
        asterisk: { color: "#dc2626" },
      },
    },
    MuiOutlinedInput: {
      defaultProps: { notched: false },
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#fff",
          fontSize: 14,
          boxShadow: "0 1px 2px rgb(0 0 0 / 0.04)",
          transition: "box-shadow .15s",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: zinc[200], transition: "border-color .15s" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: zinc[300] },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderWidth: 1, borderColor: "#ff7d45" },
          "&.Mui-focused": { boxShadow: "0 0 0 4px rgb(255 90 31 / 0.12)" },
        },
        input: { "&::placeholder": { color: zinc[400], opacity: 1 } },
        sizeSmall: { "&:not(.MuiInputBase-multiline) .MuiOutlinedInput-input": { paddingBlock: 9 } },
      },
    },
    MuiFormHelperText: { styleOverrides: { root: { marginInline: 0, marginTop: 6, fontSize: 12, color: zinc[500] } } },
    MuiSelect: { defaultProps: { MenuProps: { slotProps: { paper: { sx: { mt: 0.5, borderRadius: 2, boxShadow: "0 12px 32px -12px rgb(0 0 0 / .18)" } } } } } },

    MuiCheckbox: {
      defaultProps: { size: "small" },
      styleOverrides: { root: { color: zinc[300], padding: 6, "&:hover": { backgroundColor: "transparent" } } },
    },

    /* Switch estilo iOS */
    MuiSwitch: {
      styleOverrides: {
        root: { width: 40, height: 24, padding: 0, overflow: "visible" },
        switchBase: {
          padding: 2,
          "&:hover": { backgroundColor: "transparent" },
          "&.Mui-checked": { transform: "translateX(16px)", color: "#fff" },
          "&.Mui-checked + .MuiSwitch-track": { backgroundColor: "#ff5a1f", opacity: 1 },
          "&.Mui-checked:hover": { backgroundColor: "transparent" },
        },
        thumb: { width: 20, height: 20, boxShadow: "0 1px 3px rgb(0 0 0 / .2)" },
        track: { borderRadius: 12, backgroundColor: zinc[200], opacity: 1 },
      },
    },

    MuiCard: { defaultProps: { variant: "outlined" }, styleOverrides: { root: { borderRadius: 14, borderColor: zinc[200], boxShadow: "0 1px 2px rgb(0 0 0 / 0.04)" } } },
    MuiPaper: { styleOverrides: { outlined: { borderColor: zinc[200] } } },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500, fontSize: 12, borderRadius: 6 },
        sizeSmall: { height: 24 },
        label: { ".MuiChip-sizeSmall > &": { paddingInline: 8 } },
        icon: { ".MuiChip-sizeSmall > &": { marginLeft: 6, marginRight: -2 } },
        outlined: { borderColor: zinc[200] },
      },
    },
    MuiAvatar: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiTab: { styleOverrides: { root: { textTransform: "none", fontWeight: 500, minHeight: 40 } } },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: zinc[100], fontSize: 14, paddingBlock: 12 },
        head: { fontSize: 12, fontWeight: 500, color: zinc[500], textTransform: "uppercase", letterSpacing: "0.04em", backgroundColor: zinc[50] },
      },
    },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 16 } } },
    MuiTooltip: { defaultProps: { arrow: true } },
  },
});
