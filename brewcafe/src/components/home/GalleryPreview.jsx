import React from 'react';
import SectionTitle from '../common/SectionTitle';

const GalleryPreview = () => {
  const images = [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=400&h=400&fit=crop',
  ];

  return (
    <section className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          title="Our Space"
          subtitle="Take a peek inside our cozy cafe atmosphere designed for comfort and connection."
          centered
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className={`relative group overflow-hidden rounded-xl aspect-square ${idx === 0 || idx === 5 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img 
                src={img} 
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;