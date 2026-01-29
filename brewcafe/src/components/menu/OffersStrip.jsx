import React from 'react';
import { Tag, Clock } from 'lucide-react';

const OffersStrip = () => {
  const offers = [
    {
      icon: Tag,
      title: 'Happy Hour',
      desc: '2-4 PM • 20% off all cold drinks',
      color: 'bg-blue-500/20 text-blue-400',
    },
    {
      icon: Clock,
      title: 'Early Bird',
      desc: '7-9 AM • Free pastry with coffee',
      color: 'bg-orange-500/20 text-orange-400',
    },
  ];

  return (
    <section className="py-12 bg-card border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {offers.map((offer, idx) => (
            <div key={idx} className="flex items-center gap-4 p-6 rounded-xl bg-dark border border-gray-800">
              <div className={`p-3 rounded-lg ${offer.color}`}>
                <offer.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-secondary text-lg">{offer.title}</h3>
                <p className="text-gray-400">{offer.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersStrip;