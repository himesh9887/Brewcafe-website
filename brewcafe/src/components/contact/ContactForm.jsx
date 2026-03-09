import React, { useState } from 'react';
import { Headphones, LoaderCircle, Mail, MessageSquareText, Send, User } from 'lucide-react';
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
      <div className="rounded-[1.5rem] border border-accent/15 bg-accent/5 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-accent/15 p-3 text-accent">
            <Headphones size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-secondary">We usually reply within 1 business day</h3>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Share your question, booking issue, feedback, or partnership request.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <Input
          label="Your Name"
          icon={User}
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <Input
        label="Subject"
        icon={MessageSquareText}
        placeholder="What is this about?"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        required
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Message</label>
        <textarea
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="input-field min-h-36 resize-none"
          placeholder="How can we help you?"
          required
        />
      </div>

      {feedback.message && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            feedback.type === 'success'
              ? 'border-green-500/30 bg-green-500/10 text-green-300'
              : 'border-red-500/30 bg-red-500/10 text-red-300'
          }`}
        >
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
