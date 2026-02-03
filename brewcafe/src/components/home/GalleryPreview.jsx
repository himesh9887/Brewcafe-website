import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../common/SectionTitle';
import { X, ZoomIn, MapPin, Users, Coffee } from 'lucide-react';

const GalleryPreview = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=800&fit=crop',
      alt: 'Cozy Interior',
      span: 'md:col-span-2 md:row-span-2',
      caption: 'Our Signature Seating Area',
      icon: Users,
    },
    {
      src: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400&h=400&fit=crop',
      alt: 'Coffee Art',
      caption: 'Latte Art Perfection',
      icon: Coffee,
    },
    {
      src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=400&fit=crop',
      alt: 'Barista at Work',
      caption: 'Expert Baristas',
      icon: Coffee,
    },
    {
      src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
      alt: 'Fresh Beans',
      caption: 'Premium Coffee Beans',
      icon: MapPin,
    },
    {
      src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop',
      alt: 'Window View',
      caption: 'Natural Lighting',
      icon: Users,
    },
    {
      src: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&h=800&fit=crop',
      alt: 'Coffee Setup',
      span: 'md:col-span-2 md:row-span-2',
      caption: 'Brewing Station',
      icon: Coffee,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Close lightbox on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    
    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-[#16213e] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionTitle 
            title="Our Space"
            subtitle="Take a peek inside our cozy cafe atmosphere designed for comfort and connection."
            centered
          />
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[200px] sm:auto-rows-[200px] md:auto-rows-[180px]">
          {images.map((image, idx) => (
            <div 
              key={idx}
              className={`relative group overflow-hidden rounded-xl cursor-pointer
                         ${image.span || ''} 
                         transition-all duration-700 ease-out
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedImage(image)}
            >
              {/* Skeleton loader */}
              <div className="absolute inset-0 bg-[#1a1a2e] animate-pulse" 
                   style={{ opacity: hoveredIndex === idx ? 0 : 0.5 }} />

              {/* Image */}
              <img 
                src={image.src} 
                alt={image.alt}
                className={`w-full h-full object-cover transition-all duration-700 ease-out
                          ${hoveredIndex === idx ? 'scale-110 brightness-75' : 'scale-100 brightness-100'}`}
                loading="lazy"
              />

              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/20 to-transparent
                             transition-opacity duration-300 ${hoveredIndex === idx ? 'opacity-90' : 'opacity-0'}`} />

              {/* Content on hover */}
              <div className={`absolute inset-0 flex flex-col justify-end p-4 sm:p-6
                             transition-all duration-500 ${hoveredIndex === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-[#d4af37]/20 backdrop-blur-sm">
                    <image.icon size={16} className="text-[#d4af37]" />
                  </div>
                  <span className="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Explore</span>
                </div>
                <h3 className="text-white font-bold text-sm sm:text-lg mb-1">{image.caption}</h3>
                <p className="text-gray-300 text-xs sm:text-sm">{image.alt}</p>
              </div>

              {/* Zoom icon */}
              <div className={`absolute top-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur-md
                             transition-all duration-300 hover:bg-[#d4af37] hover:text-[#1a1a2e]
                             ${hoveredIndex === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <ZoomIn size={18} className="text-white" />
              </div>

              {/* Corner accent */}
              <div className={`absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-[#d4af37] border-r-[40px] border-r-transparent
                             transition-all duration-300 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className={`text-center mt-8 sm:mt-12 transition-all duration-1000 delay-700
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button className="group inline-flex items-center gap-2 text-[#d4af37] hover:text-[#fde047] 
                           transition-colors duration-300 text-sm sm:text-base font-medium">
            View Full Gallery
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center
                           group-hover:bg-[#d4af37] group-hover:text-[#1a1a2e] transition-all duration-300">
              →
            </span>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm
                     animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 
                     rounded-full transition-all duration-300 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>

          <div 
            className="relative max-w-5xl w-full max-h-[90vh] animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 className="text-white text-xl font-bold mb-1">{selectedImage.caption}</h3>
              <p className="text-gray-300 text-sm">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in-95 {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-in {
          animation-duration: 0.3s;
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fade-in;
        }
        .zoom-in-95 {
          animation-name: zoom-in-95;
        }
      `}</style>
    </section>
  );
};

export default GalleryPreview;