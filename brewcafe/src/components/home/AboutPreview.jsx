import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Leaf, Heart } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

const AboutPreview = () => {
  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      desc: 'Sourced from the finest coffee farms worldwide',
    },
    {
      icon: Leaf,
      title: 'Sustainable',
      desc: 'Eco-friendly practices from bean to cup',
    },
    {
      icon: Heart,
      title: 'Made with Love',
      desc: 'Crafted by passionate expert baristas',
    },
  ];

  return (
    <section className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1442512595367-42736f3e531b?w=400&h=500&fit=crop" 
              alt="Coffee making" 
              className="rounded-2xl w-full h-64 object-cover shadow-xl"
            />
            <img 
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=500&fit=crop" 
              alt="Coffee cup" 
              className="rounded-2xl w-full h-64 object-cover shadow-xl mt-8"
            />
          </div>

          {/* Content */}
          <div>
            <SectionTitle 
              title="Our Story"
              subtitle="Founded in 2014, BrewCafe began with a simple mission: to serve exceptional coffee that brings people together."
            />
            
            <p className="text-gray-400 mb-8 leading-relaxed">
              Every bean we roast carries the story of its origin - from the misty highlands of Ethiopia 
              to the volcanic soils of Guatemala. We believe that great coffee is not just about taste, 
              but about the entire journey from farm to your cup.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {features.map((feature, idx) => (
                <div key={idx} className="text-center p-4 rounded-lg bg-card hover:bg-card-hover transition-colors">
                  <feature.icon className="mx-auto text-accent mb-3" size={28} />
                  <h3 className="font-semibold text-secondary mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button variant="outline">
                Learn More
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;