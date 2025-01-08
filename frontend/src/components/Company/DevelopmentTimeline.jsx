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
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736306407/medium-shot-people-working-together-min_x6by3n.jpg",
    },
    {
      year: "2023",
      title: t("TimeLine.title4"),
      description: t("TimeLine.description4"),
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736129944/smiling-young-colleagues-standing-with-arms-crossed-min_y7f5ob.jpg",
    },
    {
      year: "2022",
      title: t("TimeLine.title3"),
      description: t("TimeLine.description3"),
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736129111/authentic-small-youthful-marketing-agency-min_ezfzv8.jpg",
    },
    {
      year: "2022",
      title: t("TimeLine.title2"),
      description: t("TimeLine.description2"),
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736129944/smiling-young-colleagues-standing-with-arms-crossed-min_y7f5ob.jpg",
    },
    {
      year: "2021",
      title: t("TimeLine.title1"),
      description: t("TimeLine.description1"),
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736129111/authentic-small-youthful-marketing-agency-min_ezfzv8.jpg",
    },
  ];

  return (
    <div className="flex flex-col items-center py-12 bg-white">
      <h2 className="text-4xl font-bold text-orange-700 mb-8">
        <Animation animationType="fade-up">{t("TimeLine.title")}</Animation>
      </h2>

      <div className="w-full px-0">
        <div>
          {/* PC Layout */}
          <div className="hidden lg:block">
            {events.map((event, index) => (
              <Animation
                key={index}
                animationType={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <div
                  className={`relative w-full flex bg-white overflow-hidden h-[800px] mb-12 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-[78%] h-full flex bg-top">
                    <div
                      className="w-full h-full bg-cover object-cover bg-top-center"
                      style={{
                        backgroundImage: `url('${event.image}')`,
                      }}
                    />
                  </div>
                  <div className="w-[22%] p-8 flex flex-col justify-center">
                    <Animation animationType="fade-up">
                      <div className="flex items-center">
                        <div className="text-7xl text-gray-300 font-bold">
                          {event.year.substring(2)}
                        </div>
                        <div className="ml-2 flex flex-col text-2xl items-start justify-center font-light text-orange-700 leading-tight">
                          <span>KGS</span>
                          <span>TECH</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800 mt-4">
                        {event.title}
                      </h3>
                      <p className="text-gray-700 font-medium font-notoSansJP mt-4 leading-relaxed">
                        {event.description}
                      </p>
                      <button className="mt-6 px-6 py-3 border-2 border-gray-400 text-gray-700 font-medium hover:bg-gray-100">
                        Liên hệ ngay
                      </button>
                    </Animation>
                  </div>
                </div>
              </Animation>
            ))}
          </div>

          {/* Mobile Layout */}
          <div className="block lg:hidden">
            {events.map((event, index) => (
              <Animation key={index} animationType="fade-up">
                <div className="relative w-full flex flex-col bg-white overflow-hidden mb-12">
                  <div
                    className="w-full h-[300px] bg-cover bg-top-center"
                    style={{
                      backgroundImage: `url('${event.image}')`,
                    }}
                  />
                  <div className="p-6 flex flex-col">
                    <div className="flex items-center">
                      <div className="text-5xl text-gray-300 font-bold">
                        {event.year.substring(2)}
                      </div>
                      <div className="ml-2 flex flex-col text-lg items-start justify-center font-light text-orange-700 leading-tight">
                        <span>KGS</span>
                        <span>TECH</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mt-4">
                      {event.title}
                    </h3>
                    <p className="text-gray-700 font-medium font-notoSansJP mt-4 leading-relaxed">
                      {event.description}
                    </p>
                    <button className="mt-6 px-4 py-2 border-2 border-gray-400 text-gray-700 font-medium hover:bg-gray-100">
                      Liên hệ ngay
                    </button>
                  </div>
                </div>
              </Animation>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
