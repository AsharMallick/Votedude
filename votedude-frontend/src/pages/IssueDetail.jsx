import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from "../redux/services/api";
import { useSelector } from "react-redux";

const issueDetailApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getIssueById: builder.query({
      query: (id) => `/issues/${id}`,
      providesTags: (result, error, id) => [{ type: "Issue", id }],
    }),
    ensureIssueDiscussion: builder.mutation({
      query: (id) => ({
        url: `/issues/${id}/ensure-discussion`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

const { useGetIssueByIdQuery, useEnsureIssueDiscussionMutation } =
  issueDetailApi;

export default function IssueDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetIssueByIdQuery(id);
  const issue = data?.issue;

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [ensureDiscussion, { isLoading: ensuring }] =
    useEnsureIssueDiscussionMutation();

  const handleDiscuss = async () => {
    if (!user) {
      navigate("/auth", { state: { login: true } });
      return;
    }

    const existing =
      issue?.discussionPost?._id || issue?.discussionPost || null;
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
  if (isError || !issue) {
    return <p className="text-center py-20 text-red-500">Issue not found.</p>;
  }

  const followers = issue.followerCount || 0;
  const pulse = Math.min(
    Math.max(Math.round((followers / 160000) * 100), 8),
    98,
  );
  const pro = issue.proArguments || [];
  const con = issue.conArguments || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/issues"
        className="text-[13px] text-vd-green font-medium hover:underline inline-flex items-center gap-1 mb-6"
      >
        ← Back to Issues
      </Link>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Main */}
        <div className="bg-white border border-[#00000014] rounded-2xl p-6 sm:p-8">
          <p className="text-[12px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
            Issue Details
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {issue.title}
          </h1>
          <p className="text-[13px] text-gray-500 mb-5">
            Updated{" "}
            {issue.updatedAt
              ? new Date(issue.updatedAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "—"}{" "}
            · {followers.toLocaleString()} followers · National issue
          </p>
          <p className="text-[15px] text-gray-600 leading-relaxed mb-8">
            {issue.summary}
          </p>

          <h2 className="text-lg font-bold text-gray-900 mb-3">
            What&apos;s at stake?
          </h2>
          <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
            This page gives a plain-language overview of arguments on both sides
            and connects the issue to legislation, candidates, and community
            discussion.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="rounded-xl bg-[#eef8f2] p-4">
              <p className="text-[11px] font-extrabold text-vd-green tracking-wide uppercase mb-2">
                For
              </p>
              <ul className="space-y-2 text-[13px] text-gray-700">
                {pro.length ? (
                  pro.map((a, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-vd-green">•</span>
                      <span>{a}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No points listed yet.</li>
                )}
              </ul>
            </div>
            <div className="rounded-xl bg-[#fdf2f2] p-4">
              <p className="text-[11px] font-extrabold text-red-500 tracking-wide uppercase mb-2">
                Against
              </p>
              <ul className="space-y-2 text-[13px] text-gray-700">
                {con.length ? (
                  con.map((a, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-red-400">•</span>
                      <span>{a}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No points listed yet.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-[#00000014] rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-3">Issue pulse</h3>
            <div className="flex justify-between text-[13px] text-gray-500 mb-1">
              <span>Community interest</span>
              <span className="font-semibold text-gray-900">{pulse}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-vd-green rounded-full"
                style={{ width: `${pulse}%` }}
              />
            </div>
            <p className="text-[12px] text-gray-500">
              {followers.toLocaleString()} people follow this issue.
            </p>
          </div>

          <div className="bg-white border border-[#00000014] rounded-2xl p-5">
            <h3 className="font-bold text-gray-900 mb-2">Discuss this issue</h3>
            <p className="text-[13px] text-gray-500 mb-4">
              Join a civil conversation with other citizens.
            </p>
            <button
              type="button"
              disabled={ensuring}
              onClick={handleDiscuss}
              className="h-11 px-5 bg-vd-green hover:bg-vd-green-dark text-white text-[14px] font-medium rounded-md"
            >
              {ensuring ? "Opening..." : "Join Discussion →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
