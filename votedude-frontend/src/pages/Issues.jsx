import React from "react";

const issues = [
  {
    icon: "📈",
    title: "Inflation & the Economy",
    description:
      "Cost of living, wages, and federal spending — where the dollars go and why prices climb.",
    following: "128K",
    status: "HOT",
  },
  {
    icon: "🛡️",
    title: "Border Security",
    description:
      "Enforcement, immigration policy, and how communities are affected on the ground.",
    following: "96K",
    status: "RISING",
  },
  {
    icon: "💵",
    title: "Taxes & Spending",
    description:
      "Tax brackets, deductions, and where your tax dollars actually go.",
    following: "112K",
    status: "HOT",
  },
  {
    icon: "⚖️",
    title: "2nd Amendment",
    description:
      "Firearm legislation, constitutional carry, and pending court decisions.",
    following: "88K",
    status: "RISING",
  },
  {
    icon: "🎖️",
    title: "Veterans Affairs",
    description:
      "Healthcare, benefits, and mental-health support for those who served.",
    following: "74K",
    status: "STEADY",
  },
  {
    icon: "⚡",
    title: "Energy & Jobs",
    description:
      "Domestic production, grid reliability, and the future of American work.",
    following: "69K",
    status: "RISING",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "HOT":
      return "bg-orange-50 text-orange-600 border-orange-100";
    case "RISING":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";
    case "STEADY":
      return "bg-gray-100 text-gray-600 border-gray-200";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
};

const Issues = () => {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#e1e1e1] border border-[#00000031]">
        <section className="flex flex-col justify-start w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <div>
            <p className="text-[13px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
              Trending Issues
            </p>
            <h1 className="text-[2.4rem] sm:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight mb-4">
              The facts on what matters.
            </h1>
            <p className="text-[15.5px] text-gray-600 leading-relaxed w-1/2">
              Nonpartisan breakdowns of the issues shaping your community, your
              state, and the country.
            </p>
          </div>
        </section>
      </div>

      {/* Issues Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {issues.map((issue, i) => (
            <article
              key={i}
              className="bg-white border border-[#00000031] rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Top row: icon + status */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#e8f5ef] flex items-center justify-center text-xl">
                  {issue.icon}
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-extrabold rounded-full border ${getStatusStyle(
                    issue.status,
                  )}`}
                >
                  ▲ {issue.status}
                </span>
              </div>

              {/* Title + description */}
              <h3 className="font-semibold text-[16px] text-gray-900 leading-snug mb-2">
                {issue.title}
              </h3>
              <p className="text-[13.5px] text-gray-500 leading-relaxed mb-5 flex-1">
                {issue.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-[13px] text-gray-500">
                  {issue.following} following
                </span>
                <button className="text-[13px] font-medium text-vd-green hover:text-vd-green-dark transition-colors">
                  Read more →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Issues;
