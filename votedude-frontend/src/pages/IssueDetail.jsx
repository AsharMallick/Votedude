import { useParams, Link } from "react-router-dom";
import { api } from "../redux/services/api";

const issueDetailApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getIssueById: builder.query({
      query: (id) => `/issues/${id}`,
      providesTags: (result, error, id) => [{ type: "Issue", id }],
    }),
  }),
  overrideExisting: true,
});

const { useGetIssueByIdQuery } = issueDetailApi;

export default function IssueDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetIssueByIdQuery(id);
  const issue = data?.issue;

  if (isLoading) {
    return <p className="text-center py-20 text-gray-500">Loading...</p>;
  }
  if (isError || !issue) {
    return <p className="text-center py-20 text-red-500">Issue not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/issues"
        className="text-[13px] text-vd-green font-medium hover:underline"
      >
        ← Back to issues
      </Link>

      <article className="mt-4 bg-white border border-[#00000031] rounded-2xl p-6">
        <div className="text-[12px] font-extrabold text-vd-green uppercase mb-2">
          {(issue.trend || "steady").toUpperCase()}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{issue.title}</h1>
        <p className="text-[15px] text-gray-700 leading-relaxed mb-6">
          {issue.summary}
        </p>

        {(issue.proArguments || []).length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Key points</h3>
            <ul className="list-disc pl-5 space-y-1 text-[14px] text-gray-600">
              {issue.proArguments.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}

        {(issue.conArguments || []).length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Other views</h3>
            <ul className="list-disc pl-5 space-y-1 text-[14px] text-gray-600">
              {issue.conArguments.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}
