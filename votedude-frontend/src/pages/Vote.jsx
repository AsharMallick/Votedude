import React from "react";

const Vote = () => {
  return (
    <div>
      {/* Dark Hero Section */}
      <section className="bg-[#121614] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
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

          {/* Right form card */}
          <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold mb-1">Check your registration</h2>
            <p className="text-sm text-gray-500 mb-6">
              Confirm you're ready to vote in the next election.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                className="w-full h-12 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30 focus:border-vd-green"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="ZIP code"
                  className="w-full h-12 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30 focus:border-vd-green"
                />
                <input
                  type="text"
                  placeholder="Date of birth"
                  className="w-full h-12 px-4 rounded-lg border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-vd-green/30 focus:border-vd-green"
                />
              </div>
              <button className="w-full h-12 bg-vd-green hover:bg-vd-green-dark text-white font-medium rounded-lg transition-colors">
                Check My Status
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              Secure & nonpartisan. We never share your data.
            </p>
          </div>
        </div>
      </section>

      {/* Three steps */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
            Three steps to the ballot box
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                num: "1",
                title: "Register",
                desc: "Confirm your registration or sign up in minutes with your state.",
              },
              {
                num: "2",
                title: "Get Informed",
                desc: "Review candidates, ballot measures, and where they stand before you go.",
              },
              {
                num: "3",
                title: "Cast Your Ballot",
                desc: "Find your polling place or request a mail-in ballot and vote.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white border border-[#00000031] rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-[#121614] text-white flex items-center justify-center font-bold text-lg mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-[17px] text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming deadlines */}
      <section className="bg-[#e1e1e1]  border-[#8f8f8f31] border-t py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Upcoming deadlines
          </h2>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: "Voter Registration", date: "October 7, 2026" },
              { title: "Mail-In Ballot Request", date: "October 25, 2026" },
              { title: "Election Day", date: "November 3, 2026" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[#00000031] rounded-xl p-5 flex items-start gap-3"
              >
                <div className="w-1 h-10 bg-vd-green rounded-full mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5">
                    {item.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vote;
