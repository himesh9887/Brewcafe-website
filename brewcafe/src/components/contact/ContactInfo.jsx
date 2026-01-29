import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo = () => {
  const info = [
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: ['123 Coffee Street', 'Brew District, NY 10001'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: ['hello@brewcafe.com', 'support@brewcafe.com'],
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      lines: ['Mon-Fri: 7am - 9pm', 'Sat-Sun: 8am - 10pm'],
    },
  ];

  return (
    <div className="space-y-6">
      {info.map((item, idx) => (
        <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-card border border-gray-800">
          <div className="p-3 rounded-lg bg-accent/10 text-accent">
            <item.icon size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-secondary mb-1">{item.title}</h3>
            {item.lines.map((line, i) => (
              <p key={i} className="text-gray-400 text-sm">{line}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;