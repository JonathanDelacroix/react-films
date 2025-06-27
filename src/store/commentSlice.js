import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      const { id, comment, note } = action.payload;
      state.push({ id, comment, note });
    },
    deleteComment: (state, action) => {
      const index = state.findIndex(comment => comment.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }
  }
});

export const { addComment, deleteComment } = commentSlice.actions
export default commentSlice.reducer
