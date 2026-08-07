import { useMemo, useState } from "react";
import {
  useGetIssuesQuery,
  useSearchIssuesMutation,
} from "../redux/services/issueApi";
import { Link } from "react-router-dom";

export default function Issues() {
  const { data, isLoading, isError, error } = useGetIssuesQuery();
  const [searchIssues] = useSearchIssuesMutation();

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const allIssues = data?.issues || [];

  const issues = useMemo(() => {
    if (!query.trim()) return allIssues;

    const q = query.toLowerCase();

    return allIssues.filter((issue) => {
      const haystack = [
        issue.title,
        issue.summary,
        ...(issue.proArguments || []),
        ...(issue.conArguments || []),
        issue.trend,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [allIssues, query]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const value = search.trim();
    setQuery(value);

    if (!value) return;

    try {
      await searchIssues({ query: value }).unwrap();
    } catch {
      // Local filtering is still used as a fallback.
    }
  };

  const formatFollowers = (count = 0) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }

    if (count >= 1000) {
      return `${Math.round(count / 1000)}K`;
    }

    return count.toString();
  };

  const trendStyle = (trend = "") => {
    switch (trend.toLowerCase()) {
      case "hot":
        return "bg-red-50 text-red-600 border-red-100";

      case "rising":
        return "bg-orange-50 text-orange-600 border-orange-100";

      case "new":
        return "bg-blue-50 text-blue-600 border-blue-100";

      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-[#e1e1e1] border-[#00000031] border">
        <div className="flex justify-start w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-[13px] font-medium text-[#5e9c82] tracking-wide uppercase mb-3">
              Explore Issues
            </p>

            <h1 className="text-[2.5rem] font-extrabold sm:text-[2.75rem] tracking-tight text-gray-900 leading-tight mb-4">
              Understand the issues.
            </h1>

            <p className="text-[17px] text-gray-600 max-w-xl mb-8 leading-relaxed">
              Explore the issues shaping our communities, understand both sides
              of the debate, and make informed decisions.
            </p>

            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row items-stretch gap-3 max-w-[520px]"
            >
              <div className="relative flex-1">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search issues"
                  className="w-full h-[46px] pl-11 pr-4 rounded-full border border-gray-200 bg-white text-[15px] placeholder:text-gray-400 focus:outline-none shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="h-[46px] px-7 bg-vd-green hover:bg-vd-green-dark transition text-white text-[15px] font-medium rounded-full shadow-sm whitespace-nowrap"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Issues */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 py-12">
        {isLoading && (
          <p className="text-center text-gray-500 py-20">Loading issues...</p>
        )}

        {isError && (
          <p className="text-center text-red-500 py-20">
            {error?.data?.message || "Failed to load issues"}
          </p>
        )}

        {!isLoading && !isError && issues.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No issues found.</p>

            {query && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setQuery("");
                }}
                className="mt-4 text-vd-green hover:underline text-sm font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {!isLoading && !isError && issues.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {issues.map((issue) => (
              <IssueCard
                key={issue._id}
                issue={issue}
                formatFollowers={formatFollowers}
                trendStyle={trendStyle}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function IssueCard({ issue, formatFollowers, trendStyle }) {
  const proArguments = issue.proArguments || [];
  const conArguments = issue.conArguments || [];

  return (
    <article className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-semibold text-[18px] text-gray-900 leading-tight">
              {issue.title}
            </h2>

            {issue.trend && (
              <span
                className={`inline-block mt-2 px-2.5 py-[3px] text-[11px] font-medium rounded-full border ${trendStyle(
                  issue.trend,
                )}`}
              >
                {issue.trend}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {issue.summary && (
          <p className="text-[14px] text-gray-600 leading-relaxed mt-4">
            {issue.summary}
          </p>
        )}

        {/* Arguments */}
        {(proArguments.length > 0 || conArguments.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {proArguments.length > 0 && (
              <div className="bg-green-50/60 border border-green-100 rounded-xl p-4">
                <p className="text-[12px] font-semibold text-green-700 uppercase tracking-wide mb-2">
                  For
                </p>

                <ul className="space-y-2">
                  {proArguments.slice(0, 2).map((argument, index) => (
                    <li
                      key={index}
                      className="text-[13px] text-gray-600 leading-relaxed"
                    >
                      • {argument}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {conArguments.length > 0 && (
              <div className="bg-red-50/60 border border-red-100 rounded-xl p-4">
                <p className="text-[12px] font-semibold text-red-700 uppercase tracking-wide mb-2">
                  Against
                </p>

                <ul className="space-y-2">
                  {conArguments.slice(0, 2).map((argument, index) => (
                    <li
                      key={index}
                      className="text-[13px] text-gray-600 leading-relaxed"
                    >
                      • {argument}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a4 4 0 00-4-4h-1m-6 6H3v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 0a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>

            <span>{formatFollowers(issue.followerCount)} followers</span>
          </div>

          <Link
            to={`/issues/${issue._id}`}
            className="px-4 py-2 rounded-full text-[13px] font-medium border border-gray-200 text-gray-700 hover:border-vd-green hover:text-vd-green transition"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
