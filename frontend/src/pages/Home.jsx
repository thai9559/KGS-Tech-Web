import React from "react";
import { useTranslation } from "react-i18next";
import Layout from "../components/Layout";
import BannerSlider from "../components/BannerSlider";
import Benefits from "../components/Benefits";
import BlogSlider from "../components/BlogData";
export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout>
      <BannerSlider />
      <Benefits />
      <BlogSlider />
    </Layout>
  );
}
