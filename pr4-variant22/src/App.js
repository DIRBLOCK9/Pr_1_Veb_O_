import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SensorsPage from "./pages/SensorsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  const [apiUrl, setApiUrl] = useState(
    localStorage.getItem("apiUrl") || "https://jsonplaceholder.typicode.com/posts/1"
  );
  const [pollIntervalMs, setPollIntervalMs] = useState(
    Number(localStorage.getItem("pollIntervalMs")) || 5000
  );

  useEffect(() => {
    localStorage.setItem("apiUrl", apiUrl);
    localStorage.setItem("pollIntervalMs", String(pollIntervalMs));
  }, [apiUrl, pollIntervalMs]);

  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/sensors"
            element={<SensorsPage apiUrl={apiUrl} pollIntervalMs={pollIntervalMs} />}
          />
          <Route
            path="/settings"
            element={
              <SettingsPage
                apiUrl={apiUrl}
                pollIntervalMs={pollIntervalMs}
                onSave={(nextUrl, nextInterval) => {
                  setApiUrl(nextUrl);
                  setPollIntervalMs(nextInterval);
                }}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
