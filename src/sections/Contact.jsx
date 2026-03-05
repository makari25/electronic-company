import { useState } from "react";
import { User, Mail, Phone, MessageSquare, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      return toast.error("Please fill in all required fields.");
    }
    toast.success("Message sent successfully!");
    setFormData({ fullName: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <h2 className="text-xl font-bold">Get in Touch</h2>
        <p className="text-indigo-100 text-sm mt-1">We'd love to hear from you.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        
        {/* Full Name */}
        <div className="relative">
          <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Full Name *"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Message */}
        <div className="relative">
          <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
          <textarea 
            rows="4"
            placeholder="Your Message..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
        >
          <Send size={18} />
          Send Message
        </button>
      </form>
    </div>
  );
}