// // import React, { useState } from "react";
// // import {
// //   Table,
// //   Button,
// //   Modal,
// //   Form,
// //   Input,
// //   Switch,
// //   Space,
// //   message,
// //   Popconfirm,
// // } from "antd";
// // import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// // import {
// //   useGetUsersQuery,
// //   useCreateUserMutation,
// //   useUpdateUserMutation,
// //   useDeleteUserMutation,
// // } from "../../redux/api/userApi";

// // const UserManagement = () => {
// //   const { data: users = [], isLoading } = useGetUsersQuery(); // Lấy danh sách người dùng
// //   const [createUser] = useCreateUserMutation(); // Thêm người dùng mới
// //   const [updateUser] = useUpdateUserMutation(); // Cập nhật người dùng
// //   const [deleteUser] = useDeleteUserMutation(); // Xóa người dùng

// //   const [isModalOpen, setIsModalOpen] = useState(false); // Hiển thị modal
// //   const [isEditing, setIsEditing] = useState(false); // Chế độ chỉnh sửa
// //   const [currentUser, setCurrentUser] = useState(null); // Người dùng hiện tại

// //   const [form] = Form.useForm();

// //   const handleOk = async () => {
// //     try {
// //       const values = await form.validateFields();
// //       const userData = {
// //         ...values,
// //         password_confirmation: values.password, // Đảm bảo gửi cả password_confirmation
// //       };
// //       if (isEditing) {
// //         await updateUser({ id: currentUser.id, ...userData });
// //         message.success("Người dùng đã được cập nhật!");
// //       } else {
// //         await createUser(userData); // Gọi API /register
// //         message.success("Người dùng mới đã được thêm!");
// //       }
// //       setIsModalOpen(false);
// //       form.resetFields();
// //     } catch (error) {
// //       message.error("Có lỗi xảy ra!");
// //     }
// //   };

// //   // Xử lý xóa người dùng
// //   const handleDelete = async (id) => {
// //     try {
// //       await deleteUser(id);
// //       message.success("Người dùng đã được xóa!");
// //     } catch (error) {
// //       message.error("Không thể xóa người dùng!");
// //     }
// //   };

// //   // Mở modal thêm/sửa
// //   const openModal = (user = null) => {
// //     setIsEditing(!!user);
// //     setCurrentUser(user);
// //     setIsModalOpen(true);
// //     if (user) {
// //       form.setFieldsValue(user);
// //     } else {
// //       form.resetFields();
// //     }
// //   };

// //   // Đóng modal
// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setCurrentUser(null);
// //     form.resetFields();
// //   };

// //   // Cột cho bảng
// //   const columns = [
// //     {
// //       title: "ID",
// //       dataIndex: "id",
// //       key: "id",
// //     },
// //     {
// //       title: "Tên",
// //       dataIndex: "name",
// //       key: "name",
// //     },
// //     {
// //       title: "Email",
// //       dataIndex: "email",
// //       key: "email",
// //     },
// //     {
// //       title: "Số điện thoại",
// //       dataIndex: "phone",
// //       key: "phone",
// //     },
// //     {
// //       title: "Trạng thái hoạt động",
// //       dataIndex: "is_active",
// //       key: "is_active",
// //       render: (isActive) => <Switch checked={isActive} disabled />,
// //     },
// //     {
// //       title: "Hành động",
// //       key: "action",
// //       render: (_, record) => (
// //         <Space>
// //           <Button
// //             type="primary"
// //             icon={<EditOutlined />}
// //             onClick={() => openModal(record)}
// //           >
// //             Sửa
// //           </Button>
// //           <Popconfirm
// //             title="Bạn có chắc chắn muốn xóa người dùng này?"
// //             onConfirm={() => handleDelete(record.id)}
// //             okText="Có"
// //             cancelText="Không"
// //           >
// //             <Button type="danger" icon={<DeleteOutlined />}>
// //               Xóa
// //             </Button>
// //           </Popconfirm>
// //         </Space>
// //       ),
// //     },
// //   ];

// //   return (
// //     <div>
// //       <div style={{ marginBottom: 16 }}>
// //         <Button
// //           type="primary"
// //           icon={<PlusOutlined />}
// //           onClick={() => openModal()}
// //         >
// //           Thêm Người Dùng
// //         </Button>
// //       </div>

// //       {/* Bảng người dùng */}
// //       <Table
// //         columns={columns}
// //         dataSource={users} // Phải là một mảng
// //         loading={isLoading}
// //         rowKey="id" // `id` là khóa duy nhất cho mỗi bản ghi
// //       />

// //       {/* Modal thêm/sửa */}
// //       <Modal
// //         title={isEditing ? "Chỉnh sửa Người Dùng" : "Thêm Người Dùng"}
// //         open={isModalOpen}
// //         onOk={handleOk}
// //         onCancel={closeModal}
// //         okText={isEditing ? "Cập nhật" : "Thêm"}
// //         cancelText="Hủy"
// //       >
// //         <Form form={form} layout="vertical">
// //           <Form.Item
// //             label="Tên"
// //             name="name"
// //             rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
// //           >
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             label="Email"
// //             name="email"
// //             rules={[
// //               { required: true, message: "Vui lòng nhập email!" },
// //               { type: "email", message: "Email không hợp lệ!" },
// //             ]}
// //           >
// //             <Input />
// //           </Form.Item>
// //           {!isEditing && (
// //             <Form.Item
// //               label="Mật khẩu"
// //               name="password"
// //               rules={[
// //                 { required: true, message: "Vui lòng nhập mật khẩu!" },
// //                 { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
// //               ]}
// //             >
// //               <Input.Password />
// //             </Form.Item>
// //           )}
// //           <Form.Item
// //             label="Số điện thoại"
// //             name="phone"
// //             rules={[
// //               {
// //                 pattern: /^[0-9]{9,15}$/,
// //                 message: "Số điện thoại không hợp lệ!",
// //               },
// //             ]}
// //           >
// //             <Input />
// //           </Form.Item>
// //           <Form.Item
// //             label="Trạng thái hoạt động"
// //             name="is_active"
// //             valuePropName="checked"
// //           >
// //             <Switch />
// //           </Form.Item>
// //         </Form>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default UserManagement;
// import React, { useState } from "react";
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Input,
//   Switch,
//   Space,
//   message,
//   Popconfirm,
//   Select,
// } from "antd";
// import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
// import mockUsers from "./mockUsers"; // Mock data
// import TagList from "../../components/Admin/Taglist";

// const { Option } = Select;

// const UserManagement = () => {
//   const [users, setUsers] = useState(mockUsers); // Sử dụng mock data
//   const [isModalOpen, setIsModalOpen] = useState(false); // Hiển thị modal
//   const [isEditing, setIsEditing] = useState(false); // Chế độ chỉnh sửa
//   const [currentUser, setCurrentUser] = useState(null); // Người dùng hiện tại
//   const [form] = Form.useForm();

//   const openModal = (user = null) => {
//     setIsEditing(!!user);
//     setCurrentUser(user);
//     setIsModalOpen(true);
//     if (user) {
//       form.setFieldsValue({
//         ...user,
//         roles: user.roles?.map((role) => role.id),
//         permissions: user.permissions?.map((perm) => perm.id),
//       });
//     } else {
//       form.resetFields();
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentUser(null);
//     form.resetFields();
//   };

//   const handleOk = async () => {
//     try {
//       const values = await form.validateFields();
//       const userData = {
//         ...values,
//         roles: values.roles.map((roleId) => ({
//           id: roleId,
//           name: roleId === 1 ? "Admin" : roleId === 2 ? "Editor" : "Viewer",
//         })),
//         permissions: values.permissions.map((permId) => ({
//           id: permId,
//           name:
//             permId === 1
//               ? "create_user"
//               : permId === 2
//               ? "edit_post"
//               : permId === 3
//               ? "delete_post"
//               : "view_reports",
//         })),
//       };

//       if (isEditing) {
//         setUsers((prevUsers) =>
//           prevUsers.map((user) =>
//             user.id === currentUser.id ? { ...user, ...userData } : user
//           )
//         );
//         message.success("Người dùng đã được cập nhật!");
//       } else {
//         setUsers((prevUsers) => [
//           ...prevUsers,
//           { id: prevUsers.length + 1, ...userData },
//         ]);
//         message.success("Người dùng mới đã được thêm!");
//       }
//       closeModal();
//     } catch (error) {
//       message.error("Có lỗi xảy ra!");
//     }
//   };

//   const handleDelete = (id) => {
//     setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
//     message.success("Người dùng đã được xóa!");
//   };

//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "Tên",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Số điện thoại",
//       dataIndex: "phone",
//       key: "phone",
//     },
//     {
//       title: "Trạng thái",
//       dataIndex: "is_active",
//       key: "is_active",
//       render: (isActive) => <Switch checked={isActive} disabled />,
//     },
//     {
//       title: "Vai trò",
//       dataIndex: "roles",
//       key: "roles",
//       render: (roles) => <TagList items={roles} color="blue" />, // Sử dụng TagList
//     },
//     {
//       title: "Quyền",
//       dataIndex: "permissions",
//       key: "permissions",
//       render: (permissions) => (
//         <TagList items={permissions} color="green" isPermission /> // Định dạng quyền
//       ),
//     },
//     {
//       title: "Hành động",
//       key: "action",
//       render: (_, record) => (
//         <Space>
//           <Button
//             type="primary"
//             icon={<EditOutlined />}
//             onClick={() => openModal(record)}
//           >
//             Sửa
//           </Button>
//           <Popconfirm
//             title="Bạn có chắc chắn muốn xóa người dùng này?"
//             onConfirm={() => handleDelete(record.id)}
//             okText="Có"
//             cancelText="Không"
//           >
//             <Button type="danger" icon={<DeleteOutlined />}>
//               Xóa
//             </Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <div style={{ marginBottom: 16 }}>
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           onClick={() => openModal()}
//         >
//           Thêm Người Dùng
//         </Button>
//       </div>

//       <Table
//         columns={columns}
//         dataSource={users}
//         rowKey="id"
//         pagination={{ pageSize: 10 }}
//       />

//       <Modal
//         title={isEditing ? "Chỉnh sửa Người Dùng" : "Thêm Người Dùng"}
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={closeModal}
//         okText={isEditing ? "Cập nhật" : "Thêm"}
//         cancelText="Hủy"
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             label="Tên"
//             name="name"
//             rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               { required: true, message: "Vui lòng nhập email!" },
//               { type: "email", message: "Email không hợp lệ!" },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           {!isEditing && (
//             <Form.Item
//               label="Mật khẩu"
//               name="password"
//               rules={[
//                 { required: true, message: "Vui lòng nhập mật khẩu!" },
//                 { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
//               ]}
//             >
//               <Input.Password />
//             </Form.Item>
//           )}
//           <Form.Item
//             label="Số điện thoại"
//             name="phone"
//             rules={[
//               {
//                 pattern: /^[0-9]{9,15}$/,
//                 message: "Số điện thoại không hợp lệ!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Trạng thái hoạt động"
//             name="is_active"
//             valuePropName="checked"
//           >
//             <Switch />
//           </Form.Item>
//           <Form.Item
//             label="Vai trò"
//             name="roles"
//             rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
//           >
//             <Select mode="multiple" placeholder="Chọn vai trò">
//               <Option value={1}>Admin</Option>
//               <Option value={2}>Editor</Option>
//               <Option value={3}>Viewer</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Quyền"
//             name="permissions"
//             rules={[{ required: true, message: "Vui lòng chọn quyền!" }]}
//           >
//             <Select mode="multiple" placeholder="Chọn quyền">
//               <Option value={1}>Create User</Option>
//               <Option value={2}>Edit Post</Option>
//               <Option value={3}>Delete Post</Option>
//               <Option value={4}>View Reports</Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default UserManagement;
import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Space,
  message,
  Popconfirm,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useGetUsersQuery,
  useGetRolesQuery,
  useGetPermissionsQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAssignRoleMutation,
  useAssignPermissionsMutation,
} from "../../../redux/api/userApi";

const { Option } = Select;

const UserManagement = () => {
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();
  const { data: roles = [], isLoading: rolesLoading } = useGetRolesQuery();
  const { data: permissions = [], isLoading: permissionsLoading } =
    useGetPermissionsQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [assignRole] = useAssignRoleMutation();
  const [assignPermissions] = useAssignPermissionsMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [form] = Form.useForm();

  const openModal = (user = null) => {
    setIsEditing(!!user);
    setCurrentUser(user);
    setIsModalOpen(true);
    if (user) {
      form.setFieldsValue({
        ...user,
        roles: user.roles?.map((role) => role.id),
        permissions: user.permissions?.map((perm) => perm.id),
      });
    } else {
      form.resetFields();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = form.getFieldsValue();
      if (isEditing) {
        // Update user
        await updateUser({ id: currentUser.id, ...values });
        await assignRole({ user_id: currentUser.id, role_id: values.roles });
        await assignPermissions({
          user_id: currentUser.id,
          permission_ids: values.permissions,
        });
        message.success("Cập nhật người dùng thành công!");
      } else {
        // Create user
        const { roles, permissions, ...userData } = values;
        const newUser = await createUser(userData).unwrap();
        await assignRole({ user_id: newUser.id, role_id: roles });
        await assignPermissions({
          user_id: newUser.id,
          permission_ids: permissions,
        });
        message.success("Thêm người dùng mới thành công!");
      }
      closeModal();
    } catch (error) {
      message.error("Có lỗi xảy ra!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success("Người dùng đã được xóa!");
    } catch (error) {
      message.error("Không thể xóa người dùng!");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive) => <Switch checked={isActive} disabled />,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="danger" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          Thêm Người Dùng
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        loading={usersLoading}
        rowKey="id"
      />
      <Modal
        title={isEditing ? "Chỉnh sửa Người Dùng" : "Thêm Người Dùng"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={isEditing ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>
          {!isEditing && (
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                pattern: /^[0-9]{9,15}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Trạng thái hoạt động"
            name="is_active"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Vai trò"
            name="roles"
            rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn vai trò"
              loading={rolesLoading}
            >
              {roles.map((role) => (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Quyền"
            name="permissions"
            rules={[{ required: true, message: "Vui lòng chọn quyền!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn quyền"
              loading={permissionsLoading}
            >
              {permissions.map((perm) => (
                <Option key={perm.id} value={perm.id}>
                  {perm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
