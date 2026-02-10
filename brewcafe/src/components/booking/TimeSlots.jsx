import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Sun, 
  Sunset, 
  Moon, 
  Coffee,
  Sparkles,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const TimeSlots = ({ selectedTime, setSelectedTime }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTime, setHoveredTime] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookedSlots, setBookedSlots] = useState(['10:00 AM', '02:30 PM', '06:00 PM']);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const timeSlots = [
    { time: '08:00 AM', period: 'morning', availability: 'high' },
    { time: '08:30 AM', period: 'morning', availability: 'high' },
    { time: '09:00 AM', period: 'morning', availability: 'medium' },
    { time: '09:30 AM', period: 'morning', availability: 'high' },
    { time: '10:00 AM', period: 'morning', availability: 'booked' },
    { time: '10:30 AM', period: 'morning', availability: 'high' },
    { time: '11:00 AM', period: 'morning', availability: 'medium' },
    { time: '11:30 AM', period: 'morning', availability: 'high' },
    { time: '12:00 PM', period: 'afternoon', availability: 'low' },
    { time: '12:30 PM', period: 'afternoon', availability: 'medium' },
    { time: '01:00 PM', period: 'afternoon', availability: 'low' },
    { time: '01:30 PM', period: 'afternoon', availability: 'medium' },
    { time: '02:00 PM', period: 'afternoon', availability: 'high' },
    { time: '02:30 PM', period: 'afternoon', availability: 'booked' },
    { time: '03:00 PM', period: 'afternoon', availability: 'high' },
    { time: '03:30 PM', period: 'afternoon', availability: 'medium' },
    { time: '04:00 PM', period: 'afternoon', availability: 'high' },
    { time: '04:30 PM', period: 'afternoon', availability: 'high' },
    { time: '05:00 PM', period: 'evening', availability: 'medium' },
    { time: '05:30 PM', period: 'evening', availability: 'low' },
    { time: '06:00 PM', period: 'evening', availability: 'booked' },
    { time: '06:30 PM', period: 'evening', availability: 'medium' },
    { time: '07:00 PM', period: 'evening', availability: 'high' },
    { time: '07:30 PM', period: 'evening', availability: 'high' },
  ];

  const periods = [
    { id: 'morning', label: 'Morning', icon: Sun, color: 'from-orange-400 to-yellow-400', time: '8AM - 12PM' },
    { id: 'afternoon', label: 'Afternoon', icon: Coffee, color: 'from-blue-400 to-cyan-400', time: '12PM - 5PM' },
    { id: 'evening', label: 'Evening', icon: Moon, color: 'from-purple-400 to-pink-400', time: '5PM - 8PM' },
  ];

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'high': return 'border-green-500/30 text-green-400 hover:border-green-500 hover:bg-green-500/10';
      case 'medium': return 'border-yellow-500/30 text-yellow-400 hover:border-yellow-500 hover:bg-yellow-500/10';
      case 'low': return 'border-orange-500/30 text-orange-400 hover:border-orange-500 hover:bg-orange-500/10';
      case 'booked': return 'border-gray-700 text-gray-600 cursor-not-allowed opacity-50';
      default: return 'border-gray-700 text-gray-400';
    }
  };

  const getAvailabilityLabel = (availability) => {
    switch (availability) {
      case 'high': return 'Available';
      case 'medium': return 'Filling fast';
      case 'low': return 'Almost full';
      case 'booked': return 'Booked';
      default: return '';
    }
  };

  const filteredSlots = timeSlots.filter(slot => {
    const activePeriod = periods[currentPage].id;
    return slot.period === activePeriod;
  });

  const handleTimeSelect = (time, availability) => {
    if (availability !== 'booked') {
      setSelectedTime(time);
    }
  };

  return (
    <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/20">
            <Clock className="text-[#d4af37]" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#f5f5dc]">Select Time</h3>
            <p className="text-gray-400 text-sm">Choose your preferred dining time</p>
          </div>
        </div>
        
        {selectedTime && (
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
            <Check className="text-green-500" size={16} />
            <span className="text-green-400 text-sm font-medium">{selectedTime}</span>
          </div>
        )}
      </div>

      {/* Period selector */}
      <div className="flex gap-2 p-1 bg-[#16213e] rounded-xl border border-gray-800">
        {periods.map((period, idx) => {
          const Icon = period.icon;
          const isActive = currentPage === idx;
          
          return (
            <button
              key={period.id}
              onClick={() => setCurrentPage(idx)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg
                        transition-all duration-300 text-sm font-medium
                        ${isActive 
                          ? 'bg-[#d4af37] text-[#1a1a2e]' 
                          : 'text-gray-400 hover:text-[#f5f5dc] hover:bg-[#1a1a2e]'
                        }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{period.label}</span>
            </button>
          );
        })}
      </div>

      {/* Period info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {React.createElement(periods[currentPage].icon, { 
            size: 18, 
            className: `text-transparent bg-clip-text bg-gradient-to-r ${periods[currentPage].color}` 
          })}
          <span className={`text-sm font-medium bg-gradient-to-r ${periods[currentPage].color} bg-clip-text text-transparent`}>
            {periods[currentPage].time}
          </span>
        </div>
        
        {/* Availability legend */}
        <div className="hidden sm:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-gray-400">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-gray-400">Limited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gray-600" />
            <span className="text-gray-400">Booked</span>
          </div>
        </div>
      </div>

      {/* Time slots grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredSlots.map((slot, idx) => {
          const isSelected = selectedTime === slot.time;
          const isBooked = slot.availability === 'booked';
          
          return (
            <button
              key={slot.time}
              onClick={() => handleTimeSelect(slot.time, slot.availability)}
              onMouseEnter={() => setHoveredTime(slot.time)}
              onMouseLeave={() => setHoveredTime(null)}
              disabled={isBooked}
              className={`relative py-3 px-4 rounded-xl border-2 font-medium text-sm
                        transition-all duration-300 overflow-hidden group
                        ${isSelected
                          ? 'bg-[#d4af37] border-[#d4af37] text-[#1a1a2e] shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-105'
                          : getAvailabilityColor(slot.availability)
                        }
                        ${isBooked ? 'line-through' : ''}`}
              style={{ transitionDelay: `${idx * 30}ms` }}
            >
              {/* Background gradient for non-selected */}
              {!isSelected && !isBooked && (
                <div className={`absolute inset-0 bg-gradient-to-r ${periods[currentPage].color} opacity-0 
                               group-hover:opacity-5 transition-opacity duration-300`} />
              )}
              
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-1 right-1">
                  <Check size={12} className="text-[#1a1a2e]" strokeWidth={3} />
                </div>
              )}

              {/* Time */}
              <span className="relative z-10">{slot.time}</span>

              {/* Hover tooltip */}
              {hoveredTime === slot.time && !isBooked && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 
                              bg-[#1a1a2e] text-xs text-gray-300 rounded whitespace-nowrap
                              border border-gray-700 z-20">
                  {getAvailabilityLabel(slot.availability)}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                                w-2 h-2 bg-[#1a1a2e] border-b border-r border-gray-700 rotate-45" />
                </div>
              )}

              {/* Booked overlay */}
              {isBooked && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#16213e]/50">
                  <span className="text-xs font-medium text-gray-500">Booked</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Navigation arrows (mobile) */}
      <div className="flex justify-between sm:hidden">
        <button
          onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className="p-2 rounded-lg bg-[#16213e] border border-gray-800 text-gray-400
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setCurrentPage(prev => Math.min(periods.length - 1, prev + 1))}
          disabled={currentPage === periods.length - 1}
          className="p-2 rounded-lg bg-[#16213e] border border-gray-800 text-gray-400
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Selected time display (mobile) */}
      {selectedTime && (
        <div className="sm:hidden p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
          <p className="text-gray-400 text-sm mb-1">Selected Time</p>
          <p className="text-green-400 text-xl font-bold">{selectedTime}</p>
        </div>
      )}

      {/* Info note */}
      <div className="flex items-start gap-3 p-4 bg-[#16213e] rounded-xl border border-gray-800">
        <AlertCircle className="text-[#d4af37] flex-shrink-0 mt-0.5" size={18} />
        <div>
          <p className="text-[#f5f5dc] text-sm font-medium mb-1">Reservation Policy</p>
          <p className="text-gray-400 text-xs">
            Please arrive within 15 minutes of your selected time. We hold tables for 15 minutes 
            before releasing them to other guests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeSlots;