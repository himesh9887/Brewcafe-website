import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  MessageSquare,
  User,
  Phone,
  Mail,
  Check,
  AlertCircle,
  Sparkles,
  Clock,
} from "lucide-react";
import InputField from "../common/Input";

const BookingForm = ({ formData, setFormData }) => {
  const [focusedField, setFocusedField] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);
  const [formProgress, setFormProgress] = useState(0);

  const today = new Date().toISOString().split("T")[0];

  // Calculate form progress
  useEffect(() => {
    const fields = ["name", "phone", "email", "date", "guests"];
    const filledFields = fields.filter(
      (field) => formData[field] && formData[field] !== "",
    );
    const progress = (filledFields.length / fields.length) * 100;
    setFormProgress(progress);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "requests") {
      setCharCount(value.length);
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (field) => {
    setFocusedField(null);
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let error = null;

    switch (field) {
      case "name":
        if (!value || value.length < 2) {
          error = "Name must be at least 2 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Name should only contain letters";
        }
        break;
      case "phone":
        if (!value || value.length < 10) {
          error = "Please enter a valid phone number";
        } else if (!/^\d+$/.test(value)) {
          error = "Phone should only contain numbers";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "date":
        if (!value) {
          error = "Please select a date";
        } else {
          const selectedDate = new Date(value);
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          if (selectedDate < currentDate) {
            error = "Date cannot be in the past";
          }
        }
        break;
      case "guests":
        if (!value) {
          error = "Please select number of guests";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const isFieldValid = (field) => {
    return touchedFields[field] && formData[field] && !errors[field];
  };

  const getFieldStatus = (field) => {
    if (!touchedFields[field]) return "neutral";
    if (errors[field]) return "error";
    if (formData[field]) return "success";
    return "neutral";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-[#d4af37]/10 rounded-xl border border-[#d4af37]/20">
          <User className="text-[#d4af37]" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#f5f5dc]">Guest Details</h3>
          <p className="text-gray-400 text-sm">Tell us about yourself</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Form Completion</span>
          <span className="text-[#d4af37] font-semibold">
            {Math.round(formProgress)}%
          </span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d4af37] to-[#fde047] transition-all duration-500 ease-out"
            style={{ width: `${formProgress}%` }}
          />
        </div>
      </div>

      {/* Name & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
            Full Name
            <span className="text-[#d4af37]">*</span>
            {isFieldValid("name") && (
              <Check size={14} className="text-green-500" />
            )}
          </label>
          <div className="relative">
            <User
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300
                         ${focusedField === "name" ? "text-[#d4af37]" : "text-gray-500"}`}
              size={20}
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField("name")}
              onBlur={() => handleBlur("name")}
              placeholder="John Doe"
              className={`w-full bg-[#1a1a2e] border rounded-lg pl-10 pr-4 py-3 text-[#f5f5dc] 
                        placeholder-gray-500 focus:outline-none transition-all duration-300
                        ${
                          errors.name && touchedFields.name
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : focusedField === "name"
                              ? "border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                              : "border-gray-700 hover:border-gray-600"
                        }
                        ${isFieldValid("name") ? "border-green-500/50" : ""}`}
            />
            {isFieldValid("name") && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              </div>
            )}
          </div>
          {errors.name && touchedFields.name && (
            <p className="text-red-400 text-xs flex items-center gap-1 animate-shake">
              <AlertCircle size={12} />
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
            Phone Number
            <span className="text-[#d4af37]">*</span>
            {isFieldValid("phone") && (
              <Check size={14} className="text-green-500" />
            )}
          </label>
          <div className="relative">
            <Phone
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300
                         ${focusedField === "phone" ? "text-[#d4af37]" : "text-gray-500"}`}
              size={20}
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => handleBlur("phone")}
              placeholder="9999999999"
              maxLength={10}
              className={`w-full bg-[#1a1a2e] border rounded-lg pl-10 pr-4 py-3 text-[#f5f5dc] 
                        placeholder-gray-500 focus:outline-none transition-all duration-300
                        ${
                          errors.phone && touchedFields.phone
                            ? "border-red-500 focus:border-red-500"
                            : focusedField === "phone"
                              ? "border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                              : "border-gray-700 hover:border-gray-600"
                        }
                        ${isFieldValid("phone") ? "border-green-500/50" : ""}`}
            />
          </div>
          {errors.phone && touchedFields.phone && (
            <p className="text-red-400 text-xs flex items-center gap-1 animate-shake">
              <AlertCircle size={12} />
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
          Email Address
          <span className="text-[#d4af37]">*</span>
          {isFieldValid("email") && (
            <Check size={14} className="text-green-500" />
          )}
        </label>
        <div className="relative">
          <Mail
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300
                       ${focusedField === "email" ? "text-[#d4af37]" : "text-gray-500"}`}
            size={20}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => handleBlur("email")}
            placeholder="john@gmail.com"
            className={`w-full bg-[#1a1a2e] border rounded-lg pl-10 pr-4 py-3 text-[#f5f5dc] 
                      placeholder-gray-500 focus:outline-none transition-all duration-300
                      ${
                        errors.email && touchedFields.email
                          ? "border-red-500 focus:border-red-500"
                          : focusedField === "email"
                            ? "border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                            : "border-gray-700 hover:border-gray-600"
                      }
                      ${isFieldValid("email") ? "border-green-500/50" : ""}`}
          />
        </div>
        {errors.email && touchedFields.email && (
          <p className="text-red-400 text-xs flex items-center gap-1 animate-shake">
            <AlertCircle size={12} />
            {errors.email}
          </p>
        )}
      </div>

      {/* Date & Guests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
            Preferred Date
            <span className="text-[#d4af37]">*</span>
            {isFieldValid("date") && (
              <Check size={14} className="text-green-500" />
            )}
          </label>
          <div className="relative">
            <Calendar
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 z-10
                         ${focusedField === "date" ? "text-[#d4af37]" : "text-gray-500"}`}
              size={20}
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onFocus={() => setFocusedField("date")}
              onBlur={() => handleBlur("date")}
              min={today}
              className={`w-full bg-[#1a1a2e] border rounded-lg pl-10 pr-4 py-3 text-[#f5f5dc] 
                        focus:outline-none transition-all duration-300 cursor-pointer
                        [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert
                        [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50
                        [&::-webkit-calendar-picker-indicator]:hover:opacity-100
                        ${
                          errors.date && touchedFields.date
                            ? "border-red-500"
                            : focusedField === "date"
                              ? "border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                              : "border-gray-700 hover:border-gray-600"
                        }
                        ${isFieldValid("date") ? "border-green-500/50" : ""}`}
            />
          </div>
          {errors.date && touchedFields.date && (
            <p className="text-red-400 text-xs flex items-center gap-1 animate-shake">
              <AlertCircle size={12} />
              {errors.date}
            </p>
          )}
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
            Number of Guests
            <span className="text-[#d4af37]">*</span>
            {isFieldValid("guests") && (
              <Check size={14} className="text-green-500" />
            )}
          </label>
          <div className="relative">
            <Users
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 z-10
                         ${focusedField === "guests" ? "text-[#d4af37]" : "text-gray-500"}`}
              size={20}
            />
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              onFocus={() => setFocusedField("guests")}
              onBlur={() => handleBlur("guests")}
              className={`w-full bg-[#1a1a2e] border rounded-lg pl-10 pr-10 py-3 text-[#f5f5dc] 
                        focus:outline-none transition-all duration-300 cursor-pointer appearance-none
                        ${
                          errors.guests && touchedFields.guests
                            ? "border-red-500"
                            : focusedField === "guests"
                              ? "border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                              : "border-gray-700 hover:border-gray-600"
                        }
                        ${isFieldValid("guests") ? "border-green-500/50" : ""}`}
            >
              <option value="">Select guests</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n} className="bg-[#1a1a2e]">
                  {n} {n === 1 ? "Person" : "People"}
                </option>
              ))}
              <option value="8+" className="bg-[#1a1a2e]">
                8+ People (Large Group)
              </option>
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.guests && touchedFields.guests && (
            <p className="text-red-400 text-xs flex items-center gap-1 animate-shake">
              <AlertCircle size={12} />
              {errors.guests}
            </p>
          )}
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#d4af37]" />
            Special Requests
            <span className="text-gray-500 text-xs font-normal">
              (Optional)
            </span>
          </span>
          <span
            className={`text-xs ${charCount > 200 ? "text-red-400" : "text-gray-500"}`}
          >
            {charCount}/300
          </span>
        </label>
        <div className="relative">
          <MessageSquare
            className={`absolute left-3 top-3 transition-colors duration-300
                       ${focusedField === "requests" ? "text-[#d4af37]" : "text-gray-500"}`}
            size={20}
          />
          <textarea
            name="requests"
            value={formData.requests}
            onChange={handleChange}
            onFocus={() => setFocusedField("requests")}
            onBlur={() => setFocusedField(null)}
            placeholder="Any dietary restrictions, special occasions, window seating preference, or anything else we should know..."
            rows={4}
            maxLength={300}
            className={`w-full bg-[#1a1a2e] border rounded-lg pl-10 pr-4 py-3 text-[#f5f5dc] 
                      placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none
                      ${
                        focusedField === "requests"
                          ? "border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                          : "border-gray-700 hover:border-gray-600"
                      }
                      ${charCount > 200 ? "border-yellow-500/50" : ""}`}
          />
        </div>
        <p className="text-gray-500 text-xs flex items-center gap-1">
          <Clock size={12} />
          Examples: "Window seat preferred", "Anniversary celebration",
          "Allergic to nuts"
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default BookingForm;
