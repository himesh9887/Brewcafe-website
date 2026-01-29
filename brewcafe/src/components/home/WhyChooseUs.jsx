import React from 'react';
import { Coffee, Clock, Truck, Shield } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Coffee,
      title: 'Premium Beans',
      description: 'We source only the top 1% of Arabica beans from ethical farms around the world.',
    },
    {
      icon: Clock,
      title: 'Fresh Roasted',
      description: 'Our beans are roasted in small batches daily to ensure maximum freshness and flavor.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Hot and fresh delivered to your door within 30 minutes or your money back.',
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'Not satisfied? We will remake your drink or refund your money, no questions asked.',
    },
  ];

  return (
    <section className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          title="Why Choose Us"
          subtitle="We are committed to providing the best coffee experience possible."
          centered
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => (
            <div 
              key={idx} 
              className="card p-6 text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center
                            group-hover:bg-accent/20 transition-colors">
                <reason.icon className="text-accent" size={32} />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">{reason.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;