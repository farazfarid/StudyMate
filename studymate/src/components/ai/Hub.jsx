import {
  BookOpenText,
  FileText,
  Globe2,
  MessagesSquare,
  Shuffle,
} from "lucide-react";
import { Link } from "react-router-dom";

function Hub() {
  return (
    <div className="text-text p-10">
      <div className="mb-10">
        <h1 class="heroHeadText">AI Hub</h1>
        <h3 className="sectionHeadTextOutline">Welcome to the AI Hub!</h3>
        <p className="sectionSubText">Select an AI tool to get started.</p>
      </div>
      <div class="nav-container">
        <Link
          to="/ai-hub/content-writer"
          class="nav-item bg-white/10 rounded-md"
        >
          <p class="flex text-xl font-semibold">
            <FileText className="mx-2" />
            AI Content Writer
          </p>
        </Link>

        <Link to="/ai-hub/summariser" class="nav-item bg-white/10 rounded-md">
          <p class="flex text-xl font-semibold">
            <BookOpenText className="mx-2" />
            AI Summariser
          </p>
        </Link>

        <Link
          to="/ai-hub/chat"
          class="nav-item bg-white/10 rounded-md col-span-2"
        >
          <p class="flex text-xl font-semibold">
            <MessagesSquare className="mx-2" />
            AI Chat
          </p>
        </Link>

        <Link to="/ai-hub/paraphraser" class="nav-item bg-white/10 rounded-md">
          <p class="flex text-xl font-semibold">
            <Shuffle className="mx-2" />
            AI Paraphraser
          </p>
        </Link>

        <Link to="/ai-hub/translator" class="nav-item bg-white/10 rounded-md">
          <p class="flex text-xl font-semibold">
            <Globe2 className="mx-2" />
            AI Translator
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Hub;
