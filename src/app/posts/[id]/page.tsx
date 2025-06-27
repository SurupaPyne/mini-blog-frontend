import Link from "next/link";

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  let post = null;

  try {
    const res = await fetch(`http://localhost:9001/admin/posts/${params.id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    post = data.result;
  } catch (err: any) {
    console.error("Fetch failed:", err.message);
    return (
      <div className="p-6 text-red-500">
        Failed to load post. Please try again later.
        <Link href="/" className="inline-block bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700 transition">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 border border-slate-700">
      <h1 className="text-3xl font-bold"><span>Title: </span>{post.title}</h1>
      <p className="m-4 text-2xl font-semibold">Excerpt: </p>
      <p className="m-4">{post.body}</p>
      <Link href="/" className="inline-block bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700 transition">
         Back
      </Link>
    </div>
  );
}
