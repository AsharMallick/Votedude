import { useState } from "react";

export default function Vote() {
  const [fullName, setFullName] = useState("");
  const [zip, setZip] = useState("");
  const [dob, setDob] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !zip.trim() || !dob.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div>
      <section className="bg-[#121614] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[13px] font-extrabold text-vd-green tracking-wide uppercase mb-4">
              Register & Vote
            </p>
            <h1 className="text-[2.6rem] sm:text-[3.2rem] font-bold leading-tight mb-5">
              Make your voice <br />
              <span className="text-vd-green">count. Register</span> <br />
              today.
            </h1>
            <p className="text-[16px] text-white/70 leading-relaxed mb-8 max-w-md">
              Check your registration status, find your polling place, and never
              miss a deadline.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold text-vd-green">3 min</div>
                <div className="text-sm text-white/60">to register</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-vd-green">50</div>
                <div className="text-sm text-white/60">states covered</div>
              </div>
            </div>
          </div>

          <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-xl">
            {!submitted ? (
              <>
                <h2 className="text-xl font-bold mb-1">
                  Check your registration
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Confirm you&apos;re ready to vote in the next election.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full name"
                    className="w-full h-12 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30 focus:border-vd-green"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="ZIP code"
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30 focus:border-vd-green"
                    />
                    <input
                      type="text"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      placeholder="Date of birth"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = "text";
                      }}
                      className="w-full h-12 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30 focus:border-vd-green"
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <button
                    type="submit"
                    className="w-full h-12 bg-vd-green hover:bg-vd-green-dark text-white font-semibold rounded-lg transition-colors"
                  >
                    Check My Status
                  </button>
                  <p className="text-[12px] text-gray-400 text-center">
                    Secure & nonpartisan. We never share your data.
                  </p>
                </form>
              </>
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-2 text-vd-green">
                  You&apos;re on the right track.
                </h2>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Thanks, <span className="font-semibold">{fullName}</span>. We
                  can&apos;t access official state voter rolls directly from
                  this app, but you can confirm your registration on your
                  state&apos;s official site.
                </p>
                <a
                  href="https://www.vote.org/am-i-registered-to-vote/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-12 bg-vd-green hover:bg-vd-green-dark text-white font-semibold rounded-lg transition-colors inline-flex items-center justify-center mb-3"
                >
                  Check official registration →
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName("");
                    setZip("");
                    setDob("");
                  }}
                  className="w-full h-10 text-[14px] text-gray-600 hover:text-gray-900"
                >
                  Check another person
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
          Three steps to the ballot box
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              n: "1",
              t: "Register",
              d: "Confirm your registration or sign up in minutes with your state.",
            },
            {
              n: "2",
              t: "Get Informed",
              d: "Review candidates, ballot measures, and where they stand before you go.",
            },
            {
              n: "3",
              t: "Cast Your Ballot",
              d: "Find your polling place or request a mail-in ballot and vote.",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="bg-white border border-gray-100 rounded-2xl p-6"
            >
              <div className="w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center mb-4">
                {s.n}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{s.t}</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Upcoming deadlines
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              ["Voter Registration", "October 7, 2026"],
              ["Mail-In Ballot Request", "October 20, 2026"],
              ["Election Day", "November 3, 2026"],
            ].map(([label, date]) => (
              <div
                key={label}
                className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex justify-between items-center"
              >
                <span className="text-[14px] text-gray-600">{label}</span>
                <span className="text-[14px] font-semibold text-gray-900">
                  {date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
