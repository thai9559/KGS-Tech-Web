import React from "react";
import { Switch, message } from "antd";
import { useTranslation } from "react-i18next";
import {
  useUpdateVisibilityMutation,
  useGetBlogsQuery,
} from "../../../redux/api/blogApi";

const BlogVisibilitySwitch = ({ isVisible, record }) => {
  const { t } = useTranslation();
  const [updateVisibility] = useUpdateVisibilityMutation();
  const { refetch } = useGetBlogsQuery();

  const handleVisibilityToggle = async (id, isVisible) => {
    try {
      const response = await updateVisibility({
        id,
        is_visible: isVisible,
      }).unwrap();
      message.success(response.message);
      refetch();
    } catch (error) {
      console.error(error);
      message.error(t("blog_table.messages.update_visibility_fail"));
    }
  };

  return (
    <Switch
      checked={isVisible}
      onChange={(checked) => handleVisibilityToggle(record.id, checked)}
    />
  );
};

export default BlogVisibilitySwitch;
