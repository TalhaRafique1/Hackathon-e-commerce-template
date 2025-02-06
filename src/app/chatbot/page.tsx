"use client";

import { useState } from "react";

const faqData = [
  { question: "What is the minimum age for renting a car?", answer: "The minimum age for renting a car is 21 years old. Drivers under 25 may incur an additional fee." },
  { question: "Can I rent a car without a credit card?", answer: "We require a credit card for booking and payment. Debit cards may not be accepted at all locations." },
  { question: "Do you offer insurance for rental cars?", answer: "Yes, we offer insurance options at the time of booking or when you pick up the car." },
  { question: "Can I extend my rental period?", answer: "Yes, you can extend your rental period by contacting us before your rental period ends." },
  { question: "What do I need to bring when picking up the car?", answer: "You will need to bring a valid driver’s license, a credit card, and proof of insurance (if not purchasing ours)." },
  { question: "Are the rental cars well maintained?", answer: "Yes, we ensure that all our cars are well-maintained and inspected regularly for your safety." },
];

const casualResponses = [
  { keyword: "hi", response: "Hello! How can I assist you today?" },
  { keyword: "how are you", response: "I'm doing great, thank you for asking! How can I help you today?" },
  { keyword: "thanks", response: "You're welcome! Let me know if you need anything else." },
  { keyword: "bye", response: "Goodbye! Have a great day!" },
  { keyword: "help", response: "Sure! I'm here to assist you with anything related to car rentals. How can I help?" },
];

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ user: string; bot: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessages([...messages, { user: message, bot: "..." }]);
    setIsLoading(true);

    const casualResponse = casualResponses.find((response) =>
      message.toLowerCase().includes(response.keyword)
    );

    if (casualResponse) {
      setTimeout(() => {
        setMessages([...messages, { user: message, bot: casualResponse.response }]);
        setMessage("");
        setIsLoading(false);
      }, 1000);
      return;
    }

    const faq = faqData.find((faq) =>
      faq.question.toLowerCase().includes(message.toLowerCase())
    );

    setTimeout(() => {
      setMessages([
        ...messages,
        {
          user: message,
          bot: faq ? faq.answer : "Sorry, I couldn't find an answer to that question. Please try again.",
        },
      ]);
      setMessage("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl border border-blue-200">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-2xl font-bold py-5 px-6 rounded-t-2xl">
        Car Rental Assistant
      </div>

      <div className="p-6 space-y-4 overflow-y-auto max-h-96">
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <div className="self-end bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md max-w-max">
              {msg.user}
            </div>
            <div className="self-start bg-gray-100 text-gray-800 px-4 py-2 rounded-lg shadow-sm max-w-max">
              {msg.bot}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-blue-500 text-sm animate-pulse">Bot is typing...</div>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center p-4 border-t border-gray-200 gap-3">
        <input
          type="text"
          placeholder="Ask me about car rentals..."
          className="flex-grow w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

const ChatBotContainer = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ChatBot />
    </div>
  );
};

export default ChatBotContainer;