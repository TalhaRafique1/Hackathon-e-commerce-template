'use client';

import { useState } from 'react';

type ReimbursementRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookingId: string;
  rentalDate: string;
  requestType: string;
  details: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

export default function ReimbursePage() {
  // State for the reimbursement form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bookingId: '',
    rentalDate: '',
    requestType: '',
    details: '',
    file: null as File | null,
  });

  // State for reimbursement requests history
  const [requests, setRequests] = useState<ReimbursementRequest[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      bookingId: 'BOOK123',
      rentalDate: '2023-10-15',
      requestType: 'Damage Repair',
      details: 'Scratch on the left door.',
      status: 'Pending',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
      bookingId: 'BOOK456',
      rentalDate: '2023-10-20',
      requestType: 'Overcharge',
      details: 'Extra fuel charge was applied.',
      status: 'Approved',
    },
  ]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new reimbursement request
    const newRequest: ReimbursementRequest = {
      id: String(Math.random()), // Generate a unique ID
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bookingId: formData.bookingId,
      rentalDate: formData.rentalDate,
      requestType: formData.requestType,
      details: formData.details,
      status: 'Pending',
    };

    // Add the new request to the list
    setRequests([...requests, newRequest]);

    // Reset the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      bookingId: '',
      rentalDate: '',
      requestType: '',
      details: '',
      file: null,
    });

    alert('Reimbursement request submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Reimbursement Requests</h1>

        {/* Reimbursement Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Submit a Reimbursement Request</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />

              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />

              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />

              <label htmlFor="bookingId" className="block text-sm font-medium text-gray-700">
                Booking ID
              </label>
              <input
                type="text"
                name="bookingId"
                id="bookingId"
                placeholder="Booking ID"
                value={formData.bookingId}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />

              <label htmlFor="rentalDate" className="block text-sm font-medium text-gray-700">
                Rental Date
              </label>
              <input
                type="date"
                name="rentalDate"
                id="rentalDate"
                value={formData.rentalDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <label htmlFor="requestType" className="block text-sm font-medium text-gray-700">
              Request Type
            </label>
            <select
              id="requestType"
              name="requestType"
              value={formData.requestType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="" disabled>
                Select Request Type
              </option>
              <option value="Damage Repair">Damage Repair</option>
              <option value="Overcharge">Overcharge</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="details" className="block text-sm font-medium text-gray-700">
              Details
            </label>
            <textarea
              name="details"
              id="details"
              placeholder="Provide details about your request"
              value={formData.details}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows={4}
              required
            />

            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Upload File (Optional)
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md"
              accept=".pdf,.jpg,.png"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Submit Request
            </button>
          </form>
        </div>

        {/* Reimbursement Requests History */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Reimbursement Requests</h2>
          {requests.length > 0 ? (
            <ul className="space-y-4">
              {requests.map((request) => (
                <li key={request.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{request.requestType}</h3>
                      <p className="text-gray-600">{request.details}</p>
                      <p className="text-sm text-gray-500">
                        Booking ID: {request.bookingId} | Rental Date: {request.rentalDate}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        request.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No reimbursement requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
