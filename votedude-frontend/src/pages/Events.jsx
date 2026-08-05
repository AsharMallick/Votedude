import React from "react";

const events = [
  {
    title: "Town Hall Meeting",
    location: "Austin, TX",
    date: "Sat, May 25 · 6:00 PM",
    month: "MAY",
    day: "25",
    type: "TOWN HALL",
    image:
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&h=300&fit=crop",
  },
];

const Events = () => {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#e1e1e1] border border-[#00000031]">
        <section className="flex flex-col justify-start w-[80%] mx-auto pt-14 pb-16 pl-10 px-4 sm:px-6">
          <div>
            <p className="text-[13px] font-extrabold text-vd-green tracking-wide uppercase mb-3">
              Local Events
            </p>
            <h1 className="text-[2.4rem] sm:text-[2.75rem] font-bold tracking-tight text-gray-900 leading-tight mb-4">
              Show up. Make it count.
            </h1>
            <div className="flex justify-between items-center gap-6">
              <p className="text-[15.5px] text-gray-600 leading-relaxed w-1/2">
                Town halls, rallies, registration drives, and community events
                near you.
              </p>
              <button className="h-[44px] px-5 bg-black hover:bg-black/75 text-white text-[14px] font-medium rounded-md transition-colors shadow-sm whitespace-nowrap flex items-center gap-1.5">
                <span className="text-lg leading-none">+</span>
                Host an Event
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Events Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((e, i) => (
            <article
              key={i}
              className="bg-white border border-[#00000031] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image with date + type overlay */}
              <div className="relative h-36">
                <img
                  src={e.image}
                  alt={e.title}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Date badge */}
                <div className="absolute top-3 left-3 bg-white rounded-lg px-2.5 py-1.5 shadow-sm text-center min-w-[48px]">
                  <div className="text-[10px] font-semibold text-vd-green tracking-wide leading-none">
                    {e.month}
                  </div>
                  <div className="text-[18px] font-bold text-gray-900 leading-none mt-0.5">
                    {e.day}
                  </div>
                </div>

                {/* Type label */}
                <div className="absolute top-3 right-3 bg-white px-4 py-[3px] rounded-full flex justify-center items-center">
                  <span className="text-[12px] font-extrabold text-vd-green-dark tracking-wide uppercase drop-shadow ">
                    {e.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-[16px] text-gray-900 leading-snug mb-1">
                  {e.title}
                </h3>
                <p className="text-[13px] text-gray-500 mb-0.5">{e.location}</p>
                <p className="text-[13px] text-gray-500 mb-4">{e.date}</p>

                <button className="w-full h-10 bg-vd-green hover:bg-vd-green-dark text-white text-[14px] font-medium rounded-md transition-colors">
                  RSVP
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Events;
