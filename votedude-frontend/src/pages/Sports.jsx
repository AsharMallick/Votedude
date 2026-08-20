import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetSportsQuery,
  useGetLeaguesQuery,
  useGetTeamsByLeagueQuery,
  useGetStandingsQuery,
  useGetScheduleQuery,
  useRegisterTeamMutation,
  useJoinTeamMutation,
} from "../redux/services/sportApi";

export default function Sports() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data: sportsData, isLoading: sportsLoading } = useGetSportsQuery();
  const { data: leaguesData, isLoading: leaguesLoading } = useGetLeaguesQuery();

  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [leagueTab, setLeagueTab] = useState("teams"); // teams | standings | schedule
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamEmail, setTeamEmail] = useState("");
  const [teamCity, setTeamCity] = useState("");

  const { data: teamsData, isLoading: teamsLoading } = useGetTeamsByLeagueQuery(
    selectedLeague,
    { skip: !selectedLeague },
  );
  const { data: standingsData, isLoading: standingsLoading } =
    useGetStandingsQuery(selectedLeague, {
      skip: !selectedLeague || leagueTab !== "standings",
    });
  const { data: scheduleData, isLoading: scheduleLoading } =
    useGetScheduleQuery(selectedLeague, {
      skip: !selectedLeague || leagueTab !== "schedule",
    });

  const [registerTeam, { isLoading: registering }] = useRegisterTeamMutation();
  const [joinTeam, { isLoading: joining }] = useJoinTeamMutation();

  const sports = sportsData?.sports || [];
  const allLeagues = leaguesData?.leagues || [];
  const teams = teamsData?.teams || [];
  const standings = standingsData?.standings || [];
  const matches = scheduleData?.matches || [];

  const leagues = useMemo(() => {
    if (!selectedSport) return allLeagues;
    return allLeagues.filter(
      (l) => String(l.sport?._id || l.sport) === String(selectedSport),
    );
  }, [allLeagues, selectedSport]);

  const selectedLeagueObj = allLeagues.find(
    (l) => String(l._id) === String(selectedLeague),
  );

  const userTeamId = useMemo(() => {
    if (!user) return null;
    const t = teams.find((team) =>
      (team.players || []).some((p) => String(p._id || p) === String(user._id)),
    );
    return t?._id || null;
  }, [teams, user]);

  const handleSelectSport = (sportId) => {
    setSelectedSport((prev) =>
      String(prev) === String(sportId) ? null : sportId,
    );
    setSelectedLeague(null);
    setShowTeamForm(false);
    setLeagueTab("teams");
  };

  const handleSelectLeague = (leagueId) => {
    setSelectedLeague(leagueId);
    setShowTeamForm(false);
    setLeagueTab("teams");
  };

  const handleRegisterTeam = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/auth", { state: { login: true } });
      return;
    }
    if (!selectedLeague || !teamName.trim()) return;

    try {
      await registerTeam({
        name: teamName.trim(),
        league: selectedLeague,
        email: teamEmail.trim(),
        cityOrZip: teamCity.trim(),
      }).unwrap();
      setTeamName("");
      setTeamEmail("");
      setTeamCity("");
      setShowTeamForm(false);
    } catch (err) {
      alert(err?.data?.message || "Could not register team");
    }
  };

  const handleJoin = async (teamId) => {
    if (!user) {
      navigate("/auth", { state: { login: true } });
      return;
    }
    try {
      await joinTeam(teamId).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Could not join team");
    }
  };

  return (
    <div>
      <div className="bg-[#e1e1e1] border border-[#00000031]">
        <section className="w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <p className="text-[13px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
            Sports
          </p>
          <h1 className="text-[2.4rem] sm:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight mb-4">
            Compete together. Vote together.
          </h1>
          <p className="text-[15.5px] text-gray-600 max-w-xl">
            Join local leagues, build a team, and show up on and off the field.
          </p>
        </section>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Sports */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Sports{" "}
            {selectedSport && (
              <button
                type="button"
                onClick={() => handleSelectSport(selectedSport)}
                className="ml-2 text-[13px] font-medium text-vd-green"
              >
                Clear filter
              </button>
            )}
          </h2>
          {sportsLoading && (
            <p className="text-gray-500 text-sm">Loading sports...</p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {sports.map((s) => {
              const active = String(selectedSport) === String(s._id);
              return (
                <button
                  key={s._id}
                  type="button"
                  onClick={() => handleSelectSport(s._id)}
                  className={`bg-white border rounded-xl p-4 text-center transition-shadow hover:shadow-sm ${
                    active
                      ? "border-vd-green ring-1 ring-vd-green"
                      : "border-[#00000031]"
                  }`}
                >
                  <div className="text-3xl mb-2">{s.icon || "🏅"}</div>
                  <div className="font-semibold text-gray-900 text-[14px]">
                    {s.name}
                  </div>
                  {s.description && (
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                      {s.description}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Leagues */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Leagues
            {selectedSport && selectedLeagueObj === undefined && (
              <span className="text-[13px] font-normal text-gray-500 ml-2">
                (filtered)
              </span>
            )}
          </h2>
          {leaguesLoading && (
            <p className="text-gray-500 text-sm">Loading leagues...</p>
          )}
          {leagues.length === 0 && !leaguesLoading && (
            <p className="text-gray-500 text-sm">
              No leagues yet
              {selectedSport ? " for this sport." : "."}
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {leagues.map((l) => (
              <button
                key={l._id}
                type="button"
                onClick={() => handleSelectLeague(l._id)}
                className={`text-left bg-white border rounded-xl p-4 transition-shadow hover:shadow-sm ${
                  selectedLeague === l._id
                    ? "border-vd-green ring-1 ring-vd-green"
                    : "border-[#00000031]"
                }`}
              >
                <div className="font-semibold text-gray-900">
                  {l.sport?.name || "League"} · {l.city}
                </div>
                <div className="text-[13px] text-gray-500 mt-1">
                  Season: {l.season}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* League detail */}
        {selectedLeague && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {selectedLeagueObj
                    ? `${selectedLeagueObj.sport?.name || "League"} · ${selectedLeagueObj.city}`
                    : "League"}
                </h2>
                {selectedLeagueObj?.season && (
                  <p className="text-[13px] text-gray-500">
                    {selectedLeagueObj.season}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!user) {
                    navigate("/auth", { state: { login: true } });
                    return;
                  }
                  setLeagueTab("teams");
                  setShowTeamForm((v) => !v);
                }}
                className="h-10 px-4 bg-black hover:bg-black/80 text-white text-[13px] font-medium rounded-md self-start"
              >
                + Register team
              </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                ["teams", "Teams"],
                ["standings", "Standings"],
                ["schedule", "Schedule"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setLeagueTab(id);
                    setShowTeamForm(false);
                  }}
                  className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors ${
                    leagueTab === id
                      ? "bg-vd-green text-white border-vd-green"
                      : "bg-white text-gray-700 border-gray-200 hover:border-vd-green"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Register form */}
            {leagueTab === "teams" && showTeamForm && (
              <form
                onSubmit={handleRegisterTeam}
                className="bg-white border border-[#00000031] rounded-2xl p-6 space-y-3 mb-5 max-w-xl"
              >
                <h3 className="font-semibold text-gray-900">Create a team</h3>
                <p className="text-[13px] text-gray-500">
                  You become the captain. You can only be on one team.
                </p>
                <input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Team name"
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30"
                  required
                />
                <input
                  value={teamEmail}
                  onChange={(e) => setTeamEmail(e.target.value)}
                  placeholder="Contact email (optional)"
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30"
                />
                <input
                  value={teamCity}
                  onChange={(e) => setTeamCity(e.target.value)}
                  placeholder="City or ZIP (optional)"
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30"
                />
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowTeamForm(false)}
                    className="h-10 px-4 text-[14px] text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={registering}
                    className="h-10 px-5 bg-vd-green hover:bg-vd-green-dark text-white text-[14px] font-medium rounded-md"
                  >
                    {registering ? "Saving..." : "Create team"}
                  </button>
                </div>
              </form>
            )}

            {/* Teams tab */}
            {leagueTab === "teams" && (
              <div className="space-y-2">
                {teamsLoading && (
                  <p className="text-sm text-gray-500">Loading teams...</p>
                )}
                {!teamsLoading && teams.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No teams in this league yet. Be the first to register.
                  </p>
                )}
                {teams.map((t) => {
                  const isMember = String(userTeamId) === String(t._id);
                  const alreadyElsewhere =
                    userTeamId && String(userTeamId) !== String(t._id);

                  return (
                    <div
                      key={t._id}
                      className="bg-white border border-[#00000031] rounded-xl px-4 py-3 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-semibold text-gray-900">
                          {t.name}
                        </div>
                        <div className="text-[12px] text-gray-500">
                          {t.players?.length || 0} player
                          {(t.players?.length || 0) === 1 ? "" : "s"}
                          {t.captain?.name
                            ? ` · Captain: ${t.captain.name}`
                            : ""}
                        </div>
                      </div>
                      {isMember ? (
                        <span className="h-9 px-4 text-[13px] font-medium rounded-md bg-gray-100 text-gray-600 inline-flex items-center">
                          Your team
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={joining || alreadyElsewhere}
                          onClick={() => handleJoin(t._id)}
                          className="h-9 px-4 bg-vd-green hover:bg-vd-green-dark disabled:opacity-50 text-white text-[13px] font-medium rounded-md"
                        >
                          {alreadyElsewhere ? "Already on a team" : "Join"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Standings tab */}
            {leagueTab === "standings" && (
              <div className="bg-white border border-[#00000031] rounded-xl overflow-hidden">
                {standingsLoading && (
                  <p className="text-sm text-gray-500 p-4">
                    Loading standings...
                  </p>
                )}
                {!standingsLoading && standings.length === 0 && (
                  <p className="text-sm text-gray-500 p-4">
                    No standings yet. Matches need to be played and scored.
                  </p>
                )}
                {standings.length > 0 && (
                  <table className="w-full text-left text-[13px]">
                    <thead className="bg-gray-50 text-gray-500">
                      <tr>
                        <th className="px-4 py-3 font-medium">#</th>
                        <th className="px-4 py-3 font-medium">Team</th>
                        <th className="px-4 py-3 font-medium text-center">W</th>
                        <th className="px-4 py-3 font-medium text-center">L</th>
                        <th className="px-4 py-3 font-medium text-center">T</th>
                        <th className="px-4 py-3 font-medium text-center">
                          GP
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((row, i) => (
                        <tr
                          key={row.teamId || row.team}
                          className="border-t border-gray-100"
                        >
                          <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                          <td className="px-4 py-3 font-semibold text-gray-900">
                            {row.team}
                          </td>
                          <td className="px-4 py-3 text-center">{row.wins}</td>
                          <td className="px-4 py-3 text-center">
                            {row.losses}
                          </td>
                          <td className="px-4 py-3 text-center">{row.ties}</td>
                          <td className="px-4 py-3 text-center">
                            {row.gamesPlayed}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Schedule tab */}
            {leagueTab === "schedule" && (
              <div className="space-y-2">
                {scheduleLoading && (
                  <p className="text-sm text-gray-500">Loading schedule...</p>
                )}
                {!scheduleLoading && matches.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No matches scheduled yet.
                  </p>
                )}
                {matches.map((m) => (
                  <div
                    key={m._id}
                    className="bg-white border border-[#00000031] rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="font-semibold text-gray-900">
                      {m.teamA?.name || "TBD"} vs {m.teamB?.name || "TBD"}
                    </div>
                    <div className="text-[13px] text-gray-500">
                      {m.date ? new Date(m.date).toLocaleString() : "Date TBD"}
                      {m.played && m.scoreA != null && m.scoreB != null
                        ? ` · ${m.scoreA}–${m.scoreB}`
                        : " · Upcoming"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
