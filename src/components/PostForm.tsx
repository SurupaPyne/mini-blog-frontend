"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addPost, updatePost, Post } from "@/redux/postsSlice";

interface PostFormProps {
  post?: Post | null;
  onClose?: () => void;
}

export default function PostForm({ post, onClose }: PostFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (post && post.id) {
      dispatch(updatePost({ id: post.id, title, body }));
      onClose?.();
    } else {
      dispatch(addPost({ title, body }));
    }

    setTitle("");
    setBody("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 border rounded bg-white shadow"
    >
      <input
        type="text"
        className="border p-2 mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        className="border p-2 w-full mb-2"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        required
        rows={4}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {post ? "Update" : "Add"} Post
        </button>
        {post && onClose && (
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
