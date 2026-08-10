import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetPollsQuery,
  useVotePollMutation,
} from "../redux/services/pollApi";

export default function Polls() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, isError, error } = useGetPollsQuery();
  const [votePoll, { isLoading: voting }] = useVotePollMutation();

  const polls = data?.polls || [];

  const hasVoted = (poll) => {
    if (!user || !poll.votedUsers) return false;
    return poll.votedUsers.some(
      (id) =>
        String(id) === String(user._id) || String(id?._id) === String(user._id)
    );
  };

  const handleVote = async (pollId, optionIndex) => {
    if (!user) {
      navigate("/auth", { state: { login: true } });
      return;
    }
    try {
      await votePoll({ id: pollId, optionIndex }).unwrap();
    } catch (err) {
      alert(err?.data?.message || "Could not vote");
    }
  };

  const totalVotes = (poll) =>
    (poll.options || []).reduce((sum, o) => sum + (o.voteCount || 0), 0);

  return (
    <div>
      <div className="bg-[#e1e1e1] border border-[#00000031]">
        <section className="w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <p className="text-[13px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
            Community Polls
          </p>
          <h1 className="text-[2.4rem] sm:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight mb-4">
            Make your voice count.
          </h1>
          <p className="text-[15.5px] text-gray-600 w-1/2">
            Vote once per poll. Results update live.
          </p>
        </section>
      </div>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-5">
        {isLoading && (
          <p className="text-center text-gray-500 py-16">Loading polls...</p>
        )}
        {isError && (
          <p className="text-center text-red-500 py-16">
            {error?.data?.message || "Failed to load polls"}
          </p>
        )}
        {!isLoading && polls.length === 0 && (
          <p className="text-center text-gray-500 py-16">
            No polls yet. Import polls.json or create via admin/API.
          </p>
        )}

        {polls.map((poll) => {
          const voted = hasVoted(poll);
          const total = totalVotes(poll) || 1;

          return (
            <article
              key={poll._id}
              className="bg-white border border-[#00000031] rounded-2xl p-6"
            >
              <h3 className="font-semibold text-[17px] text-gray-900 mb-4">
                {poll.question}
              </h3>

              <div className="space-y-2">
                {(poll.options || []).map((opt, idx) => {
                  const pct = Math.round(((opt.voteCount || 0) / total) * 100);
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={voted || voting}
                      onClick={() => handleVote(poll._id, idx)}
                      className={`w-full text-left rounded-xl border px-4 py-3 relative overflow-hidden transition-colors ${
                        voted
                          ? "border-gray-200 cursor-default"
                          : "border-gray-200 hover:border-vd-green cursor-pointer"
                      }`}
                    >
                      {voted && (
                        <div
                          className="absolute inset-y-0 left-0 bg-[#e8f5ef]"
                          style={{ width: `${pct}%` }}
                        />
                      )}
                      <div className="relative flex items-center justify-between gap-3">
                        <span className="text-[14px] font-medium text-gray-900">
                          {opt.text}
                        </span>
                        {voted && (
                          <span className="text-[13px] text-gray-500">
                            {opt.voteCount || 0} ({pct}%)
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {voted && (
                <p className="text-[12px] text-gray-400 mt-3">
                  You already voted · {totalVotes(poll)} total votes
                </p>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}
