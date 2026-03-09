import React, { useState } from 'react';
import { LoaderCircle, Send } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { api } from '../../services/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      const response = await api.submitContact(formData);
      setSubmitted(true);
      setFeedback({ type: 'success', message: response.message });
      setFormData({ name: '', email: '', subject: '', message: '' });
      window.setTimeout(() => setSubmitted(false), 2500);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to send message' });
    } finally {
      setIsSubmitting(false);
    }
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

      {feedback.message && (
        <div className={`rounded-2xl border px-4 py-3 text-sm ${
          feedback.type === 'success'
            ? 'border-green-500/30 bg-green-500/10 text-green-300'
            : 'border-red-500/30 bg-red-500/10 text-red-300'
        }`}>
          {feedback.message}
        </div>
      )}

      <Button type="submit" className="w-full sm:w-auto" disabled={submitted || isSubmitting}>
        {isSubmitting ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
        {isSubmitting ? <LoaderCircle size={18} className="animate-spin" /> : <Send size={18} />}
      </Button>
    </form>
  );
};

export default ContactForm;
