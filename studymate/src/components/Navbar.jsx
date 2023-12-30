import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  CalendarRange,
  GraduationCap,
  Home,
  ListTodo,
  Mail,
  Menu,
  MessagesSquare,
  PenTool,
  StickyNote,
} from "lucide-react";

const Navbar = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const navItems = [
    { title: "Home", icon: <Home className="h-8 w-8" />, to: "/" },
    {
      title: "Whiteboard",
      icon: <PenTool className="h-8 w-8" />,
      to: "/whiteboard",
    },
    {
      title: "ToDo-List",
      icon: <ListTodo className="h-8 w-8" />,
      to: "/todo",
    },
    {
      title: "TimeTable",
      icon: <CalendarRange className="h-8 w-8" />,
      to: "/timetable",
    },
    {
      title: "AI Hub",
      icon: <BrainCircuit className="h-8 w-8" />,
      to: "/ai-hub",
    },
    {
      /* DB Zugverbindungen - Aktuelle Zeit zur Uni
        https://developers.deutschebahn.com/db-api-marketplace/apis/product/timetables
      */
    },
  ];

  const handleMenuItemClick = () => {
    setNavbarOpen(false);
  };

  return (
    <div className="fixed left-0 top-3 h-full max-w-xs">
      <div
        className="cursor-pointer p-2 self-start"
        onClick={() => setNavbarOpen(!isNavbarOpen)}
      >
        <div className="p-2 rounded-md">
          <Menu className="h-8 w-8" />
        </div>
      </div>

      {isNavbarOpen && (
        <div className="h-full backdrop-blur-3xl p-4 mt-2 rounded-r-md transition-transform duration-300">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="flex items-center my-2 cursor-pointer transition-opacity duration-300 transform hover:scale-110 hover:drop-shadow-glow"
              onClick={handleMenuItemClick}
            >
              <div className="mr-2">{item.icon}</div>
              <div className={`opacity-0 ${isNavbarOpen ? "opacity-100" : ""}`}>
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
