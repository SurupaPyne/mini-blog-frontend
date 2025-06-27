
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Post {
  id: string;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchAdminPosts = createAsyncThunk<Post[]>(
  'posts/fetchAdmin',
  async () => {
    const res = await axios.get('http://localhost:9001/admin/posts');
    return res.data.result;
  }
);

export const addPost = createAsyncThunk<Post, Omit<Post, 'id'>>(
  'posts/add',
  async (post) => {
    const res = await axios.post('http://localhost:9001/admin/posts', post);
    return res.data.result;
  }
);

export const deletePost = createAsyncThunk<string, string>(
  'posts/delete',
  async (id) => {
    await axios.delete(`http://localhost:9001/admin/posts/${id}`);
    return id;
  }
);

export const updatePost = createAsyncThunk<Post, Post>(
  'posts/update',
  async (post) => {
    const { id, ...data } = post;
    const res = await axios.put(`http://localhost:9001/admin/posts/${id}`, data);
    return res.data.result;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(fetchAdminPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAdminPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })

      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      })

      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })

      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  },
});

export default postsSlice.reducer;
