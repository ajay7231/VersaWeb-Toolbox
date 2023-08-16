import React, { useMemo, lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeOptions, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeMode, themeSettings } from "./theme";
import Loader from "./components/Loader";

// Use React.lazy() to create lazy-loaded components
const Textanalyzer = lazy(() => import("./pages/Textanalyzer"));
const Quotegenerator = lazy(() => import("./pages/Quotegenerator"));
const TaskManager = lazy(() => import("./pages/TaskManager"));

const App = () => {
  const mode = useSelector((state: { mode: ThemeMode }) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Textanalyzer />} />
            <Route path="/quote-generator" element={<Quotegenerator />} />
            <Route path="/task-manager" element={<TaskManager />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </div>
  );
};

export default App;
