import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, Plus, Clock } from "lucide-react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock Events Data
  const events = [
    { id: 1, title: "Team Meeting", date: "2024-10-25", time: "10:00 AM", color: "bg-indigo-500" },
    { id: 2, title: "Project Deadline", date: "2024-10-30", time: "11:59 PM", color: "bg-red-500" },
    { id: 3, title: "Lunch with Client", date: "2024-10-15", time: "01:00 PM", color: "bg-green-500" },
    { id: 4, title: "Code Review", date: "2024-10-22", time: "03:00 PM", color: "bg-yellow-500" },
  ];

  // Helper Functions
  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Generate Calendar Days
  const renderDays = () => {
    const totalDays = daysInMonth(currentDate);
    const startDay = firstDayOfMonth(currentDate);
    const days = [];

    // Empty placeholders for days before the start of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-gray-50/50 border border-gray-100" />);
    }

    // Actual Days
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      const isToday = 
        day === new Date().getDate() && 
        currentDate.getMonth() === new Date().getMonth() && 
        currentDate.getFullYear() === new Date().getFullYear();

      const isSelected = 
        day === selectedDate.getDate() && 
        currentDate.getMonth() === selectedDate.getMonth() && 
        currentDate.getFullYear() === selectedDate.getFullYear();

      const dayEvents = events.filter(e => e.date === dateStr);

      days.push(
        <div 
          key={day} 
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          className={`
            h-24 md:h-32 p-2 border border-gray-100 cursor-pointer transition-all hover:bg-indigo-50 relative group
            ${isSelected ? "bg-indigo-50 ring-1 ring-indigo-300 z-10" : "bg-white"}
            ${isToday ? "border-t-2 border-t-indigo-600" : ""}
          `}
        >
          <span className={`
            inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium
            ${isToday ? "bg-indigo-600 text-white" : "text-gray-700"}
            ${isSelected && !isToday ? "bg-indigo-100 text-indigo-700" : ""}
          `}>
            {day}
          </span>

          <div className="mt-1 space-y-1 hidden md:block overflow-hidden">
            {dayEvents.slice(0, 2).map((event) => (
              <div key={event.id} className={`text-xs px-1.5 py-0.5 rounded truncate text-white ${event.color}`}>
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 pl-1">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  // Filter events for the selected date
  const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const selectedDayEvents = events.filter(e => e.date === selectedDateStr);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <CalendarDays className="text-indigo-600" size={22} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} <span className="text-gray-400 font-normal">{currentDate.getFullYear()}</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={goToToday} className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Today
          </button>
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left: Calendar Grid */}
        <div className="flex-1 p-4">
          {/* Day Names Header */}
          <div className="grid grid-cols-7 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 uppercase py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
            {renderDays()}
          </div>
        </div>

        {/* Right: Sidebar for Selected Date Details */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-100 bg-gray-50/50 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
              <Plus size={18} />
            </button>
          </div>

          <div className="space-y-3">
            {selectedDayEvents.length > 0 ? (
              selectedDayEvents.map(event => (
                <div key={event.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-12 rounded-full ${event.color}`} />
                    <div>
                      <p className="font-semibold text-gray-800">{event.title}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock size={12} /> {event.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-400">
                <CalendarDays size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No events scheduled for this day.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}