import { ArrowUpSquare } from "lucide-react";
import React, { useState } from "react";
import Avatar from "react-avatar";

import { sendMessage } from "../../openai";

function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    const response = await sendMessage(prompt);
    setMessages([
      ...messages,
      { text: prompt, isUser: true },
      { text: response, isUser: false },
    ]);
    setPrompt("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10">
      <div>
        <h1 className="heroHeadText">Your StudyMate</h1>
        <p className="heroSubText">Chat with AI about anything!</p>
      </div>
      <div className="flex flex-col flex-grow w-full max-w-xl overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {messages.map((messages, index) => (
            <div
              key={index}
              className={`flex w-full mt-2 space-x-3 max-w-xs ${
                messages.isUser
                  ? "ml-auto justify-end flex-row"
                  : "flex-row-reverse"
              }`}
            >
              <div>
                <div
                  className={`${
                    messages.isUser ? "bg-primary" : "bg-secondary"
                  } text-white m-2 p-3 rounded-l-lg rounded-br-lg`}
                >
                  <p className="text-sm">{messages.text}</p>
                </div>
              </div>
              <div className="flex-shrink-0 h-10 w-10 rounded-full">
                {messages.isUser ? (
                  <Avatar name="M E" color="blue" size="40" round={true} />
                ) : (
                  <Avatar name="A I" color="red" size="40" round={true} />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="relative p-4">
          <input
            className="w-full bg-transparent text-text border-gray-300 border-2 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-100 dark:border-gray-800 dark:hover:border-gray-950 dark:focus:border-transparent"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="Type your message…"
          />
          <button
            className="absolute top-[1.8rem] right-7 text-text disabled:cursor-not-allowed hover:scale-105 transition-transform"
            onClick={handleSendMessage}
            disabled={!prompt}
          >
            <ArrowUpSquare className="w-6 h-6 text-text" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChat;
