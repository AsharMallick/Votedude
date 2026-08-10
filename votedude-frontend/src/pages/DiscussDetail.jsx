import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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

export default function DiscussDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, isError } = useGetPostByIdQuery(id);
  const [addReply, { isLoading: replying }] = useAddReplyMutation();
  const [toggleLike] = useToggleLikeMutation();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if ((data, user, !isLoading)) {
      setIsLiked(data?.post.likes.includes(user._id));
    }
  }, [data, user]);
  const [reply, setReply] = useState("");

  const post = data?.post;
  const replies = data?.replies || [];

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/discuss"
        className="text-[13px] text-vd-green font-medium hover:underline"
      >
        ← Back to discussions
      </Link>

      <article className="bg-white border border-[#00000031] rounded-2xl p-6 mt-4">
        <div className="text-[12px] font-extrabold text-vd-green uppercase mb-2">
          {post.category}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <p className="text-[13px] text-gray-500 mb-4">
          By {post.author?.name || "Member"} · {post.likes?.length || 0} likes ·{" "}
          {post.replyCount || replies.length} replies
        </p>
        <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
        <button
          type="button"
          onClick={() => {
            if (!user) {
              navigate("/auth", { state: { login: true } });
              return;
            }
            toggleLike(id);
            setIsLiked(() => !isLiked);
          }}
          className="mt-4 h-9 px-4 text-[13px] font-medium border border-vd-green text-vd-green rounded-md hover:bg-vd-green hover:text-white transition-colors"
        >
          {isLiked ? "Unlike" : "Like"}
        </button>
      </article>

      <section className="mt-8">
        <h2 className="font-bold text-gray-900 mb-4">Replies</h2>
        <div className="space-y-3 mb-6">
          {replies.length === 0 && (
            <p className="text-sm text-gray-500">No replies yet.</p>
          )}
          {replies.map((r) => (
            <div
              key={r._id}
              className="bg-white border border-[#00000031] rounded-xl p-4"
            >
              <div className="text-[13px] font-semibold text-gray-900">
                {r.author?.name || "Member"}
              </div>
              <p className="text-[14px] text-gray-700 mt-1">{r.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleReply} className="space-y-3">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a reply..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30 resize-none"
          />
          <button
            type="submit"
            disabled={replying}
            className="h-10 px-5 bg-vd-green hover:bg-vd-green-dark text-white text-[14px] font-medium rounded-md"
          >
            {replying ? "Posting..." : "Reply"}
          </button>
        </form>
      </section>
    </div>
  );
}
