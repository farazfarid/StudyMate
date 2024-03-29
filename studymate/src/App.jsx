import Home from "./components/hub/Home";
import Draw from "./components/notes/Draw";
import ToDo from "./components/notes/ToDo";

import { useEffect, useState, Suspense } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

import CookieConsent from "react-cookie-consent";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Navbar from "./components/Navbar";
import { Moon, Sun } from "lucide-react";
import Hub from "./components/ai/Hub";
import AIChat from "./components/ai/AIChat";
import AIContentWriter from "./components/ai/AIContentWriter";
import AISummariser from "./components/ai/AISummariser";
import AIParaphraser from "./components/ai/AIParaphraser";
import AITranslator from "./components/ai/AITranslator";
import Directions from "./components/maps/Directions";

export default function App() {
  let [darkMode, setDarkMode] = useState(false);
  let [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (initialRender) {
      setInitialRender(false);
    }
  }, [darkMode, initialRender]);

  return (
    <div
      className={`w-screen h-screen flex items-center justify-center flex-col bg-white-100 bg-opacity-80 dark:bg-neutral-900 bg-hero-light dark:bg-hero-dark bg-cover bg-center transition ease-in-out duration-300 overflow-hidden`}
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
          <Suspense fallback={<div className="text-text">Loading...</div>}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/whiteboard" element={<Draw />} />
              <Route exact path="/todo" element={<ToDo />} />

              <Route path="/ai-hub" element={<Hub />} />
              <Route path="/ai-hub/chat" element={<AIChat />} />
              <Route
                path="/ai-hub/content-writer"
                element={<AIContentWriter />}
              />
              <Route path="/ai-hub/summariser" element={<AISummariser />} />
              <Route path="/ai-hub/paraphraser" element={<AIParaphraser />} />
              <Route path="/ai-hub/translator" element={<AITranslator />} />

              <Route path="/directions" element={<Directions />} />

              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            </Routes>
          </Suspense>
        </div>
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
            <Link to="/privacypolicy" className="underline">
              Privacy Policy
            </Link>{" "}
            for more details.
          </span>
        </CookieConsent>
      </Router>
    </div>
  );
}
