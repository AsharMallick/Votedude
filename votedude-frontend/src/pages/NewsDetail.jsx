import { useParams, Link } from "react-router-dom";
import { api } from "../redux/services/api";

const newsDetailApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNewsById: builder.query({
      query: (id) => `/news/${id}`,
      providesTags: (result, error, id) => [{ type: "News", id }],
    }),
  }),
  overrideExisting: true,
});

const { useGetNewsByIdQuery } = newsDetailApi;

export default function NewsDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetNewsByIdQuery(id);
  const article = data?.article;

  if (isLoading) {
    return <p className="text-center py-20 text-gray-500">Loading...</p>;
  }
  if (isError || !article) {
    return (
      <p className="text-center py-20 text-red-500">Article not found.</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/news"
        className="text-[13px] text-vd-green font-medium hover:underline"
      >
        ← Back to news
      </Link>

      <article className="mt-4">
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover rounded-2xl mb-6"
          />
        )}
        <div className="text-[12px] font-extrabold text-vd-green uppercase mb-2">
          {article.category}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {article.title}
        </h1>
        <p className="text-[13px] text-gray-500 mb-6">
          {article.createdAt
            ? new Date(article.createdAt).toLocaleDateString()
            : ""}{" "}
          · {article.author?.name || "Staff"}
        </p>
        <div className="text-[16px] text-gray-700 leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>
      </article>
    </div>
  );
}
