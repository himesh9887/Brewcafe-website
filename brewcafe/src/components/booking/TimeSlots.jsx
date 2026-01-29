import React from 'react';
import { Clock } from 'lucide-react';

const TimeSlots = ({ selectedTime, setSelectedTime }) => {
  const timeSlots = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-accent" size={20} />
        <h3 className="text-lg font-semibold text-secondary">Select Time</h3>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
              ${selectedTime === time
                ? 'bg-accent text-primary shadow-lg shadow-accent/25'
                : 'bg-card text-gray-400 border border-gray-800 hover:border-accent hover:text-secondary'}`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlots;