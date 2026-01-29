import React from 'react';
import { Star, Quote } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';

const Reviews = () => {
  const reviews = [
    {
      name: 'Sarah Johnson',
      role: 'Coffee Enthusiast',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      content: 'The best coffee in the city! The atmosphere is perfect for both work and relaxation. The staff is incredibly knowledgeable and friendly.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Regular Customer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      content: 'I have been coming here for 2 years now. The consistency in quality is remarkable. Their cold brew is absolutely legendary!',
      rating: 5,
    },
    {
      name: 'Emma Williams',
      role: 'Food Blogger',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      content: 'A hidden gem! The attention to detail in every cup is evident. Their seasonal specials are always creative and delicious.',
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          title="What Customers Say"
          subtitle="Real reviews from real coffee lovers."
          centered
        />

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="card p-8 relative">
              <Quote className="absolute top-6 right-6 text-accent/20" size={40} />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="text-accent fill-accent" size={18} />
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={review.image} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-accent"
                />
                <div>
                  <h4 className="font-semibold text-secondary">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;