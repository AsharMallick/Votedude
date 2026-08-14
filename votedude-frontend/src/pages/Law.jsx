import React, { useState } from "react";
import {
  useGetLawsQuery,
  useSearchLawsMutation,
  useEnsureLawDiscussionMutation,
} from "../redux/services/lawApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const getStatusStyle = (status) => {
  switch (status) {
    case "In Committee":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "Floor Vote":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "Passed House":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Passed Senate":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Signed":
      return "bg-green-50 text-green-700 border-green-200";

    case "Introduced":
      return "bg-gray-100 text-gray-600 border-gray-200";

    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
};

const Law = () => {
  const [search, setSearch] = useState("");
  const [searchLaws] = useSearchLawsMutation();

  const { data, isLoading, isError, error } = useGetLawsQuery();

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [ensureLawDiscussion, { isLoading: ensuring }] =
    useEnsureLawDiscussionMutation();

  const handleDiscuss = async (bill) => {
    if (!user) {
      navigate("/auth", { state: { login: true } });
      return;
    }

    const existing = bill.discussionPost?._id || bill.discussionPost;
    if (existing) {
      navigate(`/discuss/${existing}`);
      return;
    }

    try {
      const res = await ensureLawDiscussion(bill._id).unwrap();
      navigate(`/discuss/${res.postId}`);
    } catch (err) {
      alert(err?.data?.message || "Could not open discussion");
    }
  };

  const bills = data?.laws || [];

  const handleSearch = async (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) {
      return;
    }

    try {
      await searchLaws({
        search: value,
      }).unwrap();
    } catch (err) {
      console.error("Failed to search laws:", err);
    }
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-[#e1e1e1] border-[#00000031] border">
        <section className="flex justify-start w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-[13px] font-medium text-[#5e9c82] tracking-wide uppercase mb-3">
              Legislation Tracker
            </p>

            <h1 className="text-[2.5rem] font-extrabold sm:text-[2.75rem] tracking-tight text-gray-900 leading-tight mb-4">
              Track the laws that affect you.
            </h1>

            <p className="text-[17px] text-gray-600 max-w-xl mb-8 leading-relaxed">
              Follow bills from introduction to law — plain-language summaries,
              status, and where members stand.
            </p>

            {/* Search */}
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
                  placeholder="Search bills by title or bill number"
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
        </section>
      </div>

      {/* Bills List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {isLoading && (
          <div className="text-center py-20 text-gray-500">
            Loading legislation...
          </div>
        )}

        {isError && (
          <div className="text-center py-20 text-red-500">
            {error?.data?.message || "Failed to load legislation."}
          </div>
        )}

        {!isLoading && !isError && bills.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No legislation found.</p>

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="mt-3 text-sm text-vd-green hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {!isLoading && !isError && bills.length > 0 && (
          <div className="space-y-3">
            {bills.map((bill) => (
              <article
                key={bill._id}
                className="bg-white border border-[#00000031] rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-sm transition-shadow"
              >
                {/* Bill number + chamber */}
                <div className="flex-shrink-0 w-24 text-center sm:text-left">
                  <div className="text-[15px] font-bold text-gray-900 leading-tight">
                    {bill.billNumber}
                  </div>

                  <div className="text-[12px] text-gray-500 mt-0.5">
                    {bill.chamber}
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-12 bg-gray-100" />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[15.5px] text-gray-900 leading-snug">
                      {bill.title}
                    </h3>

                    <span
                      className={`inline-flex px-2.5 py-0.5 text-[11px] font-extrabold rounded-full border ${getStatusStyle(
                        bill.status,
                      )}`}
                    >
                      {bill.status}
                    </span>
                  </div>

                  <p className="text-[13.5px] text-gray-500 leading-relaxed">
                    {bill.summary}
                  </p>

                  <p className="text-[12px] text-gray-400 mt-1">
                    Updated{" "}
                    {bill.updatedAt
                      ? new Date(bill.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Recently"}
                  </p>
                </div>

                {/* Support + Discuss */}
                <div className="flex flex-row sm:flex-col items-center gap-3 sm:gap-2 justify-center flex-shrink-0">
                  <div className="text-center flex flex-col items-center justify-center">
                    <div className="text-[18px] font-bold text-vd-green leading-none">
                      {bill.supportPercent || 0}%
                    </div>

                    <div className="text-[11px] text-gray-400 mt-0.5">
                      member support
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={ensuring}
                    onClick={() => handleDiscuss(bill)}
                    className="h-9 px-4 text-[13px] font-medium text-vd-green-dark border border-vd-green-dark rounded-md hover:bg-vd-green hover:text-white transition-colors"
                  >
                    Discuss
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Law;
