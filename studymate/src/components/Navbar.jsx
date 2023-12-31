import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  Home,
  ListTodo,
  Menu,
  PenTool,
  TrainFrontTunnel,
} from "lucide-react";

const Navbar = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const navItems = [
    { title: "Home", icon: <Home className="text-text h-8 w-8" />, to: "/" },
    {
      title: "Directions",
      icon: <TrainFrontTunnel className="text-text h-8 w-8" />,
      to: "/directions",
    },
    {
      title: "ToDo-List",
      icon: <ListTodo className="text-text h-8 w-8" />,
      to: "/todo",
    },
    {
      title: "Whiteboard",
      icon: <PenTool className="text-text h-8 w-8" />,
      to: "/whiteboard",
    },
    {
      title: "AI Hub",
      icon: <BrainCircuit className="text-text h-8 w-8" />,
      to: "/ai-hub",
    },
  ];

  const handleMenuItemClick = () => {
    setNavbarOpen(false);
  };

  return (
    <div className="text-text fixed left-0 top-3 h-full max-w-xs">
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
          <div className="flex items-center justify-center">
            <Link
              to="https://www.farazfarid.me"
              className="my-96 cursor-pointer transition-opacity duration-300 transform hover:scale-110 hover:drop-shadow-glowWhite"
              onClick={handleMenuItemClick}
            >
              <div className="mr-2">
                <img
                  src="/logo.png"
                  alt="Fabian Faraz Farid | farazfarid.me"
                  className="logo text-text mt-32 ml-2 w-24"
                />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
