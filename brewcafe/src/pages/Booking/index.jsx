import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import BookingForm from '../../components/booking/BookingForm';
import TimeSlots from '../../components/booking/TimeSlots';
import BookingSummary from '../../components/booking/BookingSummary';
import Payment from '../../components/booking/Payment';
import Success from '../../components/booking/Success';
import Button from '../../components/common/Button';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const Booking = () => {
  const [step, setStep] = useState(1);
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

  const steps = [
    { id: 1, label: 'Details' },
    { id: 2, label: 'Time' },
    { id: 3, label: 'Payment' },
    { id: 4, label: 'Confirm' },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
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
        <div className="min-h-screen bg-dark pt-24 pb-12">
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
      <div className="min-h-screen bg-dark pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Reserve Your Table</h1>
            <p className="text-gray-400">Book your spot at BrewCafe in just a few simple steps</p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {steps.map((s, idx) => (
                <React.Fragment key={s.id}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors
                      ${step >= s.id ? 'bg-accent text-primary' : 'bg-card text-gray-500 border border-gray-700'}`}>
                      {step > s.id ? <Check size={20} /> : s.id}
                    </div>
                    <span className={`text-sm ${step >= s.id ? 'text-accent' : 'text-gray-500'}`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 ${step > s.id ? 'bg-accent' : 'bg-gray-800'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-gray-800">
                {step === 1 && (
                  <BookingForm 
                    formData={formData} 
                    setFormData={setFormData} 
                  />
                )}
                
                {step === 2 && (
                  <TimeSlots 
                    selectedTime={selectedTime} 
                    setSelectedTime={setSelectedTime} 
                  />
                )}
                
                {step === 3 && (
                  <Payment 
                    onPaymentSelect={setPaymentMethod} 
                  />
                )}
                
                {step === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-secondary mb-4">Confirm Your Booking</h3>
                    <div className="bg-dark rounded-lg p-6 space-y-3 border border-gray-800">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name</span>
                        <span className="text-secondary">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Email</span>
                        <span className="text-secondary">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date</span>
                        <span className="text-secondary">{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time</span>
                        <span className="text-secondary">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Guests</span>
                        <span className="text-secondary">{formData.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Payment</span>
                        <span className="text-secondary capitalize">{paymentMethod}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                      By confirming, you agree to our cancellation policy. 
                      Free cancellation up to 2 hours before your reservation.
                    </p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={step === 1}
                    className={step === 1 ? 'invisible' : ''}
                  >
                    <ChevronLeft size={20} />
                    Back
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                  >
                    {step === 4 ? 'Confirm Booking' : 'Continue'}
                    <ChevronRight size={20} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="hidden lg:block">
              <BookingSummary 
                formData={formData} 
                selectedTime={selectedTime} 
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;