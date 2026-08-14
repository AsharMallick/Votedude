import { useMemo, useState } from "react";
import { useGetCandidatesQuery } from "../redux/services/candidateApi";
import { Link } from "react-router-dom";

const partyBadge = (party = "") => {
  const p = party.toLowerCase();
  if (p.includes("republican")) {
    return "bg-red-50 text-red-700 border-red-100";
  }
  if (p.includes("democrat")) {
    return "bg-blue-50 text-blue-700 border-blue-100";
  }
  if (p.includes("independent")) {
    return "bg-purple-50 text-purple-700 border-purple-100";
  }
  return "bg-gray-50 text-gray-700 border-gray-100";
};

export default function Candidates() {
  const { data, isLoading, isError, error } = useGetCandidatesQuery();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const all = data?.candidates || [];

  const candidates = useMemo(() => {
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter((c) => {
      const hay = [c.name, c.office, c.city, c.state, c.district, c.party]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [all, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search.trim());
  };

  const officeLine = (c) => {
    const parts = [c.office];
    if (c.district) parts.push(c.district);
    return parts.join(" · ");
  };

  const locationLine = (c) => {
    return [c.city, c.state].filter(Boolean).join(", ");
  };

  // stable fake alignment % from id so UI matches design until real matching exists
  const alignment = (id = "") => {
    let n = 0;
    for (let i = 0; i < id.length; i++) n += id.charCodeAt(i);
    return 55 + (n % 36);
  };

  return (
    <>
      <div className="bg-[#e1e1e1] border-[#00000031] border">
        <section className="flex justify-start w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-[13px] font-medium text-[#5e9c82] tracking-wide uppercase mb-3">
              Find Candidates
            </p>
            <h1 className="text-[2.5rem] font-extrabold sm:text-[2.75rem] tracking-tight text-gray-900 leading-tight mb-4">
              Know who you're voting for.
            </h1>
            <p className="text-[17px] text-gray-600 max-w-xl mb-8 leading-relaxed">
              Search candidates, compare their positions, and see how they align
              <br className="hidden sm:block" />
              with what matters to you — no spin.
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
                  placeholder="Search by name, office, or city"
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

      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 py-12">
        {isLoading && (
          <p className="text-center text-gray-500 py-20">
            Loading candidates...
          </p>
        )}

        {isError && (
          <p className="text-center text-red-500 py-20">
            {error?.data?.message || "Failed to load candidates"}
          </p>
        )}

        {!isLoading && !isError && candidates.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            No candidates found.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {candidates.map((c) => {
            const pct = alignment(c._id);
            const positions = c.positions || [];

            return (
              <article
                key={c._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden"
              >
                <div className="p-5 pb-4">
                  <div className="flex gap-3.5">
                    <div className="w-[52px] h-[52px] rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {c.photo ? (
                        <img
                          src={c.photo}
                          alt={c.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-gray-400">
                          {(c.name || "?").charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <Link to={`/candidates/${c._id}`}>
                        <h3 className="font-semibold text-[15.5px] text-gray-900 leading-tight hover:text-vd-green">
                          {c.name}
                        </h3>
                      </Link>
                      <p className="text-[13px] text-gray-500 mt-0.5">
                        {officeLine(c)}
                      </p>
                      {locationLine(c) && (
                        <p className="text-[12px] text-gray-400 mt-0.5">
                          {locationLine(c)}
                        </p>
                      )}
                      {c.party && (
                        <span
                          className={`inline-block mt-2 px-2.5 py-[3px] text-[11px] font-medium rounded-full border ${partyBadge(
                            c.party,
                          )}`}
                        >
                          {c.party}
                        </span>
                      )}
                    </div>
                  </div>

                  {positions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {positions.slice(0, 4).map((pos) => (
                        <span
                          key={pos}
                          className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100"
                        >
                          {pos}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-5 pb-5 pt-1">
                  <div className="flex items-center justify-between text-[13px] mb-1.5">
                    <span className="text-gray-500">
                      Aligns with your views
                    </span>
                    <span className="font-semibold text-vd-green">{pct}%</span>
                  </div>
                  <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-vd-green rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
