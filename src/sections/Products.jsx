import { useState, useMemo } from "react";
import { Star, Sparkles } from "lucide-react";

export default function Products({ searchQuery = "", addToCart }) {
  // ... (Product data remains the same as your previous code)
  const allProducts = [
    { id: 1, name: "iPhone 15 Pro Max", category: "Smartphones", price: 1199, rating: 5, image: "iphone.png", badge: "New" },
    { id: 2, name: "Samsung Galaxy S24 Ultra", category: "Smartphones", price: 1099, rating: 5, image: "samsung.jpg", badge: "Hot" },
    { id: 3, name: "MacBook Pro 16\"", category: "Laptops", price: 2499, rating: 5, image: "macbook.jpg" },
    { id: 4, name: "Dell XPS 15", category: "Laptops", price: 1899, rating: 4, image: "dellxps.jpg" },
    { id: 5, name: "ASUS ROG Gaming", category: "Laptops", price: 1599, rating: 4, image: "asusrog.jpg" },
    { id: 6, name: "Sony WH-1000XM5", category: "Audio", price: 349, rating: 5, image: "sony.jpg", badge: "Best Seller" },
    { id: 7, name: "Apple AirPods Pro", category: "Audio", price: 249, rating: 4, image: "airpods.jpg" },
    { id: 8, name: "PlayStation 5", category: "Gaming", price: 499, rating: 5, image: "ps5.jpg", badge: "Limited" },
    { id: 9, name: "Xbox Series X", category: "Gaming", price: 499, rating: 4, image: "xbox.jpg" },
    { id: 10, name: "Apple Watch Ultra 2", category: "Wearables", price: 799, rating: 5, image: "watch.jpg" },
    { id: 11, name: "Samsung Galaxy Watch 6", category: "Wearables", price: 299, rating: 4, image: "galaxywatch.jpg" },
    { id: 12, name: "iPad Pro 12.9\"", category: "Tablets", price: 1099, rating: 5, image: "ipad.jpg" },
  ];

  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(allProducts.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = filter === "All" || product.category === filter;
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Filters (Same as before) */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Explore Electronics</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Discover the latest tech gear.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                filter === cat ? "bg-indigo-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                <img 
                  src={`/assets/electronics/${product.image}`} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/e2e8f0/64748b?text=Image" }}
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase bg-indigo-600 text-white rounded-full flex items-center gap-1">
                    <Sparkles size={10} /> {product.badge}
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">{product.category}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1 truncate">{product.name}</h3>

                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < product.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                  ))}
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 border-dashed mt-4">
                  <div className="text-xl font-black text-gray-900">${product.price.toLocaleString()}</div>
                  
                  {/* FUNCTIONAL ADD BUTTON */}
                  <button 
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}