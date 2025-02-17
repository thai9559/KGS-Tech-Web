import React from "react";
import { Card, Col, Row } from "antd";
import { useTranslation } from "react-i18next"; // Dùng i18n để dịch nội dung

const IndustriesPage = () => {
  const { t } = useTranslation();
  const industries = [
    {
      title: t("industries.E-commerce.title"),
      description: t("industries.E-commerce.description"),
      imageUrl:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736496967/side-view-business-people-working-with-ipad-min_sqgr3b.jpg",
    },
    {
      title: t("industries.Healthcare.title"),
      description: t("industries.Healthcare.description"),
      imageUrl:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736131677/mission-goals-target-aspirations-motivation-strategy-concept_pce1ot.jpg",
    },
    {
      title: t("industries.Finance.title"),
      description: t("industries.Finance.description"),
      imageUrl:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736129111/authentic-small-youthful-marketing-agency-min_ezfzv8.jpg",
    },
    {
      title: t("industries.Education.title"),
      description: t("industries.Education.description"),
      imageUrl:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1735895694/people-learning-language-medium-shot_mlfjha.jpg",
    },
    {
      title: t("industries.TravelHospitality.title"),
      description: t("industries.TravelHospitality.description"),
      imageUrl:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1735896054/concentrated-woman-with-students-table_fglrfz.jpg",
    },
    {
      title: t("industries.realEstate.title"),
      description: t("industries.realEstate.description"),
      imageUrl:
        "https://res.cloudinary.com/dtnuj2les/image/upload/v1736306405/labor-union-members-working-together-min_gadspn.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-10">
        {t("industries.title")}
      </h1>
      <Row gutter={[16, 16]}>
        {industries.map((industry, index) => (
          <Col span={24} sm={12} lg={8} key={index}>
            <Card
              hoverable
              className="bg-white shadow-md border border-gray-200 rounded-lg"
              style={{ marginBottom: "16px" }}
              bodyStyle={{ padding: 0 }}
            >
              <div
                className="relative w-full p-0 rounded-t-lg bg-cover transition-all duration-300 ease-in-out"
                style={{
                  backgroundImage: `url('${industry.imageUrl}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "240px",
                }}
              >
                {/* Lớp phủ mờ */}
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
                {/* Tiêu đề hiển thị ở giữa khi chưa hover */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                  <h3 className="text-white text-2xl font-bold opacity-100">
                    {industry.title}
                  </h3>
                </div>
              </div>

              {/* Nội dung khi hover */}
              <div className="text-center p-4 opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold text-black mb-2">
                  {industry.title}
                </h3>
                <p className="text-black font-notoSansJP text-lg mb-4  p-4">
                  {industry.description}
                </p>
                <button className="text-blue-500 font-notoSansJP font-bold hover:text-blue-700">
                  {t("industries.learnMore")}
                </button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default IndustriesPage;
