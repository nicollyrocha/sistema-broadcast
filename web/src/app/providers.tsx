import type { ReactNode } from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "@/contexts/AuthContext";
import { theme } from "@/theme/theme";

/**
 * MUI + Tailwind v4:
 * - enableCssLayer coloca os estilos do MUI em `@layer mui`;
 * - o GlobalStyles abaixo é o primeiro estilo injetado pelo Emotion e fixa a ordem das camadas:
 *   reset do Tailwind (base) < MUI < utilities do Tailwind.
 * Resultado: qualquer className do Tailwind sobrescreve o MUI, sem !important.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <ThemeProvider theme={theme}>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
