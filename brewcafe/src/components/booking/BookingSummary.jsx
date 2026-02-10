import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Coffee, 
  Sparkles, 
  CheckCircle2,
  Utensils,
  Info,
  Copy,
  Check
} from 'lucide-react';

const BookingSummary = ({ formData, selectedTime }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookingId] = useState(() => 'BC' + Math.random().toString(36).substr(2, 6).toUpperCase());

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyId = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isComplete = formData.name && formData.date && selectedTime;

  const details = [
    {
      icon: Calendar,
      label: 'Date',
      value: formData.date || 'Not selected',
      status: formData.date ? 'complete' : 'pending',
    },
    {
      icon: Clock,
      label: 'Time',
      value: selectedTime || 'Not selected',
      status: selectedTime ? 'complete' : 'pending',
    },
    {
      icon: Users,
      label: 'Guests',
      value: formData.guests 
        ? `${formData.guests} ${parseInt(formData.guests) === 1 ? 'Guest' : 'Guests'}`
        : 'Not selected',
      status: formData.guests ? 'complete' : 'pending',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'BrewCafe Downtown',
      subValue: '123 Coffee Street, NY 10001',
      status: 'complete',
    },
  ];

  return (
    <div 
      className={`bg-[#16213e] rounded-2xl p-6 border border-gray-800 sticky top-24
                 shadow-xl transition-all duration-700 transform
                 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Header with booking ID */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-800">
        <div>
          <h3 className="text-xl font-bold text-[#f5f5dc] flex items-center gap-2">
            <Coffee className="text-[#d4af37]" size={24} />
            Booking Summary
          </h3>
          <p className="text-gray-500 text-sm mt-1">Review your reservation details</p>
        </div>
        
        {/* Booking ID */}
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Reference ID</p>
          <button 
            onClick={handleCopyId}
            className="flex items-center gap-1.5 text-[#d4af37] font-mono text-sm 
                     hover:bg-[#d4af37]/10 px-2 py-1 rounded transition-colors"
            title="Click to copy"
          >
            {bookingId}
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Status indicator */}
      <div className={`mb-6 p-3 rounded-xl border transition-all duration-500
                     ${isComplete 
                       ? 'bg-green-500/10 border-green-500/30' 
                       : 'bg-[#d4af37]/10 border-[#d4af37]/30'
                     }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center
                         ${isComplete ? 'bg-green-500/20' : 'bg-[#d4af37]/20'}`}>
            {isComplete ? (
              <CheckCircle2 className="text-green-500" size={20} />
            ) : (
              <Sparkles className="text-[#d4af37] animate-pulse" size={20} />
            )}
          </div>
          <div>
            <p className={`font-semibold text-sm ${isComplete ? 'text-green-400' : 'text-[#d4af37]'}`}>
              {isComplete ? 'Ready to Confirm' : 'Complete Your Booking'}
            </p>
            <p className="text-gray-400 text-xs">
              {isComplete 
                ? 'All details filled. Proceed to confirm!' 
                : 'Please fill in all required details'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Details list */}
      <div className="space-y-4 mb-6">
        {details.map((detail, idx) => {
          const Icon = detail.icon;
          return (
            <div 
              key={idx}
              className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300
                        hover:bg-[#1a1a2e] group
                        ${detail.status === 'complete' ? 'opacity-100' : 'opacity-60'}`}
            >
              <div className={`p-2 rounded-lg transition-colors duration-300
                             ${detail.status === 'complete' 
                               ? 'bg-[#d4af37]/10 group-hover:bg-[#d4af37]/20' 
                               : 'bg-gray-800'
                             }`}>
                <Icon 
                  size={18} 
                  className={detail.status === 'complete' ? 'text-[#d4af37]' : 'text-gray-500'} 
                />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">
                  {detail.label}
                </p>
                <p className={`font-medium text-sm truncate
                             ${detail.status === 'complete' ? 'text-[#f5f5dc]' : 'text-gray-400'}`}>
                  {detail.value}
                </p>
                {detail.subValue && (
                  <p className="text-gray-500 text-xs mt-0.5">{detail.subValue}</p>
                )}
              </div>
              {detail.status === 'complete' && (
                <CheckCircle2 className="text-green-500 flex-shrink-0" size={16} />
              )}
            </div>
          );
        })}
      </div>

      {/* Special requests preview */}
      {formData.requests && (
        <div className="mb-6 p-4 bg-[#1a1a2e] rounded-xl border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Info size={14} className="text-[#d4af37]" />
            <span className="text-gray-400 text-xs uppercase tracking-wider">Special Requests</span>
          </div>
          <p className="text-gray-300 text-sm line-clamp-3">{formData.requests}</p>
        </div>
      )}

      {/* Pricing */}
      <div className="pt-6 border-t border-gray-800 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400 flex items-center gap-2">
            <Utensils size={14} />
            Table Reservation
          </span>
          <span className="text-[#f5f5dc] font-medium">Free</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Service Fee</span>
          <span className="text-green-400 text-xs">Waived</span>
        </div>

        <div className="pt-3 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <span className="text-[#f5f5dc] font-semibold">Total Amount</span>
            <span className="text-2xl font-bold text-[#d4af37]">$20.00</span>
          </div>
          <p className="text-gray-500 text-xs mt-1 text-right">No charges for reservations</p>
        </div>
      </div>

      {/* Help text */}
      <div className="mt-6 p-4 bg-[#1a1a2e] rounded-xl border border-gray-800">
        <div className="flex items-start gap-3">
          <Info className="text-[#d4af37] flex-shrink-0 mt-0.5" size={16} />
          <div>
            <p className="text-[#f5f5dc] text-sm font-medium mb-1">Need help?</p>
            <p className="text-gray-400 text-xs">
              Call us at <span className="text-[#d4af37]">+1 (555) 123-4567</span> for assistance with your booking.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile-only: Expand indicator */}
      <div className="lg:hidden mt-4 text-center">
        <p className="text-gray-500 text-xs">Scroll to see more details</p>
      </div>
    </div>
  );
};

export default BookingSummary;