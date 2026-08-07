import { useGetNewsQuery } from "../redux/services/newsApi";

export default function News() {
  const { data, isLoading, isError, error } = useGetNewsQuery();
  const articles = data?.news || [];

  const featured = articles[0];
  const rest = articles.slice(1);

  if (isLoading) {
    return <p className="text-center text-gray-500 py-32">Loading news...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-32">
        {error?.data?.message || "Failed to load news"}
      </p>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-[#e1e1e1] border border-[#00000031]">
        <section className="flex flex-col justify-start w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <div>
            <p className="text-[13px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
              Latest News
            </p>
            <h1 className="text-[2.4rem] sm:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight mb-4">
              Straight facts. No spin.
            </h1>
            <p className="text-[15.5px] text-gray-600 leading-relaxed w-1/2">
              Nonpartisan reporting on the votes, bills, and decisions that
              shape your day-to-day.
            </p>
          </div>
        </section>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {articles.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            No news yet. Check back soon.
          </p>
        )}

        {featured && (
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            {/* Featured card */}
            <article className="bg-white border border-[#00000031] rounded-2xl overflow-hidden flex flex-col">
              <div className="h-56 bg-gray-100">
                {featured.image ? (
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
                    📰
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[12px] mb-2">
                  <span className="font-extrabold text-vd-green uppercase tracking-wide">
                    {featured.category}
                  </span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500">
                    {featured.createdAt
                      ? new Date(featured.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
                  {featured.title}
                </h2>
                <p className="text-[14px] text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                  {featured.content}
                </p>
                <button className="self-start text-[13px] font-medium text-vd-green hover:text-vd-green-dark transition-colors">
                  Read full story →
                </button>
              </div>
            </article>

            {/* Side list */}
            <div className="flex flex-col gap-4">
              {rest.map((item) => (
                <article
                  key={item._id}
                  className="bg-white border border-[#00000031] rounded-xl p-4 flex gap-4 hover:shadow-sm transition-shadow"
                >
                  <div className="w-24 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
                        📰
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex flex-col flex-1">
                    <div className="text-[11px] font-extrabold text-vd-green uppercase tracking-wide mb-1">
                      {item.category}
                    </div>
                    <h3 className="font-semibold text-[15px] text-gray-900 leading-snug line-clamp-2 mb-1">
                      {item.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <span className="text-[12px] text-gray-400">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                      <button className="text-[12px] font-medium text-vd-green hover:text-vd-green-dark whitespace-nowrap">
                        Read more →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
