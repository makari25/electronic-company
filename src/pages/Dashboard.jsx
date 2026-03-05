import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Calendar from "../sections/Calendar";
import MyCard from "../sections/MyCard";
import Notifications from "../sections/Notifications";
import UpdateAccount from "../sections/updateAccount";
import Products from "../sections/Products";
import Profile from "../sections/Profile";
import Messages from "../sections/Messages";
import Contact from "../sections/Contact";

export default function Dashboard({ 
  searchQuery, isSidebarOpen, setIsSidebarOpen, addToCart,
  activeSection, setActiveSection 
}) {
  
  // Render content based on the prop passed from App.jsx
  const renderContent = () => {
    switch (activeSection) {
      case "calendar": return <Calendar />;
      case "card": return <MyCard />;
      case "notifications": return <Notifications />;
      case "update": return <UpdateAccount />;
      case "products": return <Products searchQuery={searchQuery} addToCart={addToCart} />;
      case "messages": return <Messages />;
      case "contact": return <Contact />;
      case "profile": return <Profile />;
      default: return <Products searchQuery={searchQuery} addToCart={addToCart} />;
    }
  };

  return (
    <div className="flex flex-1 bg-gray-50">
      <Sidebar
        setSection={setActiveSection}
        activeSection={activeSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? "md:ml-64" : "md:ml-0"}`}>
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}