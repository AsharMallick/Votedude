import React from "react";

const bills = [
  {
    number: "H.R. 4821",
    chamber: "House",
    title: "Federal Spending Reduction Act",
    status: "In Committee",
    summary:
      "Caps discretionary spending and requires a balanced-budget pathway over 7 years.",
    updated: "Updated May 20, 2026",
    support: 64,
  },
  {
    number: "S. 1190",
    chamber: "Senate",
    title: "Border Infrastructure & Security Act",
    status: "Floor Vote",
    summary:
      "Funds physical and technological border infrastructure with oversight provisions.",
    updated: "Updated May 18, 2026",
    support: 58,
  },
  {
    number: "H.R. 3302",
    chamber: "House",
    title: "Veterans Mental Health Expansion",
    status: "Passed House",
    summary:
      "Expands access to mental-health services and reduces VA wait times.",
    updated: "Updated May 15, 2026",
    support: 81,
  },
  {
    number: "S. 774",
    chamber: "Senate",
    title: "Small Business Tax Relief Act",
    status: "Introduced",
    summary:
      "Lowers the tax burden on businesses with fewer than 50 employees.",
    updated: "Updated May 12, 2026",
    support: 72,
  },
  {
    number: "H.R. 2015",
    chamber: "House",
    title: "Energy Independence Act",
    status: "In Committee",
    summary:
      "Streamlines permits for domestic energy production and grid upgrades.",
    updated: "Updated May 09, 2026",
    support: 61,
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "In Committee":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Floor Vote":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Passed House":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Introduced":
      return "bg-gray-100 text-gray-600 border-gray-200";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
};

const Law = () => {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#e1e1e1] border border-[#00000031]">
        <section className="flex flex-col justify-start w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <div>
            <p className="text-[13px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
              Legislation Tracker
            </p>
            <h1 className="text-[2.4rem] sm:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight mb-4">
              Track the laws that affect you.
            </h1>
            <p className="text-[15.5px] text-gray-600 leading-relaxed w-1/2">
              Follow bills from introduction to law — plain-language summaries,
              status, and where members stand.
            </p>
          </div>
        </section>
      </div>

      {/* Bills List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="space-y-3">
          {bills.map((bill, i) => (
            <article
              key={i}
              className="bg-white border border-[#00000031] rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-sm transition-shadow"
            >
              {/* Bill number + chamber */}
              <div className="flex-shrink-0 w-24 text-center sm:text-left">
                <div className="text-[15px] font-bold text-gray-900 leading-tight">
                  {bill.number}
                </div>
                <div className="text-[12px] text-gray-500 mt-0.5">
                  {bill.chamber}
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-12 bg-gray-100" />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[15.5px] text-gray-900 leading-snug">
                    {bill.title}
                  </h3>
                  <span
                    className={`inline-flex px-2.5 py-0.5 text-[11px] font-extrabold rounded-full border ${getStatusStyle(
                      bill.status,
                    )}`}
                  >
                    {bill.status}
                  </span>
                </div>
                <p className="text-[13.5px] text-gray-500 leading-relaxed">
                  {bill.summary}
                </p>
                <p className="text-[12px] text-gray-400 mt-1">{bill.updated}</p>
              </div>

              {/* Support + Discuss */}
              <div className="flex-col flex items-center gap-2 justify-center flex-shrink-0">
                <div className="text-center flex flex-col  items-center justify-center">
                  <div className="text-[18px] font-bold text-vd-green leading-none">
                    {bill.support}%
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    member support
                  </div>
                </div>
                <button className="h-9 px-4 text-[13px] font-medium text-vd-green-dark border border-vd-green-dark rounded-md hover:bg-vd-green hover:text-white transition-colors">
                  Discuss
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Law;
