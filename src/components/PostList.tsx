"use client"; 

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("http://localhost:9001/admin/posts");
        console.log(res);
        setPosts(res.data.result);
      } catch (err) {
        console.log("Error loading posts:", err);
      }
    };

    getPost();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-5xl font-bold mb-4">Welcome to the Blog</h1>
      <Link href="/admin" className="text-blue-500 hover:underline">
        Go to Admin Panel →
      </Link>
      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post: any) => (
          <div
            key={post.id}
            className="p-4 border border-slate-700 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{post.title}</h2>
              <div>{post.body.slice(0, 100)}...</div>
            </div>
            <div>
              <Link href={`/posts/${post.id}`} className="inline-block bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700 transition">
                View
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

