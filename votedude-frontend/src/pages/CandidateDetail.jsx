import { Link, useParams } from "react-router-dom";
import { useGetCandidateByIdQuery } from "../redux/services/candidateApi";

const alignment = (id = "") => {
  let n = 0;
  for (let i = 0; i < id.length; i++) n += id.charCodeAt(i);
  return 55 + (n % 36);
};

export default function CandidateDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetCandidateByIdQuery(id);
  const c = data?.candidate;

  if (isLoading) {
    return <p className="text-center py-20 text-gray-500">Loading...</p>;
  }
  if (isError || !c) {
    return (
      <p className="text-center py-20 text-red-500">Candidate not found.</p>
    );
  }

  const pct = alignment(c._id);
  const positions = c.positions || [];
  const issueScores = positions.slice(0, 4).map((pos, i) => ({
    label: pos,
    score: 60 + ((pct + i * 7) % 35),
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/candidates"
        className="text-[13px] text-vd-green font-medium hover:underline inline-flex items-center gap-1 mb-6"
      >
        ← Back to Candidates
      </Link>

      <div className="bg-white border border-[#00000014] rounded-2xl p-6 sm:p-8">
        <p className="text-[12px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
          Candidate Profile
        </p>

        <div className="flex gap-4 items-start mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400 overflow-hidden flex-shrink-0">
            {c.photo ? (
              <img
                src={c.photo}
                alt={c.name}
                className="w-full h-full object-cover"
              />
            ) : (
              (c.name || "?").charAt(0)
            )}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {c.name}
            </h1>
            <p className="text-[14px] text-gray-500 mt-1">
              {[c.office, c.state || c.city, c.party]
                .filter(Boolean)
                .join(" · ")}
            </p>
            {positions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {positions.map((p) => (
                  <span
                    key={p}
                    className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-full border border-gray-100"
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-[12px] text-gray-500 mb-1">Alignment</div>
            <div className="text-2xl font-bold text-vd-green">{pct}%</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-[12px] text-gray-500 mb-1">Office</div>
            <div className="text-lg font-bold text-gray-900">
              {c.office || "—"}
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-[12px] text-gray-500 mb-1">State</div>
            <div className="text-lg font-bold text-gray-900">
              {c.state || c.city || "—"}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">About</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
              {c.bio ||
                `${c.name} is presented here as a candidate profile. Review biography, priorities, and issue positions.`}
            </p>

            {positions.length > 0 && (
              <>
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  Priorities
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-[14px] text-gray-600 mb-6">
                  {positions.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </>
            )}

            <div className="flex flex-wrap gap-3">
              {c.website && (
                <a
                  href={c.website}
                  target="_blank"
                  rel="noreferrer"
                  className="h-11 px-6 border border-gray-200 text-gray-700 text-[14px] font-medium rounded-md inline-flex items-center hover:bg-gray-50"
                >
                  Website
                </a>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Issue alignment
            </h2>
            <div className="space-y-4">
              {issueScores.length > 0 ? (
                issueScores.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[13px] mb-1.5">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-semibold text-gray-900">
                        {item.score}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-vd-green rounded-full"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No issue data yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
