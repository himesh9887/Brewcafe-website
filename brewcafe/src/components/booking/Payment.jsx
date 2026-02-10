import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Wallet, 
  Smartphone, 
  Lock, 
  Shield, 
  CheckCircle2,
  AlertCircle,
  Banknote,
  QrCode,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const Payment = ({ onPaymentSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isVisible, setIsVisible] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    onPaymentSelect(methodId);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    }

    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return;
    }

    // Limit CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 3) return;
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const methods = [
    { 
      id: 'card', 
      label: 'Credit / Debit Card', 
      icon: CreditCard, 
      desc: 'Visa, Mastercard, RuPay',
      color: 'from-blue-500 to-cyan-400',
      secure: true
    },
    { 
      id: 'upi', 
      label: 'UPI Payment', 
      icon: Smartphone, 
      desc: 'Google Pay, PhonePe, Paytm',
      color: 'from-purple-500 to-pink-400',
      secure: true
    },
    { 
      id: 'wallet', 
      label: 'Digital Wallet', 
      icon: Wallet, 
      desc: 'Paytm, Mobikwik, Freecharge',
      color: 'from-orange-500 to-amber-400',
      secure: true
    },
    { 
      id: 'cash', 
      label: 'Pay at Cafe', 
      icon: Banknote, 
      desc: 'Cash or card on arrival',
      color: 'from-green-500 to-emerald-400',
      secure: false
    },
  ];

  const isFormValid = cardData.number.length >= 19 && cardData.expiry.length === 5 && cardData.cvv.length === 3;

  return (
    <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/20">
            <Lock className="text-[#d4af37]" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#f5f5dc]">Payment Method</h3>
            <p className="text-gray-400 text-xs">Choose your preferred payment option</p>
          </div>
        </div>
        
        {/* Security badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
          <Shield className="text-green-500" size={14} />
          <span className="text-green-400 text-xs font-medium">256-bit SSL</span>
        </div>
      </div>

      {/* Payment methods */}
      <div className="space-y-3">
        {methods.map((method, idx) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          
          return (
            <label
              key={method.id}
              className={`group relative flex items-center gap-4 p-4 sm:p-5 rounded-xl border-2 cursor-pointer
                        transition-all duration-300 overflow-hidden
                        ${isSelected 
                          ? 'border-[#d4af37] bg-[#d4af37]/5' 
                          : 'border-gray-800 bg-[#16213e] hover:border-gray-700'
                        }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {/* Animated background on select */}
              <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 
                             transition-opacity duration-500 ${isSelected ? 'opacity-5' : ''}`} />
              
              {/* Radio button */}
              <div className={`relative w-5 h-5 rounded-full border-2 flex items-center justify-center
                             transition-all duration-300 flex-shrink-0
                             ${isSelected 
                               ? 'border-[#d4af37] bg-[#d4af37]' 
                               : 'border-gray-600 group-hover:border-gray-500'
                             }`}>
                {isSelected && <div className="w-2 h-2 bg-[#1a1a2e] rounded-full" />}
              </div>

              {/* Icon */}
              <div className={`relative p-2.5 rounded-xl transition-all duration-300
                             ${isSelected 
                               ? `bg-gradient-to-br ${method.color} text-white shadow-lg` 
                               : 'bg-[#1a1a2e] text-gray-400 group-hover:text-[#d4af37]'
                             }`}>
                <Icon size={22} />
              </div>

              {/* Content */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold transition-colors ${isSelected ? 'text-[#f5f5dc]' : 'text-gray-300'}`}>
                    {method.label}
                  </span>
                  {method.secure && (
                    <Lock size={12} className="text-green-500" />
                  )}
                </div>
                <p className={`text-sm transition-colors ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>
                  {method.desc}
                </p>
              </div>

              {/* Check indicator */}
              <div className={`transition-all duration-300 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <CheckCircle2 className="text-[#d4af37]" size={24} />
              </div>

              {/* Arrow for non-selected */}
              <ChevronRight 
                className={`text-gray-600 transition-all duration-300 flex-shrink-0
                          ${isSelected ? 'opacity-0 -translate-x-2' : 'opacity-100 group-hover:translate-x-1'}`} 
                size={20} 
              />

              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={isSelected}
                onChange={() => handleMethodSelect(method.id)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>

      {/* Card payment form */}
      {selectedMethod === 'card' && (
        <div className="mt-6 p-6 bg-[#16213e] rounded-2xl border border-gray-800 animate-fade-in">
          {/* Visual card preview */}
          <div className="mb-6 perspective-1000">
            <div 
              className={`relative w-full max-w-sm mx-auto h-48 rounded-2xl p-6 text-white shadow-2xl
                        transition-transform duration-500 transform-style-3d
                        ${isCardFlipped ? 'rotate-y-180' : ''}`}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              {/* Front of card */}
              <div className={`absolute inset-0 backface-hidden ${isCardFlipped ? 'opacity-0' : 'opacity-100'}`}>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-8 bg-yellow-400/80 rounded" />
                  <CreditCard size={32} className="opacity-50" />
                </div>
                <div className="font-mono text-xl tracking-widest mb-4">
                  {cardData.number || '•••• •••• •••• ••••'}
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-70 uppercase">Card Holder</p>
                    <p className="font-medium truncate max-w-[150px]">
                      {cardData.name || 'YOUR NAME'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-70 uppercase">Expires</p>
                    <p className="font-medium">{cardData.expiry || 'MM/YY'}</p>
                  </div>
                </div>
              </div>

              {/* Back of card */}
              <div 
                className={`absolute inset-0 backface-hidden rotate-y-180 ${isCardFlipped ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)' }}
              >
                <div className="w-full h-10 bg-black/30 my-4" />
                <div className="px-4">
                  <p className="text-xs opacity-70 mb-1">CVV</p>
                  <div className="bg-white/20 rounded px-3 py-2 font-mono text-lg">
                    {cardData.cvv || '•••'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  type="text"
                  name="number"
                  value={cardData.number}
                  onChange={handleCardChange}
                  onFocus={() => setIsCardFlipped(false)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg pl-10 pr-4 py-3 
                           text-[#f5f5dc] placeholder-gray-500 focus:outline-none focus:border-[#d4af37]
                           transition-all font-mono tracking-wider"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Card Holder Name</label>
              <input 
                type="text"
                name="name"
                value={cardData.name}
                onChange={handleCardChange}
                onFocus={() => setIsCardFlipped(false)}
                placeholder="JOHN DOE"
                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg px-4 py-3 
                         text-[#f5f5dc] placeholder-gray-500 focus:outline-none focus:border-[#d4af37]
                         transition-all uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                <input 
                  type="text"
                  name="expiry"
                  value={cardData.expiry}
                  onChange={handleCardChange}
                  onFocus={() => setIsCardFlipped(false)}
                  placeholder="MM/YY"
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg px-4 py-3 
                           text-[#f5f5dc] placeholder-gray-500 focus:outline-none focus:border-[#d4af37]
                           transition-all font-mono text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  CVV
                  <button 
                    onMouseEnter={() => setIsCardFlipped(true)}
                    onMouseLeave={() => setIsCardFlipped(false)}
                    className="text-gray-500 hover:text-[#d4af37] transition-colors"
                  >
                    <AlertCircle size={14} />
                  </button>
                </label>
                <input 
                  type="password"
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleCardChange}
                  onFocus={() => setIsCardFlipped(true)}
                  onBlur={() => setIsCardFlipped(false)}
                  placeholder="123"
                  className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg px-4 py-3 
                           text-[#f5f5dc] placeholder-gray-500 focus:outline-none focus:border-[#d4af37]
                           transition-all font-mono text-center tracking-widest"
                />
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <Shield className="text-green-500 flex-shrink-0" size={16} />
              <p className="text-green-400 text-xs">
                Your payment info is encrypted and secure. We never store your CVV.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* UPI Payment */}
      {selectedMethod === 'upi' && (
        <div className="mt-6 p-6 bg-[#16213e] rounded-2xl border border-gray-800 animate-fade-in text-center">
          <div className="w-48 h-48 mx-auto mb-4 bg-white rounded-xl p-4 flex items-center justify-center">
            <QrCode size={160} className="text-[#1a1a2e]" />
          </div>
          <p className="text-gray-400 text-sm mb-4">Scan with any UPI app</p>
          <div className="flex justify-center gap-4">
            {['Google Pay', 'PhonePe', 'Paytm'].map((app) => (
              <div key={app} className="px-3 py-1.5 bg-[#1a1a2e] rounded-lg text-xs text-gray-400">
                {app}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wallet Payment */}
      {selectedMethod === 'wallet' && (
        <div className="mt-6 p-6 bg-[#16213e] rounded-2xl border border-gray-800 animate-fade-in">
          <div className="grid grid-cols-3 gap-4">
            {['Paytm', 'Mobikwik', 'Freecharge', 'Amazon Pay', 'JioMoney', 'Airtel Money'].map((wallet) => (
              <button
                key={wallet}
                className="p-4 bg-[#1a1a2e] border border-gray-800 rounded-xl hover:border-[#d4af37]/50 
                         hover:bg-[#d4af37]/5 transition-all text-center group"
              >
                <Wallet className="mx-auto mb-2 text-gray-400 group-hover:text-[#d4af37]" size={24} />
                <span className="text-xs text-gray-400 group-hover:text-[#f5f5dc]">{wallet}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cash Payment */}
      {selectedMethod === 'cash' && (
        <div className="mt-6 p-6 bg-[#16213e] rounded-2xl border border-gray-800 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#d4af37]/10 rounded-lg">
              <Sparkles className="text-[#d4af37]" size={24} />
            </div>
            <div>
              <h4 className="text-[#f5f5dc] font-semibold mb-1">Pay at the Cafe</h4>
              <p className="text-gray-400 text-sm mb-3">
                No upfront payment required. Pay with cash or card when you arrive.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#d4af37]">
                <CheckCircle2 size={14} />
                <span>Reservation confirmed instantly</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Payment;