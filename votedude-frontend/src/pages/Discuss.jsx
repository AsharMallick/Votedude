import React from "react";

const discussions = [
  {
    votes: 892,
    title: "What would real term limits actually change?",
    author: "Ray M.",
    category: "Reform",
    replies: 214,
    hot: true,
  },
];

const Discuss = () => {
  return (
    <div>
      <div className="bg-[#e1e1e1] border-[#00000031] border">
        <section className="flex  flex-col justify-start w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <div>
            <div>
              <p className="text-[13px] font-medium text-vd-green tracking-wide uppercase mb-3">
                Recommended Discussions
              </p>
              <h1 className="text-[2.4rem] sm:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight mb-4">
                Real conversations. Real people.
              </h1>
              <div className="flex justify-between items-center">
                <p className="text-[15.5px] text-gray-600 leading-relaxed w-1/2">
                  Debate the issues with fellow citizens — civil, moderated, and
                  built for genuine dialogue.
                </p>
                <button className="self-start sm:self-auto h-[44px] px-5 bg-vd-green hover:bg-vd-green-dark text-white text-[14px] font-medium rounded-md transition-colors shadow-sm whitespace-nowrap flex items-center gap-1.5">
                  <span className="text-lg leading-none">+</span>
                  Start a Discussion
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Discussion List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="space-y-3">
          {discussions.map((d, i) => (
            <article
              key={i}
              className="bg-white border border-[#00000031] rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-sm transition-shadow"
            >
              {/* Votes */}
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-[20px] font-bold text-vd-green leading-none">
                  {d.votes}
                </div>
                <div className="text-[11px] text-gray-400 font-medium tracking-wide mt-0.5">
                  VOTES
                </div>
              </div>

              {/* Divider (desktop) */}
              <div className="hidden sm:block w-px h-10 bg-gray-100" />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[15.5px] text-gray-900 leading-snug">
                    {d.title}
                  </h3>
                  {d.hot && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-orange-50 text-orange-600 rounded-full border border-orange-100">
                      🔥 HOT
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-gray-500">
                  Started by {d.author} ·{" "}
                  <span className="text-vd-green font-medium">
                    {d.category}
                  </span>
                </p>
              </div>

              {/* Replies + Join */}
              <div className="flex items-center gap-4 sm:gap-5 flex-shrink-0">
                <div className="text-right flex items-center flex-col">
                  <div className="text-[15px] font-semibold text-gray-800">
                    {d.replies}
                  </div>
                  <div className="text-[11px] text-gray-400">replies</div>
                </div>
                <button className="h-9 px-4 text-[13px] font-medium text-vd-green-dark border border-vd-green-dark rounded-md hover:bg-vd-green hover:text-white transition-colors">
                  Join
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Discuss;
