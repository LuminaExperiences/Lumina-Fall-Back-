import EventTicketForm from './EventTicketForm';

export default function TicketRegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Event Ticket Registration
          </h1>
          <p className="text-lg text-gray-600">
            Register for our upcoming event. Fill out the form below and you'll receive 
            payment instructions via email. Your tickets will be sent once payment is verified.
          </p>
        </div>
        
        <EventTicketForm />
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            How it works:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Fill out the registration form above</li>
            <li>You'll receive an email with payment instructions (Zelle)</li>
            <li>Make your payment using the provided details</li>
            <li>Once payment is verified, you'll receive your QR code tickets via email</li>
            <li>Bring your QR codes to the event for check-in</li>
          </ol>
        </div>
        
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Please ensure your payment details match the name on your registration. 
            Mismatched names may delay ticket processing.
          </p>
        </div>
      </div>
    </div>
  );
}