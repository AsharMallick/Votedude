import { api } from "../redux/services/api";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const newsDetailApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNewsById: builder.query({
      query: (id) => `/news/${id}`,
      providesTags: (result, error, id) => [{ type: "News", id }],
    }),
    ensureNewsDiscussion: builder.mutation({
      query: (id) => ({
        url: `/news/${id}/ensure-discussion`,
        method: "POST",
      }),
    }),
  }),

  overrideExisting: true,
});

const { useGetNewsByIdQuery, useEnsureNewsDiscussionMutation } = newsDetailApi;

export default function NewsDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetNewsByIdQuery(id);
  const article = data?.news || data?.article;

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [ensureDiscussion, { isLoading: ensuring }] =
    useEnsureNewsDiscussionMutation();

  const handleDiscuss = async () => {
    if (!user) {
      navigate("/auth", { state: { login: true } });
      return;
    }

    const existing =
      article?.discussionPost?._id || article?.discussionPost || null;
    if (existing) {
      navigate(`/discuss/${existing}`);
      return;
    }

    try {
      const res = await ensureDiscussion(id).unwrap();
      navigate(`/discuss/${res.postId}`);
    } catch (err) {
      alert(err?.data?.message || "Could not open discussion");
    }
  };
  if (isLoading) {
    return <p className="text-center py-20 text-gray-500">Loading...</p>;
  }
  if (isError || !article) {
    return <p className="text-center py-20 text-red-500">Article not found.</p>;
  }

  const dateStr = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/news"
        className="text-[13px] text-vd-green font-medium hover:underline inline-flex items-center gap-1 mb-6"
      >
        ← Back to News
      </Link>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <article className="bg-white border border-[#00000014] rounded-2xl p-6 sm:p-8">
          <p className="text-[12px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
            {article.category || "News"}
            {dateStr ? ` · ${dateStr}` : ""}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
            {article.title}
          </h1>
          <p className="text-[13px] text-gray-500 mb-6">
            By {article.author?.name || "Vote Dude News"}
          </p>

          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-xl mb-6" />
          )}

          <div className="text-[16px] text-gray-700 leading-relaxed whitespace-pre-wrap mb-8">
            {article.content}
          </div>

          <div className="rounded-xl bg-gray-50 border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-1">
              Keep the conversation going.
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              See what other citizens are saying about this story.
            </p>
            <button
              type="button"
              disabled={ensuring}
              onClick={handleDiscuss}
              className="h-10 px-5 bg-vd-green hover:bg-vd-green-dark text-white text-[14px] font-medium rounded-md"
            >
              {ensuring ? "Opening..." : "Discuss this story →"}
            </button>
          </div>
        </article>

        <aside className="bg-white border border-[#00000014] rounded-2xl p-5 h-fit">
          <h3 className="font-bold text-gray-900 mb-3">Related</h3>
          <p className="text-[13px] text-gray-500">More context coming soon.</p>
        </aside>
      </div>
    </div>
  );
}
