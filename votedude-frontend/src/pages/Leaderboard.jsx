import { useEffect, useState } from "react";
import { api } from "../redux/services/api";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboard: builder.mutation({
      query: (body = {}) => ({
        url: "/leaderboard",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

const { useGetLeaderboardMutation } = extendedApi;

export default function Leaderboard() {
  const [getLeaderboard, { data, isLoading, isError }] =
    useGetLeaderboardMutation();
  const [city, setCity] = useState("");

  useEffect(() => {
    getLeaderboard({});
  }, [getLeaderboard]);

  const leaders = data?.leaders || [];

  const handleFilter = (e) => {
    e.preventDefault();
    getLeaderboard(city.trim() ? { city: city.trim() } : {});
  };

  return (
    <div>
      <div className="bg-[#e1e1e1] border border-[#00000031]">
        <section className="w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <p className="text-[13px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
            Community
          </p>
          <h1 className="text-[2.4rem] sm:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight mb-4">
            Leaderboard
          </h1>
          <form onSubmit={handleFilter} className="flex gap-3 max-w-md">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Filter by city (optional)"
              className="flex-1 h-11 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30"
            />
            <button
              type="submit"
              className="h-11 px-5 bg-vd-green hover:bg-vd-green-dark text-white text-[14px] font-medium rounded-md"
            >
              Filter
            </button>
          </form>
        </section>
      </div>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {isLoading && (
          <p className="text-center text-gray-500 py-16">Loading...</p>
        )}
        {isError && (
          <p className="text-center text-red-500 py-16">Failed to load.</p>
        )}
        <div className="space-y-2">
          {leaders.map((u, i) => (
            <div
              key={u._id}
              className="bg-white border border-[#00000031] rounded-xl px-4 py-3 flex items-center gap-4"
            >
              <div className="w-8 text-center font-bold text-gray-400">
                {i + 1}
              </div>
              <div className="w-10 h-10 rounded-full bg-[#e8f5ef] flex items-center justify-center font-bold text-vd-green overflow-hidden">
                {u.photo ? (
                  <img
                    src={u.photo}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  (u.name || "?").charAt(0)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900">{u.name}</div>
              </div>
              <div className="font-bold text-vd-green">{u.points || 0} pts</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
