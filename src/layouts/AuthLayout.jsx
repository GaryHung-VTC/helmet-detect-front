import { Outlet } from "react-router-dom";
import {
  ChakraProvider,
  extendTheme as chakraExtendTheme,
} from "@chakra-ui/react";

import {
  ThemeProvider as MaterialThemeProvider,
  createTheme as muiCreateTheme,
  THEME_ID,
} from "@mui/material/styles";

const chakraTheme = chakraExtendTheme();

const materialTheme = muiCreateTheme();

const AuthLayout = () => {
  return (
    <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <ChakraProvider theme={chakraTheme} resetCSS>
        <main>
          <Outlet />
        </main>
      </ChakraProvider>
    </MaterialThemeProvider>
  );
};

export default AuthLayout;
