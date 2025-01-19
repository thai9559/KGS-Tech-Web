import React from "react";

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Tech Innovators Conference 2025",
      date: "March 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "New York City, NY",
      description:
        "Join us for a day of innovation and networking with the top leaders in the tech industry.",
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1735810886/samples/imagecon-group.jpg",
    },
    {
      id: 2,
      title: "AI & Machine Learning Workshop",
      date: "April 10, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "San Francisco, CA",
      description:
        "Hands-on workshops to learn and explore the latest trends in AI and machine learning.",
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1735810886/samples/imagecon-group.jpg",
    },
    {
      id: 3,
      title: "Global Marketing Summit 2025",
      date: "May 25, 2025",
      time: "9:30 AM - 5:00 PM",
      location: "London, UK",
      description:
        "Discover the latest marketing strategies and connect with global experts.",
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1735810886/samples/imagecon-group.jpg",
    },
  ];

  return (
    <section className="w-full py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Upcoming Events
        </h2>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Event Image */}
              <img
                src={event.image}
                alt={event.title}
                className="h-48 w-full object-cover"
              />
              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  📅 {event.date} | 🕒 {event.time}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  📍 {event.location}
                </p>
                <p className="text-gray-700 line-clamp-3">
                  {event.description}
                </p>
              </div>
              {/* CTA */}
              <div className="p-6 border-t text-center">
                <button className="bg-blue-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
