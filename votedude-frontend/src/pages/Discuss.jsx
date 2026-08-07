import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetPostsQuery,
  useCreatePostMutation,
} from "../redux/services/discussApi";

const CATEGORIES = [
  "National Politics",
  "Local Politics",
  "Sports",
  "Current Events",
  "Community",
  "Ideas",
];

export default function Discuss() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, isError, error } = useGetPostsQuery();
  const [createPost, { isLoading: creating }] = useCreatePostMutation();

  const posts = data?.posts || [];

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const openForm = () => {
    if (!user) {
      navigate("/auth", { state: { login: true } });
      return;
    }
    setShowForm(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      await createPost({ title, content, category }).unwrap();
      setTitle("");
      setContent("");
      setCategory(CATEGORIES[0]);
      setShowForm(false);
    } catch (err) {
      alert(err?.data?.message || "Could not create post");
    }
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-[#e1e1e1] border border-[#00000031]">
        <section className="flex flex-col justify-start w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <div>
            <p className="text-[13px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
              Recommended Discussions
            </p>
            <h1 className="text-[2.4rem] sm:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight mb-4">
              Real conversations. Real people.
            </h1>
            <div className="flex justify-between items-center gap-6">
              <p className="text-[15.5px] text-gray-600 leading-relaxed w-1/2">
                Debate the issues with fellow citizens — civil, moderated, and
                built for genuine dialogue.
              </p>
              <button
                onClick={openForm}
                className="h-[44px] px-5 bg-vd-green hover:bg-vd-green-dark text-white text-[14px] font-medium rounded-md transition-colors shadow-sm whitespace-nowrap flex items-center gap-1.5"
              >
                <span className="text-lg leading-none">+</span>
                Start a Discussion
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* New post form */}
      {showForm && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
          <form
            onSubmit={handleCreate}
            className="bg-white border border-[#00000031] rounded-2xl p-6 space-y-4"
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Discussion title"
              className="w-full h-11 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30"
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30 resize-none"
              required
            />
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="h-10 px-4 text-[14px] text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="h-10 px-5 bg-vd-green hover:bg-vd-green-dark text-white text-[14px] font-medium rounded-md"
              >
                {creating ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Posts list */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {isLoading && (
          <p className="text-center text-gray-500 py-16">
            Loading discussions...
          </p>
        )}
        {isError && (
          <p className="text-center text-red-500 py-16">
            {error?.data?.message || "Failed to load discussions"}
          </p>
        )}
        {!isLoading && posts.length === 0 && (
          <p className="text-center text-gray-500 py-16">
            No discussions yet. Start the first one.
          </p>
        )}

        <div className="space-y-3">
          {posts.map(
            (d) =>
              d.approved && (
                <article
                  key={d._id}
                  className="bg-white border border-[#00000031] rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[15.5px] text-gray-900 leading-snug">
                        {d.title}
                      </h3>
                    </div>
                    <p className="text-[13px] text-gray-500">
                      Started by{" "}
                      {(d.author?.firstname &&
                        d.author?.firstName + d.author?.lastName) ||
                        d.author?.name ||
                        "Member"}{" "}
                      ·{" "}
                      <span className="text-vd-green font-medium">
                        {d.category}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-5 flex-shrink-0">
                    <div className="text-right flex items-center flex-col">
                      <div className="text-[15px] font-semibold text-gray-800">
                        {d.replyCount || 0}
                      </div>
                      <div className="text-[11px] text-gray-400">replies</div>
                    </div>
                    <div className="text-right flex items-center flex-col">
                      <div className="text-[15px] font-semibold text-gray-800">
                        {d.likes?.length || 0}
                      </div>
                      <div className="text-[11px] text-gray-400">likes</div>
                    </div>
                  </div>
                </article>
              ),
          )}
        </div>
      </section>
    </div>
  );
}
