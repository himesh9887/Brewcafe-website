import React from 'react';
import { Clock3, Mail, MapPinned, PhoneCall } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import ContactForm from '../../components/contact/ContactForm';
import ContactInfo from '../../components/contact/ContactInfo';
import { CAFE_CONTACT } from '../../config/contact';

const Contact = () => {
  const quickStats = [
    { icon: PhoneCall, label: 'Call', value: CAFE_CONTACT.phonePrimary, href: `tel:${CAFE_CONTACT.phonePrimary}` },
    { icon: Mail, label: 'Email', value: CAFE_CONTACT.email, href: `mailto:${CAFE_CONTACT.email}` },
    { icon: Clock3, label: 'Hours', value: 'Open daily', href: '#contact-info' },
    { icon: MapPinned, label: 'Visit', value: 'Get directions', href: CAFE_CONTACT.mapUrl },
  ];

  return (
    <Layout>
      <section className="relative overflow-hidden bg-[#111425] pt-24 pb-10 sm:pt-28 sm:pb-14">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-secondary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.28em] text-accent/80 sm:text-sm">Contact BrewCafe</p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-secondary sm:text-5xl md:text-6xl">
                Reach out, reserve faster, or just say hello.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
                From table bookings and catering queries to feedback and partnerships, use any option below and we will get back to you quickly.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4">
                {quickStats.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                  >
                    <item.icon size={18} className="text-accent" />
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-gray-500">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-secondary">{item.value}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="card overflow-hidden p-2">
              <iframe
                title="BrewCafe location"
                src="https://www.google.com/maps?q=123+Coffee+Street+New+York+NY+10001&output=embed"
                className="h-[300px] w-full rounded-[1.25rem] sm:h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark pb-10 pt-6 sm:pb-16 sm:pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            <div className="order-2 lg:order-1">
              <div className="rounded-[2rem] border border-gray-800 bg-card p-5 shadow-2xl sm:p-7 md:p-8">
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-accent/80">Message us</p>
                  <h2 className="mt-2 text-2xl font-bold text-secondary sm:text-3xl">Send us a message</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Fill the form and your message will be submitted instantly.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>

            <div id="contact-info" className="order-1 space-y-6 lg:order-2">
              <div className="rounded-[2rem] border border-accent/20 bg-accent/10 p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-accent/80">Need immediate help?</p>
                <h3 className="mt-2 text-xl font-bold text-secondary">Best way to reach us</h3>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Call for same-day reservations. Email for events, catering, or collaborations.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <a
                    href={`tel:${CAFE_CONTACT.phonePrimary}`}
                    className="rounded-full border border-accent/25 bg-[#111425]/60 px-5 py-3 text-center text-sm font-semibold text-secondary transition-all duration-300 hover:border-accent hover:bg-accent hover:text-primary"
                  >
                    Call Now
                  </a>
                  <a
                    href={`mailto:${CAFE_CONTACT.email}`}
                    className="rounded-full border border-white/10 bg-[#111425]/60 px-5 py-3 text-center text-sm font-semibold text-secondary transition-all duration-300 hover:border-accent hover:text-accent"
                  >
                    Email Us
                  </a>
                </div>
              </div>

              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
