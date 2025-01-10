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
    <div className="flex flex-col items-center  bg-white overflow-hidden">
      <div className="w-full px-4 mx-auto">
        <div>
          {/* PC Layout */}
          <div className="hidden lg:block">
            {events.map((event, index) => (

              <div className="relative w-full h-[100vh] flex flex-col bg-white overflow-hidden mb-12">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${event.image}')`,
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center space-y-4 px-4 bg-black bg-opacity-30 z-10">
                    <div className="bg-white p-4 flex items-center flex-col justify-center shadow-md w-full max-w-4xl">
                      <h3 className="font-bold font-notoSansJP text-orange-700 text-3xl">
                        {event.year1}
                      </h3>
                      <h4 className="font-semibold text-xl text-gray-700">
                        {event.title1}
                      </h4>
                      <p className="font-notoSansJP text-center text-lg text-gray-700">
                        {event.description1}
                      </p>
                    </div>

                    <div className="bg-white p-4 flex items-center flex-col shadow-md w-full max-w-4xl">
                      <h3 className="font-bold text-3xl text-orange-700">
                        {event.year2}
                      </h3>
                      <h4 className="font-semibold text-xl text-gray-700">
                        {event.title2}
                      </h4>
                      <p className="font-notoSansJP text-center text-lg text-gray-700">
                        {event.description2}
                      </p>
                    </div>

                    <div className="bg-white p-4 flex items-center flex-col shadow-md w-full max-w-4xl">
                      <h3 className="font-bold text-3xl text-orange-700">
                        {event.year3}
                      </h3>
                      <h4 className="font-semibold text-xl text-gray-700">
                        {event.title3}
                      </h4>
                      <p className="font-notoSansJP text-center text-lg text-gray-700">
                        {event.description3}
                      </p>
                    </div>

                    <div className="bg-white p-4 flex items-center flex-col shadow-md w-full max-w-4xl">
                      <h3 className="font-bold text-3xl text-orange-700">
                        {event.year4}
                      </h3>
                      <h4 className="font-semibold text-xl text-gray-700">
                        {event.title4}
                      </h4>
                      <p className="font-notoSansJP text-center text-lg text-gray-700">
                        {event.description4}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>

          {/* Mobile Layout */}
          <div className="block lg:hidden">
            {events.map((event, index) => (

              <div className="relative w-full flex flex-col bg-white overflow-hidden mb-12">
                <div className="w-full flex flex-col items-center space-y-4">
                  <div
                    className="w-full bg-cover bg-center h-64"
                    style={{
                      backgroundImage: `url('${event.image}')`,
                    }}
                  />
                  <div className="bg-white p-4 flex items-center flex-col justify-center shadow-md w-full">
                    <h3 className="font-bold font-notoSansJP text-orange-700 text-2xl">
                      {event.year1}
                    </h3>
                    <h4 className="font-semibold text-xl text-gray-700">
                      {event.title1}
                    </h4>
                    <p className="font-notoSansJP text-center text-lg text-gray-700">
                      {event.description1}
                    </p>
                  </div>

                  <div className="bg-white p-4 flex items-center flex-col shadow-md w-full">
                    <h3 className="font-bold text-2xl text-orange-700">
                      {event.year2}
                    </h3>
                    <h4 className="font-semibold text-xl text-gray-700">
                      {event.title2}
                    </h4>
                    <p className="font-notoSansJP text-center text-lg text-gray-700">
                      {event.description2}
                    </p>
                  </div>

                  <div className="bg-white p-4 flex items-center flex-col shadow-md w-full">
                    <h3 className="font-bold text-2xl text-orange-700">
                      {event.year3}
                    </h3>
                    <h4 className="font-semibold text-xl text-gray-700">
                      {event.title3}
                    </h4>
                    <p className="font-notoSansJP text-center text-lg text-gray-700">
                      {event.description3}
                    </p>
                  </div>

                  <div className="bg-white p-4 flex items-center flex-col shadow-md w-full">
                    <h3 className="font-bold text-2xl text-orange-700">
                      {event.year4}
                    </h3>
                    <h4 className="font-semibold text-xl text-gray-700">
                      {event.title4}
                    </h4>
                    <p className="font-notoSansJP text-center text-lg text-gray-700">
                      {event.description4}
                    </p>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
