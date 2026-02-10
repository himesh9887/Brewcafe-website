import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  Download, 
  Share2, 
  MapPin, 
  Users,
  Coffee,
  Sparkles,
  Star,
  ArrowRight,
  Mail,
  Phone
} from 'lucide-react';
import Button from '../common/Button';

const Success = ({ bookingData, onReset }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [bookingId] = useState(() => 'BC' + Date.now().toString().slice(-6).toUpperCase());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Generate confetti
    const newConfetti = [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      color: ['#d4af37', '#fde047', '#10b981', '#3b82f6'][Math.floor(Math.random() * 4)],
    }));
    setConfetti(newConfetti);

    // Auto-hide confetti after animation
    const timer = setTimeout(() => setConfetti([]), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My BrewCafe Reservation',
          text: `I've booked a table at BrewCafe on ${bookingData.date} at ${bookingData.time}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`BrewCafe Booking: ${bookingId} - ${bookingData.date} at ${bookingData.time}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    // Create a simple text receipt
    const receipt = `
BREWCAFE - BOOKING CONFIRMATION
================================
Booking ID: ${bookingId}
Date: ${bookingData.date}
Time: ${bookingData.time}
Guests: ${bookingData.guests}
Name: ${bookingData.name}
Email: ${bookingData.email}

Location: 123 Coffee Street, NY 10001

Thank you for choosing BrewCafe!
    `.trim();

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BrewCafe-Booking-${bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const addToCalendar = () => {
    const event = {
      title: 'BrewCafe Reservation',
      description: `Table for ${bookingData.guests} at BrewCafe`,
      startTime: new Date(`${bookingData.date}T${bookingData.time}`).toISOString(),
      endTime: new Date(`${bookingData.date}T${bookingData.time}`).toISOString(),
    };
    
    // Google Calendar link
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&dates=${event.startTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${event.endTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className={`relative min-h-[80vh] flex items-center justify-center py-12 transition-all duration-1000
                   ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Confetti animation */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="fixed w-2 h-2 rounded-full animate-confetti pointer-events-none z-50"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {/* Success icon with animation */}
        <div className={`mb-8 transition-all duration-1000 delay-300 transform
                       ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          <div className="relative inline-block">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 
                          flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.4)] animate-success-bounce">
              <CheckCircle className="text-white" size={56} strokeWidth={2.5} />
            </div>
            
            {/* Orbiting stars */}
            <Star className="absolute -top-2 -right-2 text-[#d4af37] fill-current animate-pulse" size={20} />
            <Star className="absolute -bottom-1 -left-3 text-[#fde047] fill-current animate-pulse delay-300" size={16} />
            <Sparkles className="absolute top-0 -left-8 text-[#d4af37] animate-pulse delay-500" size={24} />
          </div>
        </div>

        {/* Heading */}
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 delay-500
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="bg-gradient-to-r from-green-400 via-[#d4af37] to-green-400 bg-clip-text text-transparent 
                         animate-gradient-x bg-[length:200%_auto]">
            Booking Confirmed!
          </span>
        </h2>

        <p className={`text-gray-400 text-base sm:text-lg mb-8 max-w-md mx-auto transition-all duration-1000 delay-600
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          We've sent a confirmation to{' '}
          <span className="text-[#d4af37] font-medium">{bookingData.email}</span>
        </p>

        {/* Booking details card */}
        <div className={`bg-[#16213e] rounded-2xl p-6 sm:p-8 border border-gray-800 mb-8 text-left shadow-2xl
                       transition-all duration-1000 delay-700 hover:border-[#d4af37]/30
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Header with ID */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-800">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Booking Reference</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-mono font-bold text-[#d4af37]">{bookingId}</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(bookingId);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="text-xs px-2 py-1 bg-[#d4af37]/10 text-[#d4af37] rounded hover:bg-[#d4af37]/20 transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Confirmed</span>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 bg-[#1a1a2e] rounded-xl group hover:bg-[#1a1a2e]/80 transition-colors">
              <div className="p-3 bg-[#d4af37]/10 rounded-lg group-hover:scale-110 transition-transform">
                <Calendar className="text-[#d4af37]" size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Date</p>
                <p className="text-[#f5f5dc] font-semibold">{bookingData.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#1a1a2e] rounded-xl group hover:bg-[#1a1a2e]/80 transition-colors">
              <div className="p-3 bg-[#d4af37]/10 rounded-lg group-hover:scale-110 transition-transform">
                <Clock className="text-[#d4af37]" size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Time</p>
                <p className="text-[#f5f5dc] font-semibold">{bookingData.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#1a1a2e] rounded-xl group hover:bg-[#1a1a2e]/80 transition-colors">
              <div className="p-3 bg-[#d4af37]/10 rounded-lg group-hover:scale-110 transition-transform">
                <Users className="text-[#d4af37]" size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Guests</p>
                <p className="text-[#f5f5dc] font-semibold">{bookingData.guests} People</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#1a1a2e] rounded-xl group hover:bg-[#1a1a2e]/80 transition-colors">
              <div className="p-3 bg-[#d4af37]/10 rounded-lg group-hover:scale-110 transition-transform">
                <MapPin className="text-[#d4af37]" size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Location</p>
                <p className="text-[#f5f5dc] font-semibold text-sm">BrewCafe Downtown</p>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={14} className="text-[#d4af37]" />
                <span>{bookingData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={14} className="text-[#d4af37]" />
                <span>{bookingData.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className={`flex flex-wrap justify-center gap-3 mb-8 transition-all duration-1000 delay-800
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button 
            onClick={addToCalendar}
            className="flex items-center gap-2 px-4 py-2 bg-[#16213e] border border-gray-800 rounded-lg
                     text-gray-300 hover:border-[#d4af37]/50 hover:text-[#d4af37] transition-all text-sm"
          >
            <Calendar size={16} />
            Add to Calendar
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-[#16213e] border border-gray-800 rounded-lg
                     text-gray-300 hover:border-[#d4af37]/50 hover:text-[#d4af37] transition-all text-sm"
          >
            <Share2 size={16} />
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>

        {/* Main actions */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-900
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            variant="secondary" 
            onClick={onReset}
            className="px-8 py-3"
          >
            Book Another Table
          </Button>
          
          <Button 
            onClick={handleDownload}
            className="px-8 py-3 flex items-center justify-center gap-2 bg-[#d4af37] text-[#1a1a2e]
                     hover:bg-[#fde047] hover:scale-105 transition-all"
          >
            <Download size={18} />
            Download Receipt
          </Button>
        </div>

        {/* Footer note */}
        <p className={`text-gray-500 text-xs mt-8 transition-all duration-1000 delay-1000
                     ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Need help? Contact us at{' '}
          <a href="tel:+15551234567" className="text-[#d4af37] hover:underline">+1 (555) 123-4567</a>
        </p>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes success-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        .animate-confetti {
          animation: confetti-fall linear forwards;
        }
        .animate-success-bounce {
          animation: success-bounce 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% auto;
        }
      `}</style>
    </div>
  );
};

export default Success;