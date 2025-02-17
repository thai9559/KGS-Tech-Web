import React from "react";
import { useTranslation } from "react-i18next";
import Animation from "../Animation";

const Benefit = () => {
  const { t } = useTranslation();

  const formatDescription = (description) => {
    return description.split("。").map((sentence, index) =>
      sentence.trim() ? (
        <React.Fragment key={index}>
          {sentence}。
          <br />
        </React.Fragment>
      ) : null
    );
  };

  const events = [
    {
      year: "2025",
      title: t("TimeLine.title5"),
      description: t("TimeLine.description5"),
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736306407/medium-shot-people-working-together-min_x6by3n.jpg",
      background: "#ffffff",
    },
    {
      year: "2023",
      title: t("TimeLine.title4"),
      description: t("TimeLine.description4"),
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736306405/labor-union-members-working-together-min_gadspn.jpg",
      background:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736393039/modern-background-with-lines_e35chm.jpg",
    },
    {
      year: "2022",
      title: t("TimeLine.title3"),
      description: t("TimeLine.description3"),
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736306406/medium-shot-smiley-colleagues-working-together-min_ahrn7i.jpg",
      background: "#ffffff",
    },
    {
      year: "2020",
      title: t("TimeLine.title2"),
      description: t("TimeLine.description2"),
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1735895694/people-learning-language-medium-shot_mlfjha.jpg",
      background:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736393039/modern-background-with-lines_e35chm.jpg",
    },
    {
      year: "2018",
      title: t("TimeLine.title1"),
      description: t("TimeLine.description1"),
      image:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1735895946/close-up-young-colleagues-having-meeting_akm1o4.jpg",
      background: "#ffffff",
    },
  ];

  return (
    <div className="flex flex-col items-center py-8 bg-white">
      <h2 className="text-3xl font-bold text-black mb-8">
        <Animation animationType="zoom-in">{t("TimeLine.title")}</Animation>
      </h2>

      <div className="w-full px-0">
        <div>
          {/* PC Layout */}
          <div className="hidden lg:block">
            {events.map((event, index) => {
              const isDarkBackground = !event.background.includes("#ffffff");
              return (
                <Animation
                  key={index}
                  animationType={index % 2 === 0 ? "fade-right" : "fade-left"}
                >
                  <div
                    className={`relative w-full flex overflow-hidden h-[800px] ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                    style={{
                      background: event.background.includes("#")
                        ? event.background
                        : `url('${event.background}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="w-[50%] h-full flex bg-top">
                      <div
                        className="w-full h-full bg-cover object-cover bg-top-center"
                        style={{
                          backgroundImage: `url('${event.image}')`,
                        }}
                      />
                    </div>
                    <div
                      className={`w-[50%] p-12 flex flex-col justify-center ${
                        isDarkBackground ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <div className="flex items-center ">
                        <div className="text-7xl font-bold">{event.year}</div>
                        <div
                          className={`ml-2 flex flex-col text-2xl items-start justify-center font-light ${
                            isDarkBackground
                              ? "text-orange-300"
                              : "text-orange-700"
                          }`}
                        >
                          <span>KGS</span>
                          <span>TECH</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold mt-4">{event.title}</h3>
                      <p className="font-medium font-notoSansJP mt-4 leading-relaxed">
                        {formatDescription(event.description)}
                      </p>
                    </div>
                  </div>
                </Animation>
              );
            })}
          </div>

          {/* Mobile Layout */}
          <div className="block lg:hidden">
            {events.map((event, index) => {
              const isDarkBackground = !event.background.includes("#ffffff");
              return (
                <Animation key={index} animationType="fade-up">
                  <div
                    className="relative w-full flex flex-col overflow-hidden mb-12"
                    style={{
                      background: event.background.includes("#")
                        ? event.background
                        : `url('${event.background}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div
                      className="w-full h-[300px] bg-cover bg-top-center"
                      style={{
                        backgroundImage: `url('${event.image}')`,
                      }}
                    />
                    <div
                      className={`p-6 flex flex-col ${
                        isDarkBackground ? "text-white" : "text-gray-800"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="text-5xl font-bold">
                          {event.year.substring(2)}
                        </div>
                        <div
                          className={`ml-2 flex flex-col text-lg items-start justify-center font-light ${
                            isDarkBackground
                              ? "text-orange-300"
                              : "text-orange-700"
                          }`}
                        >
                          <span>KGS</span>
                          <span>TECH</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mt-4">{event.title}</h3>
                      <p className="font-medium font-notoSansJP mt-4 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </Animation>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
