import { ArrowUpSquare } from "lucide-react";
import React, { useState } from "react";
import Avatar from "react-avatar";

function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10">
      <div>
        <h1 className="heroHeadText">Your StudyMate</h1>
      </div>
      <div className="flex flex-col flex-grow w-full max-w-xl overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                <p className="text-sm">User Text example</p>
              </div>
            </div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
              <Avatar name="M E" size="40" round={true} />
            </div>
          </div>

          <div className="flex w-full mt-2 space-x-3 max-w-xs">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
              <Avatar name="A I" color="red" size="40" round={true} />
            </div>
            <div>
              <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p className="text-sm">Mate Text example</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-4">
          <input
            className="w-full bg-transparent text-text border-gray-300 border-2 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-100 dark:border-gray-800 dark:hover:border-gray-950 dark:focus:border-transparent"
            type="text"
            placeholder="Type your message…"
          />
          <button
            className="absolute top-[1.8rem] right-7 text-text"
            type="submit"
          >
            <ArrowUpSquare className="w-6 h-6 text-text" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChat;
