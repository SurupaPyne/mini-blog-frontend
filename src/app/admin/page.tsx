"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchAdminPosts, deletePost } from "@/redux/postsSlice";
import PostForm from "@/components/PostForm";
import { Post } from "@/redux/postsSlice";

export default function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    dispatch(fetchAdminPosts());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <Link href="/" className="text-blue-500 hover:underline mb-4">
        Go back to home page 
      </Link>
      <PostForm post={editingPost} onClose={() => setEditingPost(null)} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <h2 className="text-2xl font-semibold my-4">Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border p-4 mb-2 rounded shadow bg-white">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-gray-700">{post.body.slice(0, 100)}...</p>
            <div className="mt-2 space-x-4">
              <button
                onClick={() => setEditingPost(post)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deletePost(post.id))}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
