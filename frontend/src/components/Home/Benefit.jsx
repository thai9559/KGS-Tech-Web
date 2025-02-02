import React from "react";
import { useTranslation } from "react-i18next";

const Benefit = () => {
  const { t } = useTranslation();

  const events = [
    {
      year1: "01",
      title1: t("benefits.technology"),
      description1: t("benefits.technology_description"),
      year2: "02",
      title2: t("benefits.professional_team"),
      description2: t("benefits.professional_team_description"),
      year3: "03",
      title3: t("benefits.custom_solutions"),
      description3: t("benefits.custom_solutions_description"),
      year4: "04",
      title4: t("benefits.sustainable_growth"),
      description4: t("benefits.sustainable_growth_description"),
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736306407/medium-shot-people-working-together-min_x6by3n.jpg",
    },
  ];

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#f3f4f6] to-[#e2e8f0] overflow-visible">
      <div className="w-full mx-auto px-4 md:px-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="relative w-full min-h-screen flex flex-col bg-white overflow-hidden mb-8 rounded-lg shadow-lg"
          >
            {/* Background image */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('${event.image}')`,
              }}
            >
              {/* Overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#00000066] via-transparent to-[#00000066] opacity-50 z-10"></div>

              {/* Content */}
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center space-y-8 px-4 md:px-12 z-20">
                {/* Block 1 */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm md:max-w-lg lg:max-w-4xl mx-auto">
                  <h3 className="font-bold text-4xl text-[#4a90e2] text-center">
                    {event.year1}
                  </h3>
                  <h4 className="font-semibold text-lg md:text-xl text-gray-800 text-center">
                    {event.title1}
                  </h4>
                  <p className="text-center text-sm md:text-lg text-gray-600">
                    {event.description1}
                  </p>
                </div>

                {/* Block 2 */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm md:max-w-lg lg:max-w-4xl mx-auto">
                  <h3 className="font-bold text-4xl text-[#4a90e2] text-center">
                    {event.year2}
                  </h3>
                  <h4 className="font-semibold text-lg md:text-xl text-gray-800 text-center">
                    {event.title2}
                  </h4>
                  <p className="text-center text-sm md:text-lg text-gray-600">
                    {event.description2}
                  </p>
                </div>

                {/* Block 3 */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm md:max-w-lg lg:max-w-4xl mx-auto">
                  <h3 className="font-bold text-4xl text-[#4a90e2] text-center">
                    {event.year3}
                  </h3>
                  <h4 className="font-semibold text-lg md:text-xl text-gray-800 text-center">
                    {event.title3}
                  </h4>
                  <p className="text-center text-sm md:text-lg text-gray-600">
                    {event.description3}
                  </p>
                </div>

                {/* Block 4 */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm md:max-w-lg lg:max-w-4xl mx-auto">
                  <h3 className="font-bold text-4xl text-[#4a90e2] text-center">
                    {event.year4}
                  </h3>
                  <h4 className="font-semibold text-lg md:text-xl text-gray-800 text-center">
                    {event.title4}
                  </h4>
                  <p className="text-center text-sm md:text-lg text-gray-600">
                    {event.description4}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefit;
