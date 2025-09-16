'use client';

import { useState } from 'react';

const EventTicketForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    numTickets: 1,
    attendeeNamesStr: '',
    screenshotUrl: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Replace with your actual Apps Script Web App URL
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
  
  // Replace with your actual shared secret (in production, use environment variables)
  const SHARED_SECRET = 'your-shared-secret-here';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numTickets' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.numTickets) {
        throw new Error('Please fill in all required fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Prepare payload
      const payload = {
        ...formData,
        secret: SHARED_SECRET
      };

      // Submit to Apps Script
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Form submitted successfully! You will receive a confirmation email shortly.');
        setMessageType('success');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          numTickets: 1,
          attendeeNamesStr: '',
          screenshotUrl: ''
        });
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage(error.message || 'An error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Event Ticket Registration
      </h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${
          messageType === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-300'
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="numTickets" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Tickets *
          </label>
          <select
            id="numTickets"
            name="numTickets"
            value={formData.numTickets}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="attendeeNamesStr" className="block text-sm font-medium text-gray-700 mb-1">
            Attendee Names
          </label>
          <textarea
            id="attendeeNamesStr"
            name="attendeeNamesStr"
            value={formData.attendeeNamesStr}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="If booking for multiple people, enter all names separated by commas. Leave blank if just for yourself."
          />
        </div>

        <div>
          <label htmlFor="screenshotUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Screenshot URL (Optional)
          </label>
          <input
            type="url"
            id="screenshotUrl"
            name="screenshotUrl"
            value={formData.screenshotUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/screenshot.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          } text-white`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-600">
        <p>* Required fields</p>
        <p className="mt-2">
          After submission, you'll receive payment instructions via email. 
          Your tickets will be sent once payment is verified.
        </p>
      </div>
    </div>
  );
};

export default EventTicketForm;