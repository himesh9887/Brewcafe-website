import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/layout/Layout';
import BookingForm from '../../components/booking/BookingForm';
import TimeSlots from '../../components/booking/TimeSlots';
import BookingSummary from '../../components/booking/BookingSummary';
import Payment from '../../components/booking/Payment';
import Success from '../../components/booking/Success';
import Button from '../../components/common/Button';

import { ChevronRight, ChevronLeft, Check, Calendar, Clock, Users, CreditCard, Sparkles } from 'lucide-react';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2',
    requests: '',
  });
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isComplete, setIsComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const sectionRef = useRef(null);

  const steps = [
    { id: 1, label: 'Details', icon: Users, description: 'Your info' },
    { id: 2, label: 'Time', icon: Clock, description: 'Pick slot' },
    { id: 3, label: 'Payment', icon: CreditCard, description: 'How to pay' },
    { id: 4, label: 'Confirm', icon: Calendar, description: 'Review' },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsProcessing(false);
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone && formData.date;
      case 2:
        return selectedTime !== '';
      case 3:
        return true;
      default:
        return true;
    }
  };

  if (isComplete) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#0f0f1e] pt-24 pb-12">
          <div className="max-w-3xl mx-auto px-4">
            <Success 
              bookingData={{ ...formData, time: selectedTime }} 
              onReset={() => {
                setStep(1);
                setIsComplete(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  date: '',
                  guests: '2',
                  requests: '',
                });
                setSelectedTime('');
              }}
            />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0f0f1e] pt-24 pb-12" ref={sectionRef}>
        {/* Background decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/30 
                          rounded-full px-4 py-2 mb-6">
              <Sparkles className="text-[#d4af37]" size={16} />
              <span className="text-[#d4af37] text-sm font-medium">Easy 4-Step Booking</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#d4af37] to-[#fde047] bg-clip-text text-transparent">
              Reserve Your Table
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Book your spot at BrewCafe in just a few simple steps
            </p>
          </div>

          {/* Progress Steps - Enhanced */}
          <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              {/* Progress bar background */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-800 rounded-full hidden sm:block" />
              {/* Active progress bar */}
              <div 
                className="absolute top-5 left-0 h-1 bg-gradient-to-r from-[#d4af37] to-[#fde047] rounded-full 
                         transition-all duration-500 hidden sm:block"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
              
              <div className="flex items-center justify-between relative">
                {steps.map((s, idx) => {
                  const Icon = s.icon;
                  const isActive = step >= s.id;
                  const isCompleted = step > s.id;
                  
                  return (
                    <div key={s.id} className="flex flex-col items-center relative">
                      {/* Step circle */}
                      <div 
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center 
                                  mb-2 sm:mb-3 transition-all duration-500 z-10 border-2
                                  ${isCompleted 
                                    ? 'bg-[#d4af37] border-[#d4af37] text-[#1a1a2e]' 
                                    : isActive 
                                      ? 'bg-[#1a1a2e] border-[#d4af37] text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                                      : 'bg-[#16213e] border-gray-700 text-gray-500'
                                  }
                                  ${step === s.id ? 'scale-110 animate-pulse-slow' : ''}`}
                      >
                        {isCompleted ? (
                          <Check size={20} className="sm:w-6 sm:h-6" />
                        ) : (
                          <Icon size={18} className="sm:w-5 sm:h-5" />
                        )}
                      </div>
                      
                      {/* Label - Hidden on mobile, visible on sm+ */}
                      <span className={`hidden sm:block text-xs sm:text-sm font-medium transition-colors duration-300
                                      ${isActive ? 'text-[#d4af37]' : 'text-gray-500'}`}>
                        {s.label}
                      </span>
                      
                      {/* Description - Only for active step on desktop */}
                      <span className={`hidden lg:block text-xs mt-1 transition-all duration-300
                                      ${step === s.id ? 'text-gray-400 opacity-100' : 'opacity-0'}`}>
                        {s.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className={`bg-[#16213e] rounded-2xl p-6 sm:p-8 border border-gray-800 
                             shadow-2xl transition-all duration-1000 delay-300
                             ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                
                {/* Step indicator for mobile */}
                <div className="flex items-center gap-3 mb-6 sm:hidden">
                  {React.createElement(steps[step - 1].icon, { 
                    size: 20, 
                    className: 'text-[#d4af37]' 
                  })}
                  <span className="text-[#f5f5dc] font-semibold">Step {step}: {steps[step - 1].label}</span>
                </div>

                {/* Step Content */}
                <div className="min-h-[300px]">
                  {step === 1 && (
                    <BookingForm formData={formData} setFormData={setFormData} />
                  )}
                  
                  {step === 2 && (
                    <TimeSlots selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
                  )}
                  
                  {step === 3 && (
                    <Payment onPaymentSelect={setPaymentMethod} />
                  )}
                  
                  {step === 4 && (
                    <div className="space-y-6 animate-fade-in">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#f5f5dc] mb-6 flex items-center gap-2">
                        <Check className="text-[#d4af37]" size={24} />
                        Confirm Your Booking
                      </h3>
                      
                      <div className="bg-[#1a1a2e] rounded-xl p-6 space-y-4 border border-gray-800">
                        {[
                          { label: 'Name', value: formData.name, icon: Users },
                          { label: 'Email', value: formData.email, icon: Mail },
                          { label: 'Date', value: formData.date, icon: Calendar },
                          { label: 'Time', value: selectedTime, icon: Clock },
                          { label: 'Guests', value: `${formData.guests} people`, icon: Users },
                          { label: 'Payment', value: paymentMethod, icon: CreditCard },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                            <div className="flex items-center gap-3 text-gray-400">
                              <item.icon size={16} className="text-[#d4af37]" />
                              <span className="text-sm">{item.label}</span>
                            </div>
                            <span className="text-[#f5f5dc] font-medium text-sm sm:text-base">{item.value}</span>
                          </div>
                        ))}
                      </div>

                      {formData.requests && (
                        <div className="bg-[#1a1a2e] rounded-xl p-4 border border-gray-800">
                          <p className="text-gray-400 text-sm mb-1">Special Requests</p>
                          <p className="text-[#f5f5dc]">{formData.requests}</p>
                        </div>
                      )}

                      <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg p-4 flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-300 text-xs sm:text-sm">
                          By confirming, you agree to our cancellation policy. 
                          Free cancellation up to 2 hours before your reservation.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={step === 1}
                    className={`${step === 1 ? 'invisible' : ''} text-gray-400 hover:text-[#f5f5dc]`}
                  >
                    <ChevronLeft size={20} className="mr-1" />
                    Back
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid() || isProcessing}
                    className={`relative overflow-hidden ${isProcessing ? 'pl-10' : ''}`}
                  >
                    {isProcessing && (
                      <span className="absolute left-3 w-5 h-5 border-2 border-[#1a1a2e] border-t-transparent rounded-full animate-spin" />
                    )}
                    {step === 4 ? (isProcessing ? 'Confirming...' : 'Confirm Booking') : 'Continue'}
                    {!isProcessing && <ChevronRight size={20} className="ml-1" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="hidden lg:block">
              <div className={`sticky top-24 transition-all duration-1000 delay-500
                            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <BookingSummary formData={formData} selectedTime={selectedTime} />
              </div>
            </div>

            {/* Mobile Summary Toggle */}
            <div className="lg:hidden">
              <div className="bg-[#16213e] rounded-xl p-4 border border-gray-800">
                <h4 className="text-[#f5f5dc] font-semibold mb-3 flex items-center gap-2">
                  <Calendar size={16} className="text-[#d4af37]" />
                  Booking Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Date</span>
                    <span className="text-[#f5f5dc]">{formData.date || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Time</span>
                    <span className="text-[#f5f5dc]">{selectedTime || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Guests</span>
                    <span className="text-[#f5f5dc]">{formData.guests}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes pulse-slow {
            0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
            50% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.5); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 2s ease-in-out infinite;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Booking;