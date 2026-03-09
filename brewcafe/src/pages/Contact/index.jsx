import React from 'react';
import Layout from '../../components/layout/Layout';
import ContactForm from '../../components/contact/ContactForm';
import ContactInfo from '../../components/contact/ContactInfo';

const Contact = () => {
  return (
    <Layout>
      <section className="pt-24 pb-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Get in Touch</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question or feedback? We would love to hear from you. 
            Fill out the form below and we will get back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-secondary">Send us a Message</h2>
                <ContactForm />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-secondary">Contact Information</h2>
              <ContactInfo />
              
              <div className="mt-8 overflow-hidden rounded-2xl border border-gray-800 bg-card">
                <iframe
                  title="BrewCafe location"
                  src="https://www.google.com/maps?q=123+Coffee+Street+New+York+NY+10001&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
