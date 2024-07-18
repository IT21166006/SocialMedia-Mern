import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import ConHomePage from "scenes/homePage/Consultant";
import BusHomePage from "scenes/homePage/Business";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import ButtonBaseDemo from "scenes/widgets/skils";
import ConstProfilePage from "scenes/profilePage/Consultant";
import BusProfilePage from "scenes/profilePage/Business";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/constHome"
              element={isAuth ? <ConHomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/businessHome"
              element={isAuth ? <BusHomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/constprofile/:userId"
              element={isAuth ? <ConstProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/busprofile/:userId"
              element={isAuth ? <BusProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/skills"
              element={isAuth ? <ButtonBaseDemo /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
