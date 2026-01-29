import React, { useState } from 'react';
import { CreditCard, Wallet, Smartphone, Lock } from 'lucide-react';

const Payment = ({ onPaymentSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');

  const methods = [
    { id: 'card', label: 'Credit Card', icon: CreditCard, desc: 'Pay securely with your card' },
    { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, etc.' },
    { id: 'wallet', label: 'Wallet', icon: Wallet, desc: 'Paytm, Mobikwik, etc.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Lock size={20} className="text-accent" />
        <h3 className="text-lg font-semibold text-secondary">Payment Method</h3>
      </div>

      <div className="space-y-3">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200
              ${selectedMethod === method.id 
                ? 'border-accent bg-accent/10' 
                : 'border-gray-800 bg-card hover:border-gray-700'}`}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={(e) => {
                setSelectedMethod(e.target.value);
                onPaymentSelect(e.target.value);
              }}
              className="w-4 h-4 text-accent border-gray-600 focus:ring-accent focus:ring-2"
            />
            <div className={`p-2 rounded-lg ${selectedMethod === method.id ? 'bg-accent text-primary' : 'bg-dark text-gray-400'}`}>
              <method.icon size={20} />
            </div>
            <div className="flex-grow">
              <div className="font-medium text-secondary">{method.label}</div>
              <div className="text-sm text-gray-500">{method.desc}</div>
            </div>
          </label>
        ))}
      </div>

      {selectedMethod === 'card' && (
        <div className="space-y-4 mt-6 p-6 bg-card rounded-xl border border-gray-800 animate-fade-in">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
            <input 
              type="text" 
              placeholder="1234 5678 9012 3456" 
              className="input-field"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
              <input 
                type="text" 
                placeholder="MM/YY" 
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
              <input 
                type="password" 
                placeholder="123" 
                className="input-field"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;