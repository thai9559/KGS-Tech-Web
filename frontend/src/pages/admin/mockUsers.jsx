const mockUsers = [
  {
    id: 1,
    name: "Nguyen Van A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    is_active: true,
    roles: [
      { id: 1, name: "Admin" },
      { id: 2, name: "Editor" },
    ],
    permissions: [
      { id: 1, name: "create_user" },
      { id: 2, name: "edit_post" },
    ],
  },
  {
    id: 2,
    name: "Tran Thi B",
    email: "tranthib@example.com",
    phone: "0987654321",
    is_active: false,
    roles: [{ id: 2, name: "Editor" }],
    permissions: [{ id: 3, name: "delete_post" }],
  },
  {
    id: 3,
    name: "Le Van C",
    email: "levanc@example.com",
    phone: "0333333333",
    is_active: true,
    roles: [{ id: 3, name: "Viewer" }],
    permissions: [{ id: 4, name: "view_reports" }],
  },
];

// Xuất dữ liệu bằng default export
export default mockUsers;
