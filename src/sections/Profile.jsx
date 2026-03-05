import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Shield, Heart, AlertCircle, CheckCircle, Edit } from "lucide-react";

export default function Profile() {
  const [updated, setUpdated] = useState(false);

  const userData = {
    firstName: "John",
    middleName: "M",
    lastName: "Doe",
    idNumber: "12232323",
    religion: "Agnostic",
    telephone: "+254 700 000 000",
    maritalStatus: "Single",
    disability: "None",
    terminalDisease: "None"
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      
      {/* Alert Banner */}
      {!updated && (
        <div className="bg-amber-50 border-b border-amber-100 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-700">
            <AlertCircle size={18} />
            <span className="text-sm font-medium">Please update your account to continue.</span>
          </div>
          <button onClick={() => setUpdated(true)} className="text-xs font-bold px-3 py-1 bg-amber-100 rounded hover:bg-amber-200 transition-colors">
            Dismiss
          </button>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/40 shadow-xl">
            <User size={40} className="text-white" />
          </div>
          <button className="absolute bottom-0 right-0 bg-white text-indigo-600 p-1.5 rounded-full shadow-md hover:bg-indigo-50 transition-colors">
            <Edit size={14} />
          </button>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h2>
          <p className="text-indigo-100 text-sm">ID: {userData.idNumber}</p>
          <div className="flex gap-2 mt-2 justify-center md:justify-start">
            <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">Admin</span>
            <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">Verified</span>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <User size={20} className="text-gray-400" /> Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <ProfileItem icon={<User size={16} />} label="First Name" value={userData.firstName} />
          <ProfileItem icon={<User size={16} />} label="Middle Name" value={userData.middleName} />
          <ProfileItem icon={<User size={16} />} label="Last Name" value={userData.lastName} />
          <ProfileItem icon={<Shield size={16} />} label="ID Number" value={userData.idNumber} />
          <ProfileItem icon={<Heart size={16} />} label="Religion" value={userData.religion} />
          <ProfileItem icon={<Phone size={16} />} label="Telephone" value={userData.telephone} />
          <ProfileItem icon={<Heart size={16} />} label="Marital Status" value={userData.maritalStatus} />
          <ProfileItem icon={<AlertCircle size={16} />} label="Disability" value={userData.disability} />
          <ProfileItem icon={<AlertCircle size={16} />} label="Terminal Disease" value={userData.terminalDisease} />
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
          {updated ? (
             <div className="flex items-center gap-2 text-green-600">
               <CheckCircle size={18} />
               <span className="text-sm font-medium">Profile is up to date.</span>
             </div>
          ) : (
            <p className="text-sm text-gray-500">Please verify your information is correct.</p>
          )}
          
          <button 
            onClick={() => setUpdated(true)}
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Mark as Updated
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, value }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 hover:bg-indigo-50 hover:border-indigo-100 transition-colors group">
      <div className="flex items-center gap-2 text-gray-400 mb-1 group-hover:text-indigo-500">
        {icon}
        <p className="text-xs uppercase font-semibold tracking-wide">{label}</p>
      </div>
      <p className="font-medium text-gray-800 text-base truncate">{value || "N/A"}</p>
    </div>
  );
}