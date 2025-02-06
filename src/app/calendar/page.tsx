'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default CSS for the calendar

type Event = {
  id: string;
  date: Date;
  title: string;
  description: string;
};

export default function CalendarPage() {
  // State for the selected date
  const [date, setDate] = useState<Date>(new Date());

  // State for events
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      date: new Date(2023, 9, 15), // October 15, 2023
      title: 'Car Rental Booking',
      description: 'Toyota Camry booked by John Doe.',
    },
    {
      id: '2',
      date: new Date(2023, 9, 20), // October 20, 2023
      title: 'Car Maintenance',
      description: 'Scheduled maintenance for Honda Civic.',
    },
  ]);

  // State for adding/editing events
  const [newEvent, setNewEvent] = useState({ title: '', description: '' });
  const [editEvent, setEditEvent] = useState<Event | null>(null);

  // Handle date change
  const handleDateChange = (value: Date) => {
    setDate(value);
  };

  // Get events for the selected date
  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  // Handle adding a new event
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.description) {
      const event: Event = {
        id: String(Math.random()), // Generate a unique ID
        date,
        title: newEvent.title,
        description: newEvent.description,
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', description: '' });
    }
  };

  // Handle editing an event
  const handleEditEvent = (event: Event) => {
    setEditEvent(event);
    setNewEvent({ title: event.title, description: event.description });
  };

  // Handle saving the edited event
  const handleSaveEdit = () => {
    if (editEvent && newEvent.title && newEvent.description) {
      const updatedEvents = events.map((event) =>
        event.id === editEvent.id
          ? { ...event, title: newEvent.title, description: newEvent.description }
          : event
      );
      setEvents(updatedEvents);
      setEditEvent(null);
      setNewEvent({ title: '', description: '' });
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Calendar</h1>

        {/* Calendar Component */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-4 w-full max-w-full mx-auto">
          <Calendar
            onChange={handleDateChange as any} // TypeScript workaround
            value={date}
            className="react-calendar w-full"
          />
        </div>

        {/* Selected Date Display */}
        <div className="text-center text-xl font-semibold mb-8">
          Selected Date: {date.toDateString()}
        </div>

        {/* Add/Edit Event Form */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-8 w-full max-w-full">
          <h2 className="text-xl font-semibold mb-4">
            {editEvent ? 'Edit Event' : 'Add Event'}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            <textarea
              placeholder="Event Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              rows={3}
            />
            <div className="flex gap-4">
              <button
                onClick={editEvent ? handleSaveEdit : handleAddEvent}
                className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-md"
              >
                {editEvent ? 'Save Changes' : 'Add Event'}
              </button>
              {editEvent && (
                <button
                  onClick={() => {
                    setEditEvent(null);
                    setNewEvent({ title: '', description: '' });
                  }}
                  className="bg-gray-500 text-white px-4 sm:px-6 py-2 rounded-md"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Events for Selected Date */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-full">
          <h2 className="text-xl font-semibold mb-4">
            Events on {date.toDateString()}
          </h2>
          {getEventsForDate(date).length > 0 ? (
            <ul className="space-y-4">
              {getEventsForDate(date).map((event) => (
                <li key={event.id} className="border p-4 rounded-lg">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="bg-red-600 text-white px-4 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No events for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
}