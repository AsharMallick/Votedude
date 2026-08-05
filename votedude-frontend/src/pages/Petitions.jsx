import React from "react";

const petitions = [
  {
    category: "ECONOMY",
    title: "Protect the American Dream: Lower Taxes for Working Families",
    signed: 18732,
    goal: 25000,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop",
  },
  {
    category: "VETERANS",
    title: "Fully Fund Veteran Mental Health Programs",
    signed: 22140,
    goal: 25000,
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=300&fit=crop",
  },
  {
    category: "REFORM",
    title: "Term Limits for Congress",
    signed: 41890,
    goal: 50000,
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=300&fit=crop",
  },
  {
    category: "SECURITY",
    title: "Secure the Border, Support Legal Immigration",
    signed: 15320,
    goal: 30000,
    image:
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&h=300&fit=crop",
  },
  {
    category: "ECONOMY",
    title: "Cut Wasteful Federal Spending",
    signed: 9870,
    goal: 20000,
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&h=300&fit=crop",
  },
  {
    category: "RIGHTS",
    title: "Protect 2nd Amendment Rights",
    signed: 33450,
    goal: 40000,
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=300&fit=crop",
  },
];

const Petitions = () => {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#e1e1e1] border border-[#00000031]">
        <section className="flex flex-col justify-start w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <div>
            <p className="text-[13px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
              Featured Petitions
            </p>
            <h1 className="text-[2.4rem] sm:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight mb-4">
              Put your name behind it.
            </h1>
            <div className="flex justify-between items-center gap-6">
              <p className="text-[15.5px] text-gray-600 leading-relaxed w-1/2">
                Petitions turn frustration into pressure. Sign the ones that
                matter — or start your own.
              </p>
              <button className="h-[44px] px-5 bg-black hover:bg-black/80 text-white text-[14px] font-medium rounded-md transition-colors shadow-sm whitespace-nowrap flex items-center gap-1.5">
                <span className="text-lg leading-none">+</span>
                Start a Petition
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Petitions Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {petitions.map((p, i) => {
            const percent = Math.min(
              Math.round((p.signed / p.goal) * 100),
              100,
            );

            return (
              <article
                key={i}
                className="bg-white border border-[#00000031] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image header */}
                <div className="relative h-32">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25" />

                  {/* Category pill */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white text-vd-green-dark text-[11px] font-extrabold tracking-wide uppercase px-3 py-1 rounded-full">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-[16px] text-gray-900 leading-snug mb-4">
                    {p.title}
                  </h3>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-vd-green rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Count + Sign button */}
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-gray-500">
                      {p.signed.toLocaleString()} of {p.goal.toLocaleString()}
                    </span>
                    <button className="h-9 px-5 bg-vd-green hover:bg-vd-green-dark text-white text-[13px] font-medium rounded-md transition-colors">
                      Sign
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Petitions;
