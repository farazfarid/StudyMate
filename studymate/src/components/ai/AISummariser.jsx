import { ArrowUpSquare } from "lucide-react";
import React, { useState } from "react";

import { summariseText } from "../../util/aisummary";

function AISummariser() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    const response = await summariseText(prompt);
    setMessages([...messages, { text: response, isUser: false }]);
    setPrompt("");
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center justify-center w-[50rem] h-full p-10">
        <div>
          <h1 className="heroHeadText">AI Summariser</h1>
          <p className="heroSubText">Summarise any website or text!</p>
        </div>
        <div className="flex flex-col flex-grow w-full overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto w-full">
            {messages.map((messages, index) => (
              <div key={index} className={`flex w-full flex-row-reverse`}>
                <div>
                  <div
                    className={`bg-secondary text-white p-3 rounded-l-lg rounded-br-lg`}
                  >
                    <p className="text-sm">{messages.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative p-4">
            <textarea
              className="w-full bg-transparent text-text border-gray-300 border-2 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-100 dark:border-gray-800 dark:hover:border-gray-950 dark:focus:border-transparent"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your text..."
              rows="12"
              style={{ resize: "none" }}
            />
            <button
              className="flex text-text disabled:cursor-not-allowed hover:scale-105 transition-transform p-4 border justify-center items-center rounded-md w-full bg-primary"
              onClick={handleSendMessage}
              disabled={!prompt || !style}
            >
              <ArrowUpSquare className="w-6 h-6 text-text" />{" "}
              <p className="ml-2">Summarise</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AISummariser;
