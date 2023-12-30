import { ArrowUpSquare } from "lucide-react";
import React, { useState } from "react";
import Avatar from "react-avatar";

import { translateMessage } from "../../util/aitranslate";

function AITranslator() {
  const [prompt, setPrompt] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    const response = await translateMessage(
      prompt,
      sourceLanguage,
      targetLanguage
    );
    setMessages([
      ...messages,
      { text: prompt, sourceLanguage, isUser: true },
      { text: response, targetLanguage, isUser: false },
    ]);
    setPrompt("");
    setSourceLanguage("");
    setTargetLanguage("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10">
      <div>
        <h1 className="heroHeadText">AI Translator</h1>
        <p className="heroSubText">
          Translate any text whether it be in ancient old or modern language!
        </p>
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
                  {messages.isUser ? (
                    <span className="text-xs">{messages.sourceLanguage}</span>
                  ) : (
                    <span className="text-xs">{messages.targetLanguage}</span>
                  )}
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

        <div className="p-4">
          <input
            className="w-full bg-transparent text-text border-gray-300 border-2 rounded-md p-2 pr-12 mt-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-100 dark:border-gray-800 dark:hover:border-gray-950 dark:focus:border-transparent"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="Type your text..."
          />
          <div className="flex justify-center items-center">
            <input
              className="w-1/3 bg-transparent text-text border-gray-300 border-2 rounded-md p-2 mx-1 my-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-100 dark:border-gray-800 dark:hover:border-gray-950 dark:focus:border-transparent"
              type="text"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              placeholder="Source Language…"
            />
            <input
              className="w-1/3 bg-transparent text-text border-gray-300 border-2 rounded-md p-2 mx-1 my-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-100 dark:border-gray-800 dark:hover:border-gray-950 dark:focus:border-transparent"
              type="text"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              placeholder="Target Language…"
            />
          </div>
          <button
            className="flex text-text disabled:cursor-not-allowed hover:scale-105 transition-transform p-4 border justify-center items-center rounded-md w-full bg-primary"
            onClick={handleSendMessage}
            disabled={!prompt || !sourceLanguage || !targetLanguage}
          >
            <ArrowUpSquare className="w-6 h-6 text-text" />{" "}
            <p className="ml-2">Translate</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AITranslator;
