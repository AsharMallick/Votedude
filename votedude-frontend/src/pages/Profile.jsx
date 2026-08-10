import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useGetMeQuery, useGetProfileQuery } from "../redux/services/authApi";

export default function Profile() {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);

  const {
    data: meData,
    isLoading: meLoading,
    isFetching: meFetching,
    isError: meError,
  } = useGetMeQuery();

  const userId = authUser?._id || meData?.user?._id;

  const {
    data,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetProfileQuery(userId, {
    skip: !userId,
  });

  // Only redirect after /me has finished and there is still no user
  useEffect(() => {
    if (meLoading || meFetching) return;
    if (!authUser && !meData?.user) {
      navigate("/auth", { state: { login: true } });
    }
  }, [authUser, meData, meLoading, meFetching, navigate]);

  const user = data?.user || authUser || meData?.user;
  const activity = data?.activity || {};

  if (meLoading || meFetching || (userId && profileLoading) || !user) {
    return (
      <p className="text-center py-20 text-gray-500">Loading profile...</p>
    );
  }

  if (meError || profileError) {
    return (
      <p className="text-center py-20 text-red-500">Failed to load profile.</p>
    );
  }

  return (
    <div>
      <div className="bg-[#e1e1e1] border border-[#00000031]">
        <section className="w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <p className="text-[13px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
            My Profile
          </p>
          <h1 className="text-[2.4rem] sm:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight">
            {user.name}
          </h1>
        </section>
      </div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="bg-white border border-[#00000031] rounded-2xl p-6 flex gap-5 items-start">
          <div className="w-20 h-20 rounded-2xl bg-[#e8f5ef] flex items-center justify-center text-2xl font-bold text-vd-green overflow-hidden flex-shrink-0">
            {user.photo ? (
              <img
                src={user.photo}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              (user.name || "?").charAt(0).toUpperCase()
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-[14px] text-gray-500 mt-0.5">{user.email}</p>
            {user.city && (
              <p className="text-[14px] text-gray-500 mt-0.5">{user.city}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2.5 py-1 text-[12px] font-medium bg-[#e8f5ef] text-vd-green rounded-full">
                {user.points || 0} points
              </span>
              {(user.badges || []).map((b) => (
                <span
                  key={b}
                  className="px-2.5 py-1 text-[12px] font-medium bg-gray-100 text-gray-700 rounded-full"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            ["Teams joined", activity.teamsJoined],
            ["Events attended", activity.eventsAttended],
            ["Posts", activity.postsCount],
            ["Polls voted", activity.pollsVoted],
            ["Petitions signed", activity.petitionsSigned],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-white border border-[#00000031] rounded-xl p-4 text-center"
            >
              <div className="text-xl font-bold text-gray-900">
                {value ?? 0}
              </div>
              <div className="text-[12px] text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Link
            to="/leaderboard"
            className="h-10 px-5 bg-vd-green hover:bg-vd-green-dark text-white text-[14px] font-medium rounded-md inline-flex items-center"
          >
            View leaderboard
          </Link>
        </div>
      </section>
    </div>
  );
}
