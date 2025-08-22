import {
  AppBar,
  Box,
  ButtonBase,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import "./App.css";
import QSandboxLogoLight from "./assets/images/q-sandbox-dark.png";
import QSandboxLogoDark from "./assets/images/q-sandbox-light.png";
import InfoIcon from "@mui/icons-material/Info";
import {
  DarkModeIcon,
  LightModeIcon,
  ThemeSelectRow,
} from "./components/Common-styles";
import { useThemeStore } from "./atoms/global";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useIframe } from "./hooks/useIframeListener";

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useIframe();

  const navItems = [
    { label: "Qortal Requests", path: "/", id: "/" },
    {
      label: "Framework",
      path: "/framework/default/getting-started-introduction",
      id: "/framework",
    },
    { label: "Tutorials", path: "/tutorials", id: "/tutorials" },
  ];

  const setTheme = useThemeStore((state) => state.setTheme);
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <div className="flex-row">         
            <div className="logo-container">
              <img
                className="logo"
                src={
                  theme.palette.mode === "dark"
                    ? QSandboxLogoDark
                    : QSandboxLogoLight
                }
                alt="q-sandbox-logo"
              />
              <Box
                sx={{
                  display: "flex",
                  marginLeft: "auto",
                  gap: "25px",
                  paddingRight: "25px",
                }}
              >
                {navItems.map(({ label, path, id }) => {
                  const isActive =
                    id === "/" && location.pathname === "/"
                      ? true
                      : id === "/"
                        ? false
                        : location.pathname?.includes(id);

                  return (
                    <ButtonBase
                      key={path}
                      onClick={() => navigate(path)}
                      sx={{
                        borderBottom: isActive
                          ? "2px solid"
                          : "2px solid transparent",
                        color: isActive
                          ? theme.palette.primary
                          : theme.palette.secondary,
                        "&:hover": {
                          borderBottom: "2px solid",
                          color: theme.palette.primary,
                        },
                        transition: "all 0.2s",
                        paddingBottom: "4px",
                      }}
                    >
                      <Typography>{label}</Typography>
                    </ButtonBase>
                  );
                })}
              </Box>
            </div>

            <Tooltip
              className="tooltip"
              title="Thanks for using Q-Sandbox! Please contact A-Test or Bester by Q-Mail if something does not seem to not work as expected. Thanks and happy coding!"
              arrow
              placement="bottom"
            >
              <InfoIcon className="info-icon" />
            </Tooltip>
          </div>
        </AppBar>
      </Box>

      <div className="container">
        <Outlet />
      </div>
    </Box>
  );
}
