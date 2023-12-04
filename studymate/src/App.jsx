import Home from "./components/hub/Home";
import Draw from "./components/notes/Draw";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  let [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`w-screen h-screen flex items-center justify-center flex-col bg-white-100 bg-opacity-80 dark:bg-slate-900 bg-hero-light dark:bg-hero-dark bg-cover bg-center`}
    >
      <Router>
        <div className="absolute right-8 top-8">
          <button
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            {darkMode ? (
              <SunIcon className="text-yellow-500 h-8 w-8" />
            ) : (
              <MoonIcon className="text-gray-200 h-8 w-8" />
            )}
          </button>
        </div>
        <div className="flex-1 py-4 px-2 my-4 mx-2 w-5/6 backdrop-blur-md border border-none rounded-3xl justify-center items-center">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/quickNote" element={<Draw />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
