import React, { useState } from 'react';
import { Calendar, Users, Clock, MessageSquare } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

const BookingForm = ({ onSubmit, formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          required
        />
      </div>

      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="john@example.com"
        required
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Date <span className="text-accent">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={today}
              required
              className="input-field pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Number of Guests <span className="text-accent">*</span>
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="input-field pl-10 appearance-none cursor-pointer"
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
              ))}
              <option value="more">8+ People</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Special Requests
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 text-gray-500" size={20} />
          <textarea
            name="requests"
            value={formData.requests}
            onChange={handleChange}
            placeholder="Any dietary restrictions, special occasions, or seating preferences..."
            rows={3}
            className="input-field pl-10 resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingForm;