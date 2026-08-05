import React from "react";

const featuredNews = {
  category: "ECONOMY",
  date: "May 20, 2026",
  readTime: "4 min",
  title: "House Passes Bill to Cut Federal Spending by $400B",
  description:
    "The measure advances to the Senate after a narrow vote, setting up a fall showdown over the federal budget and the programs it funds.",
  image: "https://picsum.photos/900/600?random=1",
};

const news = [
  {
    category: "SECURITY",
    date: "May 19, 2026",
    readTime: "3 min",
    title: "New Border Security Measures Announced",
    image: "https://picsum.photos/500/350?random=2",
  },
  {
    category: "VETERANS",
    date: "May 18, 2026",
    readTime: "5 min",
    title: "VA Expands Mental Health Support for Veterans",
    image: "https://picsum.photos/500/350?random=3",
  },
  {
    category: "ENERGY",
    date: "May 17, 2026",
    readTime: "3 min",
    title: "Energy Bill Clears Committee With Bipartisan Support",
    image: "https://picsum.photos/500/350?random=4",
  },
  {
    category: "ECONOMY",
    date: "May 16, 2026",
    readTime: "4 min",
    title: "Small Business Owners Rally for Tax Relief",
    image: "https://picsum.photos/500/350?random=5",
  },
  {
    category: "REFORM",
    date: "May 15, 2026",
    readTime: "6 min",
    title: "Term Limits Movement Gains Momentum in 12 States",
    image: "https://picsum.photos/500/350?random=6",
  },
];

const News = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#e1e1e1] border border-[#00000031]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="uppercase tracking-[3px] text-xs font-bold text-[#5F9F84] mb-4">
            Latest News
          </p>

          <h1 className="text-5xl font-black text-[#232323]">
            Straight facts. No spin.
          </h1>

          <p className="text-gray-500 text-lg mt-6 max-w-xl">
            Nonpartisan reporting on the votes, bills, and decisions that shape
            your day-to-day.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        {/* Featured Story */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden grid lg:grid-cols-2 mb-8">
          <img
            src={featuredNews.image}
            alt={featuredNews.title}
            className="w-full h-[420px] object-cover"
          />

          <div className="p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-xs mb-5">
              <span className="bg-green-100 text-[#5F9F84] px-3 py-1 rounded-full font-semibold uppercase">
                {featuredNews.category}
              </span>

              <span className="text-gray-400">
                {featuredNews.date} • {featuredNews.readTime}
              </span>
            </div>

            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
              {featuredNews.title}
            </h2>

            <p className="text-gray-500 mt-5 leading-7">
              {featuredNews.description}
            </p>

            <button className="text-[#5F9F84] font-semibold mt-8 text-left hover:underline">
              Read full story →
            </button>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <div className="flex gap-2 items-center text-[11px] mb-3">
                  <span className="uppercase font-bold text-[#5F9F84]">
                    {item.category}
                  </span>

                  <span className="text-gray-400">• {item.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 leading-snug mb-4">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-400">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default News;
