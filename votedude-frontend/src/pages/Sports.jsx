import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetSportsQuery,
  useGetLeaguesQuery,
  useGetTeamsByLeagueQuery,
  useRegisterTeamMutation,
  useJoinTeamMutation,
} from "../redux/services/sportApi";

export default function Sports() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data: sportsData, isLoading: sportsLoading } = useGetSportsQuery();
  const { data: leaguesData, isLoading: leaguesLoading } = useGetLeaguesQuery();

  const [selectedLeague, setSelectedLeague] = useState(null);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamEmail, setTeamEmail] = useState("");
  const [teamCity, setTeamCity] = useState("");

  const { data: teamsData } = useGetTeamsByLeagueQuery(selectedLeague, {
    skip: !selectedLeague,
  });

  const [registerTeam, { isLoading: registering }] = useRegisterTeamMutation();
  const [joinTeam, { isLoading: joining }] = useJoinTeamMutation();

  const sports = sportsData?.sports || [];
  const leagues = leaguesData?.leagues || [];
  const teams = teamsData?.teams || [];

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
          <p className="text-[15.5px] text-gray-600 w-1/2">
            Join local leagues, build a team, and show up on and off the field.
          </p>
        </section>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Sports */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Sports</h2>
          {sportsLoading && (
            <p className="text-gray-500 text-sm">Loading sports...</p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sports.map((s) => (
              <div
                key={s._id}
                className="bg-white border border-[#00000031] rounded-xl p-4 text-center"
              >
                <div className="text-3xl mb-2">{s.icon || "🏅"}</div>
                <div className="font-semibold text-gray-900">{s.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Leagues */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Leagues</h2>
          {leaguesLoading && (
            <p className="text-gray-500 text-sm">Loading leagues...</p>
          )}
          {leagues.length === 0 && !leaguesLoading && (
            <p className="text-gray-500 text-sm">
              No leagues yet. Admin can add them in the database.
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {leagues.map((l) => (
              <button
                key={l._id}
                type="button"
                onClick={() => {
                  setSelectedLeague(l._id);
                  setShowTeamForm(false);
                }}
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

        {/* Teams for selected league */}
        {selectedLeague && (
          <div>
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <h2 className="text-lg font-bold text-gray-900">Teams</h2>
              <button
                type="button"
                onClick={() => {
                  if (!user) {
                    navigate("/auth", { state: { login: true } });
                    return;
                  }
                  setShowTeamForm((v) => !v);
                }}
                className="h-10 px-4 bg-black hover:bg-black/80 text-white text-[13px] font-medium rounded-md"
              >
                + Register team
              </button>
            </div>

            {showTeamForm && (
              <form
                onSubmit={handleRegisterTeam}
                className="bg-white border border-[#00000031] rounded-2xl p-6 space-y-3 mb-5 max-w-xl"
              >
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

            <div className="space-y-2">
              {teams.length === 0 && (
                <p className="text-sm text-gray-500">
                  No teams in this league yet.
                </p>
              )}
              {teams.map((t) => (
                <div
                  key={t._id}
                  className="bg-white border border-[#00000031] rounded-xl px-4 py-3 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-[12px] text-gray-500">
                      {(t.players?.length || 0)} players
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={joining}
                    onClick={() => handleJoin(t._id)}
                    className="h-9 px-4 bg-vd-green hover:bg-vd-green-dark text-white text-[13px] font-medium rounded-md"
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
