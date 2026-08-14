import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "../redux/services/api";

const discussDetailApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPostById: builder.query({
      query: (id) => `/discuss/${id}`,
      providesTags: (result, error, id) => [{ type: "Discuss", id }],
    }),
    addReply: builder.mutation({
      query: ({ id, content }) => ({
        url: `/discuss/${id}/reply`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Discuss", id },
        "Discuss",
      ],
    }),
    toggleLike: builder.mutation({
      query: (id) => ({
        url: `/discuss/${id}/like`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Discuss", id },
        "Discuss",
      ],
    }),
  }),
  overrideExisting: true,
});

const { useGetPostByIdQuery, useAddReplyMutation, useToggleLikeMutation } =
  discussDetailApi;

function timeAgo(date) {
  if (!date) return "";
  const diff = Date.now() - new Date(date).getTime();
  const d = Math.floor(diff / 86400000);
  if (d > 1) return `${d} days ago`;
  if (d === 1) return "1 day ago";
  const h = Math.floor(diff / 3600000);
  if (h >= 1) return `${h} hour${h > 1 ? "s" : ""} ago`;
  return "Just now";
}

function userHasLiked(likes = [], userId) {
  if (!userId) return false;
  return likes.some(
    (id) => String(id) === String(userId) || String(id?._id) === String(userId),
  );
}

export default function DiscussDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, isError } = useGetPostByIdQuery(id);
  const [addReply, { isLoading: replying }] = useAddReplyMutation();
  const [toggleLike, { isLoading: liking }] = useToggleLikeMutation();

  const [isLiked, setIsLiked] = useState(false);
  const [reply, setReply] = useState("");

  const post = data?.post;
  const replies = data?.replies || [];

  // Sync like state from server when post/user loads
  useEffect(() => {
    if (!post || !user) {
      setIsLiked(false);
      return;
    }
    setIsLiked(userHasLiked(post.likes, user._id));
  }, [post, user]);

  const handleLike = async () => {
    if (!user) {
      navigate("/auth", { state: { login: true } });
      return;
    }
    // optimistic UI
    setIsLiked((prev) => !prev);
    try {
      await toggleLike(id).unwrap();
    } catch {
      // revert on failure
      setIsLiked((prev) => !prev);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/auth", { state: { login: true } });
      return;
    }
    if (!reply.trim()) return;
    try {
      await addReply({ id, content: reply.trim() }).unwrap();
      setReply("");
    } catch (err) {
      alert(err?.data?.message || "Could not reply");
    }
  };

  if (isLoading) {
    return <p className="text-center py-20 text-gray-500">Loading...</p>;
  }
  if (isError || !post) {
    return <p className="text-center py-20 text-red-500">Post not found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/discuss"
        className="text-[13px] text-vd-green font-medium hover:underline inline-flex items-center gap-1 mb-6"
      >
        ← Back to Discussions
      </Link>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="bg-white border border-[#00000014] rounded-2xl p-6 sm:p-8">
          <p className="text-[12px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
            Discussion · {post.category}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
            {post.title}
          </h1>
          <p className="text-[13px] text-gray-500 mb-4">
            Started by {post.author?.name || "Member"} ·{" "}
            {post.replyCount || replies.length} replies ·{" "}
            {post.likes?.length || 0} likes
          </p>
          <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">
            {post.content}
          </p>

          <button
            type="button"
            disabled={liking}
            onClick={handleLike}
            className={`h-9 px-4 text-[13px] font-medium rounded-md border transition-colors mb-8 ${
              isLiked
                ? "bg-vd-green text-white border-vd-green"
                : "border-vd-green text-vd-green hover:bg-vd-green hover:text-white"
            }`}
          >
            {isLiked ? "Unlike" : "Like"}
          </button>

          <div className="space-y-6 mb-8">
            {replies.map((r) => (
              <div key={r._id} className="border-t border-gray-100 pt-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-[14px] text-gray-900">
                    {r.author?.name || "Member"}
                  </span>
                  <span className="text-[12px] text-gray-400">
                    {timeAgo(r.createdAt)}
                  </span>
                </div>
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  {r.content}
                </p>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleReply}
            className="rounded-xl border border-gray-100 bg-gray-50 p-5"
          >
            <h3 className="font-bold text-gray-900 mb-3">Add your voice</h3>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a civil, useful reply..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30 resize-none mb-3"
            />
            <button
              type="submit"
              disabled={replying}
              className="h-10 px-5 bg-vd-green hover:bg-vd-green-dark text-white text-[14px] font-medium rounded-md"
            >
              {replying ? "Posting..." : "Post Reply"}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-[#00000014] rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-2">Discussion rules</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Keep it civil, stay on topic, and argue ideas — not people.
            </p>
          </div>
          <div className="bg-white border border-[#00000014] rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-2">Related</h3>
            <p className="text-[13px] text-gray-600">{post.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
