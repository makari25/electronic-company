import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import toast from "react-hot-toast";

function AppContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [activeSection, setActiveSection] = useState("products");
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Check auth status on app load
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  // Hide header on login and register pages
  const hideHeaderPaths = ["/login", "/register"];
  const showHeader = !hideHeaderPaths.includes(location.pathname);

  // Cart Logic
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success(`${product.name} added to cart!`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setCartItems((prev) => prev.filter((i) => i.id !== item.id));
    toast.error(`${item.name} removed from cart`);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    navigate("/");
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setCartItems([]);
    navigate("/login");
  };

  return (
    <>
      {showHeader && (
        <Header 
          onSearch={(term) => setSearchQuery(term)}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
          handleLogout={handleLogout} // Pass logout to header
        />
      )}
      
      <div className="flex flex-1">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={<Login setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route path="/register" element={<Register />} />

          {/* Protected Route */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard 
                  searchQuery={searchQuery} 
                  isSidebarOpen={isSidebarOpen} 
                  setIsSidebarOpen={setIsSidebarOpen}
                  addToCart={addToCart}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <AppContent />
      </div>
    </BrowserRouter>
  );
}