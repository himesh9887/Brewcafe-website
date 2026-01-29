import React from 'react';
import { CheckCircle, Calendar, Clock, Download } from 'lucide-react';
import Button from '../common/Button';

const Success = ({ bookingData, onReset }) => {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
        <CheckCircle className="text-green-500" size={40} />
      </div>
      
      <h2 className="text-3xl font-bold text-secondary mb-2">Booking Confirmed!</h2>
      <p className="text-gray-400 mb-8">
        We have sent a confirmation email to {bookingData.email}
      </p>

      <div className="max-w-md mx-auto bg-card rounded-xl p-6 border border-gray-800 mb-8 text-left">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-800">
          <span className="text-gray-400">Booking Reference</span>
          <span className="text-accent font-mono font-bold">BC{Date.now().toString().slice(-6)}</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-300">
            <Calendar size={18} className="text-accent" />
            <span>{bookingData.date}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Clock size={18} className="text-accent" />
            <span>{bookingData.time}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <CheckCircle size={18} className="text-accent" />
            <span>Table for {bookingData.guests}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="secondary" onClick={onReset}>
          Book Another Table
        </Button>
        <Button onClick={() => window.print()}>
          <Download size={18} />
          Download Receipt
        </Button>
      </div>
    </div>
  );
};

export default Success;