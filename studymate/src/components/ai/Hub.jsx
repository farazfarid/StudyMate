import {
  BookOpenText,
  FileText,
  Globe2,
  MessagesSquare,
  Shuffle,
} from "lucide-react";
import React from "react";

function Hub() {
  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 class="heroHeadText">AI Hub</h1>
        <h3 className="sectionHeadTextOutline">Welcome to the AI Hub!</h3>
        <p className="sectionSubText">Select an AI tool to get started.</p>
      </div>
      <div class="nav-container">
        <a
          href="/ai-hub/content-writer"
          class="nav-item bg-white/10 rounded-md"
        >
          <p class="flex text-xl font-semibold">
            <FileText className="mx-2" />
            AI ContentWriter
          </p>
        </a>

        <a href="/ai-hub/summariser" class="nav-item bg-white/10 rounded-md">
          <p class="flex text-xl font-semibold">
            <BookOpenText className="mx-2" />
            AI Summariser
          </p>
        </a>

        <a
          href="/ai-hub/chat"
          class="nav-item bg-white/10 rounded-md col-span-2"
        >
          <p class="flex text-xl font-semibold">
            <MessagesSquare className="mx-2" />
            AI Chat
          </p>
        </a>

        <a href="/ai-hub/paraphraser" class="nav-item bg-white/10 rounded-md">
          <p class="flex text-xl font-semibold">
            <Shuffle className="mx-2" />
            AI Paraphraser
          </p>
        </a>

        <a href="/ai-hub/translator" class="nav-item bg-white/10 rounded-md">
          <p class="flex text-xl font-semibold">
            <Globe2 className="mx-2" />
            AI Translator
          </p>
        </a>
      </div>
    </div>
  );
}

export default Hub;
