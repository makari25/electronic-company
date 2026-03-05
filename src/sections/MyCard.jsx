import { useState, useMemo, useEffect } from "react";
import { User, Upload, ShieldCheck } from "lucide-react";

export default function MyCard() {
  // FIX 1: Corrected state initialization syntax
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "Alex Johnson",
    memberId: "#2026-XP-9941",
    issueDate: "03/2026"
  });

  // FIX 2: Stabilize the barcode so it doesn't randomize on every render/keystroke
  const barcodeHeights = useMemo(() => {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 12) + 8);
  }, []);

  // Optional: Clean up object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous image URL if it exists
      if (image) URL.revokeObjectURL(image);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 md:p-8 flex flex-col items-center lg:items-start space-y-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Identity Card</h2>
        <p className="text-gray-500">Your digital identification for DashboardApp services.</p>
      </div>

      {/* --- THE CARD --- */}
      <div className="relative w-full max-w-[420px] aspect-[1.6/1] bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl shadow-2xl overflow-hidden p-6 text-white group transition-transform hover:scale-[1.02]">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-indigo-200" />
              <span className="font-bold tracking-widest text-[10px] uppercase opacity-90">Official Member</span>
            </div>
            <h3 className="font-black text-xl tracking-tighter italic opacity-30">D-APP</h3>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative">
              {image ? (
                <img 
                  src={image} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-2 border-white/40 shadow-xl" 
                  alt="Profile" 
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border-2 border-dashed border-white/30">
                  <User size={32} className="text-white/40" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-indigo-200 font-bold mb-1">Full Name</p>
              <h4 className="text-lg md:text-xl font-bold truncate leading-tight">{formData.fullName || "Your Name"}</h4>
              
              <p className="text-[10px] uppercase tracking-widest text-indigo-200 font-bold mt-3 mb-1">Member ID</p>
              <p className="font-mono text-sm opacity-90">{formData.memberId || "ID Number"}</p>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex gap-6">
              <div>
                <p className="text-[9px] uppercase text-indigo-200 font-bold">Issued</p>
                <p className="text-xs font-medium">{formData.issueDate}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase text-indigo-200 font-bold">Status</p>
                <p className="text-xs font-medium text-green-400">● ACTIVE</p>
              </div>
            </div>
            
            {/* Barcode - Now stable using memoized heights */}
            <div className="bg-white/90 p-1.5 rounded-md flex items-center gap-[2px]">
              {barcodeHeights.map((h, i) => (
                <div key={i} className="bg-black w-[2px]" style={{ height: `${h}px` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- EDITING PANEL --- */}
      <div className="w-full max-w-[420px] grid grid-cols-1 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h4 className="font-bold text-gray-700 mb-2">Edit Card Details</h4>
        
        {/* FIX 3: Made inputs controlled components by adding 'value' prop */}
        <input 
          name="fullName" 
          placeholder="Full Name" 
          value={formData.fullName}
          className="p-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
          onChange={handleInputChange} 
        />
        
        <input 
          name="memberId" 
          placeholder="Member ID" 
          value={formData.memberId}
          className="p-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
          onChange={handleInputChange} 
        />

        <input 
          name="issueDate" 
          placeholder="Issue Date (e.g. 03/2026)" 
          value={formData.issueDate}
          className="p-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
          onChange={handleInputChange} 
        />

        <div className="flex gap-4 pt-2">
          <label className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-3 px-4 rounded-lg cursor-pointer transition-colors shadow-md">
            <Upload size={16} />
            Upload Photo
            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
          </label>
        </div>
      </div>
    </div>
  );
}