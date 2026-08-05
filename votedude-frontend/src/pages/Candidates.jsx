import React from "react";

const Candidates = () => {
  return (
    <>
      <div className="bg-[#e1e1e1]  border-[#00000031] border">
        <section className="flex justify-start w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-[13px] font-medium text-[#5e9c82] tracking-wide uppercase mb-3">
              Find Candidates
            </p>
            <h1 className="text-[2.5rem] font-extrabold sm:text-[2.75rem]  tracking-tight text-gray-900 leading-tight mb-4">
              Know who you're voting for.
            </h1>
            <p className="text-[17px] text-gray-600 max-w-xl mb-8 leading-relaxed">
              Search candidates, compare their positions, and see how they align
              <br className="hidden sm:block" />
              with what matters to you — no spin.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch gap-3 max-w-[520px]">
              <div className="relative flex-1">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, office, or ZIP"
                  className="w-full h-[46px] pl-11 pr-4 rounded-full border border-gray-200 bg-white text-[15px] placeholder:text-gray-400 focus:outline-none shadow-sm"
                />
              </div>
              <button className="h-[46px] px-7 bg-vd-green hover:bg-vd-green-dark transition text-white text-[15px] font-medium rounded-full shadow-sm whitespace-nowrap">
                Search
              </button>
            </div>
          </div>
        </section>
      </div>
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <article className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-5 pb-4">
              <div className="flex gap-3.5">
                <div className="w-[52px] h-[52px] rounded-xl avatar-placeholder flex-shrink-0"></div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-semibold text-[15.5px] text-gray-900 leading-tight">
                    Marcus Halloway
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    U.S. Senate · Texas
                  </p>
                  <span className="inline-block mt-2 px-2.5 py-[3px] text-[11px] font-medium bg-brand-50 text-brand-700 rounded-full border border-brand-100">
                    Independent
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Fiscal reform
                </span>
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Veterans
                </span>
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Energy
                </span>
              </div>
            </div>

            <div className="px-5 pb-5 pt-1">
              <div className="flex items-center justify-between text-[13px] mb-1.5">
                <span className="text-gray-500">Aligns with your views</span>
                <span className="font-semibold text-brand-600">82%</span>
              </div>
              <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full"
                  style={{ width: "82%" }}
                ></div>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-5 pb-4">
              <div className="flex gap-3.5">
                <div className="w-[52px] h-[52px] rounded-xl avatar-placeholder flex-shrink-0"></div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-semibold text-[15.5px] text-gray-900 leading-tight">
                    David Chen
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    Governor · Arizona
                  </p>
                  <span className="inline-block mt-2 px-2.5 py-[3px] text-[11px] font-medium bg-red-50 text-red-700 rounded-full border border-red-100">
                    Republican
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Border
                </span>
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Small business
                </span>
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Education
                </span>
              </div>
            </div>

            <div className="px-5 pb-5 pt-1">
              <div className="flex items-center justify-between text-[13px] mb-1.5">
                <span className="text-gray-500">Aligns with your views</span>
                <span className="font-semibold text-brand-600">74%</span>
              </div>
              <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full"
                  style={{ width: "74%" }}
                ></div>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-5 pb-4">
              <div className="flex gap-3.5">
                <div className="w-[52px] h-[52px] rounded-xl avatar-placeholder flex-shrink-0"></div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-semibold text-[15.5px] text-gray-900 leading-tight">
                    James Whitfield
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    U.S. House · District 4
                  </p>
                  <span className="inline-block mt-2 px-2.5 py-[3px] text-[11px] font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                    Democrat
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Jobs
                </span>
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Healthcare
                </span>
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Infrastructure
                </span>
              </div>
            </div>

            <div className="px-5 pb-5 pt-1">
              <div className="flex items-center justify-between text-[13px] mb-1.5">
                <span className="text-gray-500">Aligns with your views</span>
                <span className="font-semibold text-brand-600">68%</span>
              </div>
              <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full"
                  style={{ width: "68%" }}
                ></div>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-5 pb-4">
              <div className="flex gap-3.5">
                <div className="w-[52px] h-[52px] rounded-xl avatar-placeholder flex-shrink-0"></div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-semibold text-[15.5px] text-gray-900 leading-tight">
                    Robert Ellis
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    State Senate · Ohio
                  </p>
                  <span className="inline-block mt-2 px-2.5 py-[3px] text-[11px] font-medium bg-brand-50 text-brand-700 rounded-full border border-brand-100">
                    Independent
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  2nd Amendment
                </span>
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Taxes
                </span>
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Manufacturing
                </span>
              </div>
            </div>

            <div className="px-5 pb-5 pt-1">
              <div className="flex items-center justify-between text-[13px] mb-1.5">
                <span className="text-gray-500">Aligns with your views</span>
                <span className="font-semibold text-brand-600">79%</span>
              </div>
              <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full"
                  style={{ width: "79%" }}
                ></div>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-5 pb-4">
              <div className="flex gap-3.5">
                <div className="w-[52px] h-[52px] rounded-xl avatar-placeholder flex-shrink-0"></div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-semibold text-[15.5px] text-gray-900 leading-tight">
                    Tony Alvarez
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    Mayor · Phoenix, AZ
                  </p>
                  <span className="inline-block mt-2 px-2.5 py-[3px] text-[11px] font-medium bg-purple-50 text-purple-700 rounded-full border border-purple-100">
                    Nonpartisan
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Public safety
                </span>
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Housing
                </span>
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Water
                </span>
              </div>
            </div>

            <div className="px-5 pb-5 pt-1">
              <div className="flex items-center justify-between text-[13px] mb-1.5">
                <span className="text-gray-500">Aligns with your views</span>
                <span className="font-semibold text-brand-600">71%</span>
              </div>
              <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full"
                  style={{ width: "71%" }}
                ></div>
              </div>
            </div>
          </article>

          <article className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="p-5 pb-4">
              <div className="flex gap-3.5">
                <div className="w-[52px] h-[52px] rounded-xl avatar-placeholder flex-shrink-0"></div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-semibold text-[15.5px] text-gray-900 leading-tight">
                    Frank DiMarco
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    U.S. House · District 12
                  </p>
                  <span className="inline-block mt-2 px-2.5 py-[3px] text-[11px] font-medium bg-red-50 text-red-700 rounded-full border border-red-100">
                    Republican
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Trade
                </span>
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Immigration
                </span>
                <span className="px-2.5 py-1 text-[12px] text-gray-600 bg-gray-50 rounded-lg border border-gray-100">
                  Defense
                </span>
              </div>
            </div>

            <div className="px-5 pb-5 pt-1">
              <div className="flex items-center justify-between text-[13px] mb-1.5">
                <span className="text-gray-500">Aligns with your views</span>
                <span className="font-semibold text-brand-600">65%</span>
              </div>
              <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Candidates;
