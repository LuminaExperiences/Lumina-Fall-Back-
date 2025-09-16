'use client';

import { useState, useEffect } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;  numTickets: number;
  attendeeNames: string[];
  agreeToTerms: boolean;
  photoConsent: boolean;
}

const EventTicketForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    numTickets: 1,
    attendeeNames: [''],
    agreeToTerms: false,
    photoConsent: false,
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Slower form reveal animation
    const timer = setTimeout(() => setShowForm(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [isAnimating, setIsAnimating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (name === 'numTickets') {
      const numTickets = parseInt(value) || 1;
      const currentCount = formData.attendeeNames.length;
      
      if (numTickets !== currentCount) {
        setIsAnimating(true);
        
        if (numTickets > currentCount) {
          // Increasing: First update count to trigger space creation, then add names after delay
          setFormData(prev => ({
            ...prev,
            numTickets
          }));
          
          setTimeout(() => {
            const newAttendeeNames = Array(numTickets).fill('').map((_, i) => formData.attendeeNames[i] || '');
            setFormData(prev => ({
              ...prev,
              attendeeNames: newAttendeeNames
            }));
            setIsAnimating(false);
          }, 300);
        } else {
          // Decreasing: First remove names, then update count after delay
          const newAttendeeNames = Array(numTickets).fill('').map((_, i) => formData.attendeeNames[i] || '');
          setFormData(prev => ({
            ...prev,
            attendeeNames: newAttendeeNames
          }));
          
          setTimeout(() => {
            setFormData(prev => ({
              ...prev,
              numTickets
            }));
            setIsAnimating(false);
          }, 300);
        }
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleAttendeeNameChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      attendeeNames: prev.attendeeNames.map((name, i) => i === index ? value : name)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Replace with your actual Apps Script Web App URL
      const response = await fetch('YOUR_APPS_SCRIPT_WEB_APP_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          numTickets: formData.numTickets,
          attendeeNames: formData.attendeeNames.join(', '),
          photoConsent: formData.photoConsent,
          sharedSecret: 'YOUR_SHARED_SECRET', // Replace with your actual shared secret
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
    phone: '',
          numTickets: 1,
          attendeeNames: [''],
          agreeToTerms: false,
          photoConsent: false,
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'An error occurred while submitting the form.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-[#151618] rounded-lg border border-[#1f1f1f] p-8 text-center">
        <div className="text-green-400 text-6xl mb-4 font-light">✓</div>
        <h2 className="text-2xl font-light text-white mb-4 tracking-wide font-mono">Registration Successful!</h2>
        <p className="text-gray-400 mb-6 font-light tracking-wide">
          Thank you for registering! You will receive a confirmation email shortly.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="bg-black text-white px-6 py-2 rounded border border-[#1f1f1f] hover:bg-[#1f1f1f] transition-colors font-light tracking-wide"
        >
          Register Another Person
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen py-8">
      <div className={`w-full max-w-2xl transition-all duration-1000 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="bg-[#151618] rounded-2xl border border-[#1f1f1f] p-10 shadow-2xl">
          <div className={`text-center mb-8 transition-all duration-1000 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-4xl font-light text-white mb-2 tracking-wide font-mono">The Big Fake Indian Wedding</h1>
            <p className="text-gray-400 font-light tracking-wide">Please fill out the form below to register for the event</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name */}
            <div className={`transition-all duration-700 delay-200 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <label htmlFor="fullName" className="block text-sm font-light text-gray-300 mb-3 tracking-wide font-mono">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black border border-[#1f1f1f] rounded-xl text-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-300 font-light placeholder-gray-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className={`transition-all duration-700 delay-300 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <label htmlFor="email" className="block text-sm font-light text-gray-300 mb-3 tracking-wide font-mono">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black border border-[#1f1f1f] rounded-xl text-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-300 font-light placeholder-gray-500"
                placeholder="Enter your email address"
              />
            </div>


            {/* Phone Number */}
            <div className={`transition-all duration-700 delay-350 ${showForm ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <label htmlFor="phone" className="block text-sm font-light text-gray-300 mb-3 tracking-wide font-mono">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black border border-[#1f1f1f] rounded-xl text-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-300 font-light placeholder-gray-500"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Number of Tickets */}
            <div className={`transition-all duration-700 delay-400 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <label htmlFor="numTickets" className="block text-sm font-light text-gray-300 mb-3 tracking-wide font-mono">
                Number of Tickets *
              </label>
              <select
                id="numTickets"
                name="numTickets"
                value={formData.numTickets}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-black border border-[#1f1f1f] rounded-xl text-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-300 font-light"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Ticket' : 'Tickets'}</option>
                ))}
              </select>
            </div>

            {/* Attendee Names */}
            <div className={`transition-all duration-700 delay-500 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <label className="block text-sm font-light text-gray-300 mb-3 tracking-wide font-mono">
                Attendee Names *
              </label>
              <div className="space-y-3" style={{ minHeight: `${formData.numTickets * 60}px` }}>
                {Array.from({ length: formData.numTickets }, (_, index) => {
                  const hasName = index < formData.attendeeNames.length;
                  const name = hasName ? formData.attendeeNames[index] : '';
                  
                  return (
                    <div 
                      key={`attendee-${index}`} 
                      className={`transition-all duration-300 ease-in-out ${
                        hasName && !isAnimating 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-2 scale-95'
                      }`}
                      style={{ 
                        transitionDelay: hasName ? `${index * 50}ms` : '0ms'
                      }}
                    >
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => handleAttendeeNameChange(index, e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-black border border-[#1f1f1f] rounded-xl text-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-300 font-light placeholder-gray-500"
                        placeholder={`Attendee ${index + 1} full name`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className={`border-t border-[#1f1f1f] pt-8 space-y-4 transition-all duration-700 delay-700 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  className="mt-1 h-5 w-5 bg-black border border-[#1f1f1f] rounded-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 accent-white transition-all duration-300"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-300 font-light tracking-wide leading-relaxed">
                  I agree to the terms and conditions and understand that this registration is binding. I confirm that all information provided is accurate and complete. *
                </label>
              </div>
              
              {/* Photography Consent */}
              <div className={`flex items-start space-x-3 transition-all duration-700 delay-800 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <input
                  type="checkbox"
                  id="photoConsent"
                  name="photoConsent"
                  checked={formData.photoConsent}
                  onChange={handleInputChange}
                  required
                  className="mt-1 h-5 w-5 bg-black border border-[#1f1f1f] rounded-md focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 accent-white transition-all duration-300"
                />
                <label htmlFor="photoConsent" className="text-sm text-gray-300 font-light tracking-wide leading-relaxed">
                  I consent to being photographed during the event and agree that any photographed content may be shared at the sole discretion of Lumina. *
                </label>
              </div>
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="bg-red-900/20 border border-red-800/30 rounded-xl p-4 transition-all duration-300">
                <div className="text-red-400 font-light">
                  <strong className="font-normal">Error:</strong> {errorMessage}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className={`pt-6 transition-all duration-700 delay-900 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button
                type="submit"
                disabled={isSubmitting || !formData.agreeToTerms || !formData.photoConsent}
                className="w-full bg-black text-white py-4 px-6 rounded-xl border border-[#1f1f1f] font-light tracking-wide hover:bg-[#1f1f1f] focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Submitting...</span>
                  </span>
                ) : (
                  'Register for Event'
                )}
              </button>
            </div>
          </form>

          {/* Event Note */}
          <div className={`mt-8 p-6 bg-[#1f1f1f] border border-[#151618] rounded-xl transition-all duration-700 delay-1000 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-sm text-gray-400 font-light tracking-wide leading-relaxed">
              <strong className="font-normal text-white">Event Information:</strong> After submitting this form, you will receive event details and payment instructions via email. We look forward to celebrating with you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTicketForm;