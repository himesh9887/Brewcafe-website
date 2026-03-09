import React from 'react';
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { CAFE_CONTACT } from '../../config/contact';

const ContactInfo = () => {
  const info = [
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: [CAFE_CONTACT.addressLine1, CAFE_CONTACT.addressLine2],
      href: CAFE_CONTACT.mapUrl,
      action: 'Open map',
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: [CAFE_CONTACT.phonePrimary, CAFE_CONTACT.phoneSecondary],
      href: `tel:${CAFE_CONTACT.phonePrimary}`,
      action: 'Call now',
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: [CAFE_CONTACT.email, CAFE_CONTACT.supportEmail],
      href: `mailto:${CAFE_CONTACT.email}`,
      action: 'Send email',
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      lines: ['Mon-Fri: 7:00 AM - 9:00 PM', 'Sat-Sun: 8:00 AM - 10:00 PM'],
      href: null,
      action: 'Open today',
    },
  ];

  return (
    <div className="space-y-4">
      {info.map((item) => {
        const Wrapper = item.href ? 'a' : 'div';

        return (
          <Wrapper
            key={item.title}
            href={item.href || undefined}
            target={item.href?.startsWith('http') ? '_blank' : undefined}
            rel={item.href?.startsWith('http') ? 'noreferrer' : undefined}
            className="group block rounded-[1.5rem] border border-gray-800 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-accent/10 p-3 text-accent transition-transform duration-300 group-hover:scale-105">
                <item.icon size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-secondary">{item.title}</h3>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-accent/70">{item.action}</span>
                </div>
                <div className="space-y-1">
                  {item.lines.map((line) => (
                    <p key={line} className="text-sm leading-6 text-gray-400">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Wrapper>
        );
      })}

      <a
        href={CAFE_CONTACT.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-5 py-3 text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-primary"
      >
        <Navigation size={16} />
        Get Directions
      </a>
    </div>
  );
};

export default ContactInfo;
