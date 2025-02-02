import React, { useState } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  useGetRecruitmentsQuery,
  useCreateRecruitmentMutation,
  useUpdateRecruitmentMutation,
  useDeleteRecruitmentMutation,
} from "../../../redux/api/recruitmentApi";

import RecruitmentForm from "./RecruitmentForm";
import RecruitmentTable from "./RecruitmentTable";
const RecruitmentManagement = () => {
  const { data: recruitments = [], isLoading } = useGetRecruitmentsQuery();
  const [createRecruitment] = useCreateRecruitmentMutation();
  const [updateRecruitment] = useUpdateRecruitmentMutation();
  const [deleteRecruitment] = useDeleteRecruitmentMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecruitment, setCurrentRecruitment] = useState(null);

  const openModal = (recruitment = null) => {
    setCurrentRecruitment(recruitment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRecruitment(null);
  };

  const handleSubmit = async (values) => {
    if (currentRecruitment) {
      await updateRecruitment({ id: currentRecruitment.id, ...values });
      message.success("Cập nhật thành công!");
    } else {
      await createRecruitment(values);
      message.success("Thêm ứng viên thành công!");
    }
    closeModal();
  };

  return (
    <div>
      {/* <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => openModal()}
      >
        Thêm ứng viên
      </Button> */}
      <h2 className="text-black font-notoSansJP text-2xl font-bold mb-10">
        Quản lý tuyển dụng
      </h2>
      <RecruitmentTable
        data={recruitments}
        isLoading={isLoading}
        onEdit={openModal}
        onDelete={deleteRecruitment}
      />
      <RecruitmentForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialValues={currentRecruitment}
      />
    </div>
  );
};

export default RecruitmentManagement;
