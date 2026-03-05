import { useState } from "react";
import { Search, Send, Paperclip, Smile, User, CheckCheck } from "lucide-react";

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    { id: 1, name: "John Doe", lastMessage: "Sounds good!", time: "2m", unread: true },
    { id: 2, name: "Sarah Smith", lastMessage: "Meeting at 3pm", time: "1h", unread: false },
    { id: 3, name: "Support Team", lastMessage: "Ticket closed", time: "2d", unread: false },
  ];

  const messages = [
    { id: 1, text: "Hey, how are you?", sent: false, time: "10:30 AM" },
    { id: 2, text: "I'm good thanks! Just reviewing the dashboard.", sent: true, time: "10:31 AM" },
    { id: 3, text: "Sounds good! Let me know if you need help.", sent: false, time: "10:32 AM" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[600px] flex">
      
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-100 flex flex-col bg-gray-50 hidden md:flex">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Messages</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input placeholder="Search chats..." className="w-full pl-9 pr-3 py-2 bg-white border rounded-lg text-sm" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${selectedChat === chat.id ? "bg-indigo-50 border-l-4 border-indigo-600" : "hover:bg-white"}`}
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                {chat.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm text-gray-900">{chat.name}</p>
                  <span className="text-xs text-gray-400">{chat.time}</span>
                </div>
                <p className={`text-xs truncate ${chat.unread ? "text-indigo-600 font-semibold" : "text-gray-500"}`}>
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={20} className="text-gray-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">John Doe</h3>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sent ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${msg.sent ? "bg-indigo-600 text-white rounded-br-none" : "bg-white border border-gray-100 rounded-bl-none"}`}>
                <p className="text-sm">{msg.text}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 ${msg.sent ? "text-indigo-200" : "text-gray-400"}`}>
                  <span className="text-[10px]">{msg.time}</span>
                  {msg.sent && <CheckCheck size={12} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-gray-600"><Paperclip size={20} /></button>
            <input 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..." 
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            />
            <button className="text-gray-400 hover:text-gray-600"><Smile size={20} /></button>
            <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}