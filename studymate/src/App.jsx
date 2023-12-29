import Home from "./components/hub/Home";
import Draw from "./components/notes/Draw";
import ToDo from "./components/notes/ToDo";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CookieConsent from "react-cookie-consent";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Navbar from "./components/Navbar";
import { Moon, Sun } from "lucide-react";
import RocketChat from "./components/uni/RocketChat";

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
      className={`w-screen h-screen flex items-center justify-center flex-col bg-white-100 bg-opacity-80 dark:bg-neutral-900 bg-hero-light dark:bg-hero-dark bg-cover bg-center transition ease-in-out duration-300`}
    >
      <Router>
        <div className="absolute left-6 top-8 z-50">
          <Navbar />
        </div>
        <div className="absolute right-6 top-8 z-50">
          <button
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            {darkMode ? (
              <Sun color="yellow" className="h-8 w-8 fill-yellow-200" />
            ) : (
              <Moon color="white" className="h-8 w-8 fill-white" />
            )}
          </button>
        </div>
        <div className="flex-1 py-4 px-2 my-4 mx-2 w-full md:w-5/6 backdrop-blur-md border border-none rounded-3xl justify-center items-center">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/whiteboard" element={<Draw />} />
            <Route exact path="/ToDo" element={<ToDo />} />
            <Route path="/rocketchat" element={<RocketChat />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </Router>

      <CookieConsent
        buttonText="I Understand"
        expires={365}
        style={{
          background: "#010101",
          color: "#fff",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          textShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          lineHeight: "24px",
          padding: "4px 2px",
          fontFamily: "sans-serif",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
        buttonStyle={{
          background: "#010101",
          color: "#fff",
          borderRadius: "6px",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          textShadow: "0 1px 1px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          lineHeight: "24px",
          fontFamily: "sans-serif",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        This website uses cookies to enhance the user experience.&nbsp;
        <br className="md:hidden" />
        <span style={{ fontSize: "10px" }}>
          See our{" "}
          <a href="/privacypolicy" className="underline">
            Privacy Policy
          </a>{" "}
          for more details.
        </span>
      </CookieConsent>
    </div>
  );
}
