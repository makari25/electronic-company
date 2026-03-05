import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Sidebar({ setSection, activeSection, isOpen, setIsOpen }) {
  const [isAccountOpen, setIsAccountOpen] = useState(true);

  const getBtnStyle = (id) => `
    w-full text-left px-3 py-2 rounded-md transition-colors duration-200 flex items-center gap-2
    ${activeSection === id ? "bg-indigo-800 font-bold" : "hover:bg-indigo-600/50"}
  `;

  const handleNavClick = (sectionId) => {
    setSection(sectionId);
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full bg-indigo-700 text-white
          w-64 p-4 flex flex-col shadow-xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-6 mt-2">
           <h2 className="text-xl font-bold">Menu</h2>
           {/* Close button for mobile inside sidebar */}
           <button onClick={() => setIsOpen(false)} className="md:hidden p-1 hover:bg-indigo-600 rounded">
             {/* X icon can go here if you want, but we keep it clean */}
           </button>
        </div>

        {/* My Account Dropdown */}
        <div className="mb-2">
          <button
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            className="flex items-center justify-between w-full font-semibold px-2 py-2 hover:bg-indigo-600 rounded-md"
          >
            My Account
            {isAccountOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {isAccountOpen && (
            <div className="mt-1 ml-4 flex flex-col space-y-1 border-l border-indigo-500 pl-2">
              <button onClick={() => handleNavClick("calendar")} className={getBtnStyle("calendar")}>Calendar</button>
              <button onClick={() => handleNavClick("card")} className={getBtnStyle("card")}>My Card</button>
              <button onClick={() => handleNavClick("notifications")} className={getBtnStyle("notifications")}>Notifications</button>
            </div>
          )}
        </div>

        <hr className="my-4 border-indigo-500" />

        {/* Main Navigation */}
        <nav className="flex flex-col space-y-2 flex-grow">
          <button onClick={() => handleNavClick("update")} className={getBtnStyle("update")}>Update Account</button>
          <button onClick={() => handleNavClick("products")} className={getBtnStyle("products")}>Products</button>
          <button onClick={() => handleNavClick("profile")} className={getBtnStyle("profile")}>Profile</button>
          <button onClick={() => handleNavClick("messages")} className={getBtnStyle("messages")}>Messages</button>
          <button onClick={() => handleNavClick("contact")} className={getBtnStyle("contact")}>Contact Us</button>
        </nav>
      </aside>
    </>
  );
}