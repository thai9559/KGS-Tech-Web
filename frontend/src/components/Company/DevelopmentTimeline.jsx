// src/pages/Timeline.js
import React from "react";
import { useTranslation } from "react-i18next";
import Animation from "../Animation";
const Timeline = () => {
  const { t } = useTranslation();

  const events = [
    {
      year: "2025",
      title: t("TimeLine.title5"),
      description: t("TimeLine.description5"),
      image: "https://res.cloudinary.com/dtnuj2les/image/upload/v1736306407/medium-shot-people-working-together-min_x6by3n.jpg",
    },
    {
      year: "2023",
      title: t("TimeLine.title4"),
      description: t("TimeLine.description4"),
      image: "https://res.cloudinary.com/dtnuj2les/image/upload/v1736129944/smiling-young-colleagues-standing-with-arms-crossed-min_y7f5ob.jpg",
    },
    {
      year: "2022",
      title: t("TimeLine.title3"),
      description: t("TimeLine.description3"),
      image: "https://res.cloudinary.com/dtnuj2les/image/upload/v1736129111/authentic-small-youthful-marketing-agency-min_ezfzv8.jpg",
    },
    {
      year: "2020",
      title: t("TimeLine.title2"),
      description: t("TimeLine.description2"),
      image: "https://res.cloudinary.com/dtnuj2les/image/upload/v1735895694/people-learning-language-medium-shot_mlfjha.jpg",
    },
    {
      year: "2018",
      title: t("TimeLine.title1"),
      description: t("TimeLine.description1"),
      image: "https://res.cloudinary.com/dtnuj2les/image/upload/v1735895946/close-up-young-colleagues-having-meeting_akm1o4.jpg",
    },
  ];

  return (
    <div className="flex flex-col items-center py-12 bg-gray-50">
      <h2 className="text-4xl font-bold text-orange-700 mb-8">
        <Animation animationType="fade-up">{t("TimeLine.title")}</Animation>
      </h2>

      <div className="max-w-6xl w-full px-4">
        {/* Desktop View */}
        <div className="hidden md:block">
          {events.map((event, index) => (
            <Animation
              key={index}
              animationType={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <div className={`flex items-center mb-12 relative ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                <div className="md:w-96 w-full h-96 rounded-md overflow-hidden shadow-lg mb-6 flex-shrink-0">
                  <img
                    src={event.image}
                    alt={`Event ${event.year}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-col justify-center items-start  text-left mx-8 space-y-4 w-full max-w-full ">
                  <div className="text-3xl font-notoSansJP font-medium text-gray-700">{event.year}</div>
                  <h3 className="text-2xl font-semibold text-gray-800">{event.title}</h3>
                  <p className="text-gray-600 mt-2">{event.description}</p>
                </div>
              </div>
            </Animation>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          {events.map((event, index) => (
            <Animation key={index} animationType="fade-up">
              <div className="mb-12 flex flex-col items-center">
                <div className="w-full h-96 rounded-md overflow-hidden shadow-lg mb-6">
                  <img
                    src={event.image}
                    alt={`Event ${event.year}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center items-start mx-4 space-y-4 w-full max-w-full">
                  <div className="text-xl font-semibold text-blue-500">{event.year}</div>
                  <h3 className="text-2xl font-semibold text-gray-800">{event.title}</h3>
                  <p className="text-gray-600 mt-2">{event.description}</p>
                </div>
              </div>
            </Animation>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
