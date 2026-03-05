import { useState } from "react";
import { Bell, Check, Trash2, MoreVertical, CheckCheck, Search, Star } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "System Update", message: "New version 2.0 is available.", time: "5m ago", read: false, icon: "system" },
    { id: 2, title: "New Follower", message: "Sarah started following you.", time: "1h ago", read: false, icon: "user" },
    { id: 3, title: "Payment Successful", message: "Your subscription is active.", time: "2h ago", read: true, icon: "payment" },
    { id: 4, title: "Server Alert", message: "CPU usage exceeded 90%.", time: "1d ago", read: true, icon: "alert" },
  ]);
  
  const [openMenu, setOpenMenu] = useState(null);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n));
    setOpenMenu(null);
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    setOpenMenu(null);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="text-indigo-600" size={20} />
          <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
          <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-0.5 rounded-full font-bold">
            {notifications.filter(n => !n.read).length} New
          </span>
        </div>
        <button 
          onClick={markAllAsRead}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
        >
          <CheckCheck size={14} /> Mark all as read
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Filter notifications..." className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100">
        {notifications.map((n) => (
          <div key={n.id} className={`flex items-start gap-4 p-4 transition-colors relative ${!n.read ? "bg-indigo-50/50" : "bg-white hover:bg-gray-50"}`}>
            
            {/* Indicator Dot */}
            {!n.read && <span className="absolute left-1.5 top-6 w-2 h-2 bg-indigo-600 rounded-full" />}

            {/* Icon Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ml-2 ${!n.read ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"}`}>
              <Star size={18} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className={`text-sm font-semibold ${!n.read ? "text-gray-900" : "text-gray-700"}`}>{n.title}</h3>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{n.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate mt-0.5">{n.message}</p>
            </div>

            {/* Menu */}
            <div className="relative">
              <button onClick={() => setOpenMenu(openMenu === n.id ? null : n.id)} className="p-1 hover:bg-gray-100 rounded-full text-gray-400">
                <MoreVertical size={16} />
              </button>
              
              {openMenu === n.id && (
                <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-100 rounded-lg shadow-lg z-10 overflow-hidden">
                  {!n.read && (
                    <button onClick={() => markAsRead(n.id)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Check size={14} /> Mark as read
                    </button>
                  )}
                  <button onClick={() => deleteNotification(n.id)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}