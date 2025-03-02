"use client";

import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Alex Stanton",
      role: "CEO at Bukalapak",
      comment: "We are very happy with the service from the MORENT App. Morent has low prices...",
      date: "21 July 2022",
      profilePicture: "/images/Profile.png",
      rating: 4,
    },
    {
      name: "Skylar Dias",
      role: "CEO at Amazon",
      comment: "We are greatly helped by the services of the MORENT Application. Morent has low prices...",
      date: "20 July 2022",
      profilePicture: "/images/Profil1.png",
      rating: 4,
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    comment: "",
    date: "",
    profilePicture: "",
    rating: 0,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload for profile picture
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setNewReview((prev) => ({
        ...prev,
        profilePicture: fileUrl,
      }));
    }
  };

  // Handle star rating selection
  const handleRating = (rating: number) => {
    setNewReview((prev) => ({
      ...prev,
      rating,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString("default", { month: "long" })} ${today.getFullYear()}`;

    setReviews((prev) => [
      ...prev,
      {
        ...newReview,
        date: formattedDate,
      },
    ]);

    // Reset the form
    setNewReview({
      name: "",
      role: "",
      comment: "",
      date: "",
      profilePicture: "",
      rating: 0,
    });
  };

  return (
    <section className="mt-8">
      {/* Reviews Header */}
      <div className="flex items-center mb-4 ml-2">
        <h2 className="text-xl font-bold text-gray-800">Reviews</h2>
        <div className="w-8 h-8 bg-blue-600 text-white flex justify-center items-center rounded-full ml-3">
          <span className="font-bold text-sm">{reviews.length}</span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="p-4 border rounded-md shadow-sm">
            <div className="flex justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image src={review.profilePicture} alt={review.name} width={40} height={40} className="object-cover w-full h-full" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <p className="text-sm text-gray-500">{review.date}</p>
                <div className="flex space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" size={16} />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <FaRegStar key={i} className="text-yellow-400" size={16} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      <form className="mt-8 p-4 border rounded-md" onSubmit={handleSubmit}>
        <h3 className="text-lg font-bold mb-4">Add Your Review</h3>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold mb-1">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={newReview.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
            title="Enter your full name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-bold mb-1">Designation</label>
          <input
            id="role"
            type="text"
            name="role"
            value={newReview.role}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
            title="Enter your designation"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-bold mb-1">Your Review</label>
          <textarea
            id="comment"
            name="comment"
            value={newReview.comment}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            rows={3}
            required
            title="Write your review"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-sm font-bold mb-1">Profile Picture</label>
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded-md p-2"
            title="Upload your profile picture"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-1">Rating</label>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < newReview.rating ? "text-yellow-400 cursor-pointer" : "text-gray-400 cursor-pointer"}
                size={20}
                onClick={() => handleRating(i + 1)}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Submit Review
        </button>
      </form>
    </section>
  );
};

export default Reviews;