import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote, ThumbsUp } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';

const Reviews = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [likedReviews, setLikedReviews] = useState({});
  const sectionRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Coffee Enthusiast',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      content: 'The best coffee in the city! The atmosphere is perfect for both work and relaxation. The staff is incredibly knowledgeable and friendly.',
      rating: 5,
      likes: 124,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Regular Customer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      content: 'I have been coming here for 2 years now. The consistency in quality is remarkable. Their cold brew is absolutely legendary!',
      rating: 5,
      likes: 89,
    },
    {
      id: 3,
      name: 'Emma Williams',
      role: 'Food Blogger',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      content: 'A hidden gem! The attention to detail in every cup is evident. Their seasonal specials are always creative and delicious.',
      rating: 5,
      likes: 256,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-[#0f0f1e] relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-10 text-[#d4af37]/5 animate-float-slow">
        <Quote size={120} />
      </div>
      <div className="absolute bottom-20 right-10 text-[#d4af37]/5 animate-float-medium rotate-180">
        <Quote size={100} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionTitle 
            title="What Customers Say"
            subtitle="Real reviews from real coffee lovers."
            centered
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, idx) => (
            <div 
              key={review.id}
              className={`group relative bg-[#16213e] rounded-2xl p-6 sm:p-8 border border-gray-800
                         hover:border-[#d4af37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]
                         hover:-translate-y-2 transition-all duration-500 cursor-default
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${300 + (idx * 150)}ms` }}
              onMouseEnter={() => setActiveCard(review.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Quote Icon with animation */}
              <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 transition-all duration-500
                            ${activeCard === review.id ? 'text-[#d4af37]/40 scale-110 rotate-12' : 'text-[#d4af37]/10'}`}>
                <Quote size={40} />
              </div>

              {/* Stars with hover effect */}
              <div className="flex items-center gap-1 mb-4 sm:mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`text-[#d4af37] fill-[#d4af37] transition-all duration-300
                              ${activeCard === review.id ? 'hover:scale-125' : ''}`}
                    size={18}
                    style={{ 
                      transitionDelay: activeCard === review.id ? `${i * 50}ms` : '0ms',
                      transform: activeCard === review.id ? `translateY(${Math.sin(i) * 2}px)` : 'none'
                    }}
                  />
                ))}
                <span className="ml-2 text-xs text-gray-500 font-medium">Verified</span>
              </div>

              {/* Review Content */}
              <p className={`text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base transition-colors duration-300
                           ${activeCard === review.id ? 'text-[#f5f5dc]' : ''}`}>
                <span className="text-[#d4af37] text-lg">"</span>
                {review.content}
                <span className="text-[#d4af37] text-lg">"</span>
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative">
                    <img 
                      src={review.image} 
                      alt={review.name}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 transition-all duration-500
                                ${activeCard === review.id ? 'border-[#d4af37] scale-110' : 'border-[#d4af37]/50'}`}
                    />
                    {/* Online indicator */}
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#16213e]
                                   transition-transform duration-300 ${activeCard === review.id ? 'scale-100' : 'scale-0'}`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-sm sm:text-base transition-colors duration-300
                                  ${activeCard === review.id ? 'text-[#d4af37]' : 'text-[#f5f5dc]'}`}>
                      {review.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>

                {/* Like Button */}
                <button 
                  onClick={(e) => handleLike(review.id, e)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                           transition-all duration-300 ${likedReviews[review.id]
                             ? 'bg-red-500/20 text-red-400'
                             : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
                           }`}
                >
                  <ThumbsUp 
                    size={14} 
                    className={`transition-transform duration-300 ${likedReviews[review.id] ? 'fill-current scale-110' : ''}`}
                  />
                  {review.likes + (likedReviews[review.id] ? 1 : 0)}
                </button>
              </div>

              {/* Decorative line */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#d4af37] to-[#fde047]
                            transition-all duration-500 rounded-b-2xl
                            ${activeCard === review.id ? 'w-full' : 'w-0'}`} />
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className={`mt-12 sm:mt-16 flex flex-wrap justify-center items-center gap-6 sm:gap-8
                       transition-all duration-1000 delay-700
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="flex -space-x-2">
              {reviews.map((review, idx) => (
                <img 
                  key={idx}
                  src={review.image}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-[#0f0f1e] object-cover"
                />
              ))}
            </div>
            <span className="text-sm">500+ Happy Customers</span>
          </div>
          <div className="h-4 w-px bg-gray-700 hidden sm:block" />
          <div className="flex items-center gap-1 text-[#d4af37]">
            <Star size={16} className="fill-current" />
            <span className="font-bold">4.9</span>
            <span className="text-gray-400 text-sm ml-1">Average Rating</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(180deg); }
          50% { transform: translateY(-15px) rotate(175deg); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Reviews;