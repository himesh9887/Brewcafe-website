import React, { useState } from 'react';
import { Send } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <Input
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>
      
      <Input
        label="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({...formData, subject: e.target.value})}
        required
      />
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Message</label>
        <textarea
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="input-field resize-none"
          placeholder="How can we help you?"
          required
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto" disabled={submitted}>
        {submitted ? 'Message Sent!' : 'Send Message'}
        <Send size={18} />
      </Button>
    </form>
  );
};

export default ContactForm;