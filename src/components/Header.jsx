import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Bell, Mail, UserCircle, Search, Menu, ShoppingCart, Trash2, X, LogOut 
} from "lucide-react";

export default function Header({ 
  onSearch, toggleSidebar, isSidebarOpen, 
  cartItems, removeFromCart, clearCart,
  activeSection, setActiveSection, handleLogout
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  // Helper to navigate and set section
  const handleNavClick = (sectionName) => {
    setActiveSection(sectionName);
    navigate("/"); 
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Updated Link to "/" for Dashboard */}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight hidden sm:block">
                Dashboard<span className="text-indigo-600">App</span>
              </h1>
            </Link>
          </div>

          {/* Center Search - With Button */}
          <div className="hidden md:flex flex-1 justify-center px-12">
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  onSearch(e.target.value); // Live search
                }}
                className="w-full pl-10 pr-12 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all"
              />
              {/* Search Button */}
              <button 
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <div className="bg-indigo-100 p-1 rounded-full hover:bg-indigo-200 transition-colors">
                   <Search className="h-4 w-4" />
                </div>
              </button>
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Search Button */}
            <button 
              onClick={() => {
                if(searchInput) onSearch(searchInput);
              }} 
              className="md:hidden p-2 rounded-full text-gray-500 hover:bg-gray-100"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Messages Icon */}
            <button 
              onClick={() => handleNavClick("messages")}
              className={`relative p-2 rounded-full transition-colors hidden sm:block ${
                activeSection === "messages" ? "bg-indigo-100 text-indigo-600" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Mail className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
            
            {/* Notifications Icon */}
            <button 
              onClick={() => handleNavClick("notifications")}
              className={`relative p-2 rounded-full transition-colors hidden sm:block ${
                activeSection === "notifications" ? "bg-indigo-100 text-indigo-600" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            <div className="hidden sm:block h-6 w-px bg-gray-200 mx-1" />

            {/* Profile Icon */}
            <button 
              onClick={() => handleNavClick("profile")}
              className={`flex items-center gap-2 p-1 pr-2 rounded-full transition-colors group ${
                activeSection === "profile" ? "bg-indigo-100" : "hover:bg-gray-100"
              }`}
            >
              <UserCircle className={`h-8 w-8 ${activeSection === "profile" ? "text-indigo-600" : "text-indigo-600 group-hover:text-indigo-700"}`} />
            </button>

             {/* LOGOUT BUTTON  */}
         <button 
           onClick={handleLogout}
           className="p-2 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
           title="Logout"
         >
           <LogOut className="h-5 w-5" />
         </button>

          </div>
        </div>
      </header>

      {/* --- CART DRAWER (Slide Over) --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setIsCartOpen(false)} />

          {/* Side Panel */}
          <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-md transform transition ease-in-out duration-300">
              <div className="h-full flex flex-col bg-white shadow-xl">
                
                {/* Drawer Header */}
                <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                  <div className="flex items-start justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Shopping Cart</h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button 
                        onClick={() => setIsCartOpen(false)}
                        className="-m-2 p-2 rounded-md text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  {/* Cart Items List */}
                  {cartItems.length === 0 ? (
                    <div className="text-center py-10">
                      <ShoppingCart className="mx-auto h-12 w-12 text-gray-300" />
                      <p className="mt-4 text-gray-500">Your cart is empty.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 border-b pb-4">
                          <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                            <img 
                              src={`/assets/electronics/${item.image}`} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => e.target.src = "https://placehold.co/100x100/e2e8f0/64748b?text=Img"}
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-semibold text-indigo-600">
                              ${(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item)}
                            className="text-red-500 hover:text-red-600 self-start p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Drawer Footer (Total & Checkout) */}
                {cartItems.length > 0 && (
                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-bold text-gray-900 mb-4">
                      <p>Total</p>
                      <p>${totalPrice.toLocaleString()}</p>
                    </div>
                    <button
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={clearCart}
                      className="w-full mt-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}