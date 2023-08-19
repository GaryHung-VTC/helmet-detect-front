import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {
  ChakraProvider,
  extendTheme as chakraExtendTheme,
  useToast,
} from "@chakra-ui/react";

import {
  ThemeProvider as MaterialThemeProvider,
  createTheme as muiCreateTheme,
  THEME_ID,
} from "@mui/material/styles";

import useAuthStore from "../hooks/auth";

const materialTheme = muiCreateTheme();
const chakraTheme = chakraExtendTheme();

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
];

const DefaultLayout = () => {
  const isAuthenticated = useAuthStore(
    ({ isAuthenticated }) => isAuthenticated
  );

  return (
    <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <ChakraProvider theme={chakraTheme} resetCSS>
        <Header navItems={NAV_ITEMS} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </ChakraProvider>
    </MaterialThemeProvider>
  );
};

export default DefaultLayout;
