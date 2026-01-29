import React from 'react';
import { Coffee, Award, Users, Heart } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { value: '10+', label: 'Years of Excellence', icon: Award },
    { value: '50K+', label: 'Happy Customers', icon: Heart },
    { value: '25+', label: 'Expert Baristas', icon: Users },
    { value: '15', label: 'Coffee Varieties', icon: Coffee },
  ];

  const values = [
    {
      title: 'Quality First',
      desc: 'We never compromise on the quality of our beans or brewing process.',
    },
    {
      title: 'Sustainability',
      desc: 'Ethically sourced beans and eco-friendly packaging for a better planet.',
    },
    {
      title: 'Community',
      desc: 'We believe in creating a space where everyone feels welcome and connected.',
    },
    {
      title: 'Innovation',
      desc: 'Constantly exploring new brewing techniques and flavor profiles.',
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">Our Story</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From a small corner shop to your favorite neighborhood cafe, 
            our journey has been fueled by passion and coffee.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop"
              alt="Our Story"
              className="rounded-2xl shadow-2xl"
            />
            <div>
              <h2 className="text-3xl font-bold mb-6 text-secondary">Brewing Since 2014</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                What started as a humble dream between two college friends has grown into 
                a beloved community hub. We opened our doors with a simple mission: serve 
                exceptional coffee that brings people together.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Today, we source our beans directly from farmers in Ethiopia, Colombia,
                Guatemala, and Sumatra, ensuring fair wages and sustainable practices. 
                Every cup tells a story of dedication, from crop to cup.
              </p>
              <Link to="/menu">
                <Button>Explore Our Menu</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl bg-dark border border-gray-800">
                <stat.icon className="mx-auto text-accent mb-4" size={32} />
                <div className="text-3xl font-bold text-secondary mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle 
            title="Our Values"
            subtitle="The principles that guide everything we do."
            centered
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="card p-6 text-center">
                <h3 className="text-xl font-bold text-secondary mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">
            Join the BrewCafe Family
          </h2>
          <p className="text-gray-400 mb-8">
            Whether you are a coffee connoisseur or just looking for a cozy spot to relax, 
            we would love to welcome you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button variant="secondary">Book a Table</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;