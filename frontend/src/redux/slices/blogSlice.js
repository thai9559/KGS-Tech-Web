import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    filter: "", // Bộ lọc bài viết
    selectedBlog: null, // Bài viết được chọn
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload; // Cập nhật bộ lọc
    },
    selectBlog: (state, action) => {
      state.selectedBlog = action.payload; // Lưu bài viết được chọn
    },
  },
});

// Export actions
export const { setFilter, selectBlog } = blogSlice.actions;

// Export reducer
export default blogSlice.reducer;
