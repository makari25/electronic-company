import { useState } from "react";
import toast from "react-hot-toast";
import { 
  User, Mail, Phone, Home, GraduationCap, Users, 
  Save, Loader2, Camera, MapPin, BadgeCheck 
} from "lucide-react";

export default function UpdateAccount() {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    religion: "",
    street: "",
    city: "",
    institution: "",
    parentName: "",
    parentPhone: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const submit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Profile updated successfully!");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-500">Manage your personal information and preferences.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
          <BadgeCheck size={14} />
          <span>Verified Account</span>
        </div>
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Picture Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-white shadow-lg">
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-indigo-300">
                      <User size={48} />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors shadow-md text-white">
                  <Camera size={16} />
                  <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                </label>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-gray-900">{formData.firstName || "New"} {formData.lastName || "User"}</h3>
                <p className="text-sm text-gray-500">Member since 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Personal Data Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center gap-3 border-b pb-3 mb-2">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Personal Data</h3>
                <p className="text-xs text-gray-400">Basic identification details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField icon={<User size={16} />} label="First Name" name="firstName" placeholder="John" value={formData.firstName} onChange={handleInputChange} />
              <InputField icon={<User size={16} />} label="Last Name" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} />
              <InputField icon={<Mail size={16} />} label="Email" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} />
              <InputField icon={<Phone size={16} />} label="Phone" name="phone" placeholder="+1 234 567 890" value={formData.phone} onChange={handleInputChange} />
            </div>
          </div>

          {/* Residence Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center gap-3 border-b pb-3 mb-2">
              <div className="p-2 bg-green-50 rounded-lg text-green-600">
                <Home size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Residence</h3>
                <p className="text-xs text-gray-400">Current address details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <InputField icon={<MapPin size={16} />} label="Street Address" name="street" placeholder="123 Main St" value={formData.street} onChange={handleInputChange} />
              </div>
              <InputField icon={<Home size={16} />} label="City" name="city" placeholder="New York" value={formData.city} onChange={handleInputChange} />
              <InputField icon={<User size={16} />} label="Religion" name="religion" placeholder="Optional" value={formData.religion} onChange={handleInputChange} />
            </div>
          </div>

          {/* Education & Parents Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 text-gray-700">
                <GraduationCap size={18} className="text-purple-500" />
                <h3 className="font-bold">Education</h3>
              </div>
              <InputField icon={<GraduationCap size={16} />} label="Institution" name="institution" placeholder="University Name" value={formData.institution} onChange={handleInputChange} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Users size={18} className="text-orange-500" />
                <h3 className="font-bold">Parents</h3>
              </div>
              <InputField icon={<User size={16} />} label="Parent Name" name="parentName" placeholder="Parent's Name" value={formData.parentName} onChange={handleInputChange} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Reusable Input Component for cleaner code
function InputField({ icon, label, name, type = "text", placeholder, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-500">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm text-gray-700 bg-gray-50 focus:bg-white"
        />
      </div>
    </div>
  );
}