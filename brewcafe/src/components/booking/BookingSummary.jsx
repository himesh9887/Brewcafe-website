import React from 'react';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

const BookingSummary = ({ formData, selectedTime }) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-gray-800 sticky top-24">
      <h3 className="text-xl font-bold text-secondary mb-6 pb-4 border-b border-gray-800">
        Booking Summary
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-300">
          <Calendar size={18} className="text-accent" />
          <span>{formData.date || 'Not selected'}</span>
        </div>
        
        <div className="flex items-center gap-3 text-gray-300">
          <Clock size={18} className="text-accent" />
          <span>{selectedTime || 'Not selected'}</span>
        </div>
        
        <div className="flex items-center gap-3 text-gray-300">
          <Users size={18} className="text-accent" />
          <span>{formData.guests} {parseInt(formData.guests) === 1 ? 'Guest' : 'Guests'}</span>
        </div>
        
        <div className="flex items-start gap-3 text-gray-300">
          <MapPin size={18} className="text-accent flex-shrink-0 mt-1" />
          <span>BrewCafe Downtown<br />123 Coffee Street</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Table Reservation</span>
          <span className="text-secondary">Free</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold">
          <span className="text-secondary">Total</span>
          <span className="text-accent">$0.00</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;