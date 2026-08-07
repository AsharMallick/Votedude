import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetEventsQuery,
  useRsvpEventMutation,
} from "../redux/services/eventApi";

export default function Events() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading, isError, error } = useGetEventsQuery();
  const [rsvpEvent, { isLoading: rsvpLoading }] = useRsvpEventMutation();

  const events = data?.events || [];

  const handleRsvp = async (eventId) => {
    if (!user) {
      navigate("/auth", { state: { login: true } });
      return;
    }
    try {
      await rsvpEvent(eventId).unwrap();
    } catch (err) {
      alert(err?.data?.message || "RSVP failed");
    }
  };

  const hasRsvpd = (event) => {
    if (!user || !event.rsvpList) return false;
    return event.rsvpList.some(
      (id) =>
        String(id) === String(user._id) || String(id?._id) === String(user._id),
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return { month: "", day: "", full: "" };
    const d = new Date(dateStr);
    return {
      month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      day: String(d.getDate()).padStart(2, "0"),
      full: d.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    };
  };

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
              <button className="h-[44px] px-5 bg-black hover:bg-black/80 text-white text-[14px] font-medium rounded-md transition-colors shadow-sm whitespace-nowrap flex items-center gap-1.5">
                <span className="text-lg leading-none">+</span>
                Host an Event
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {isLoading && (
          <p className="text-center text-gray-500 py-20">Loading events...</p>
        )}

        {isError && (
          <p className="text-center text-red-500 py-20">
            {error?.data?.message || "Failed to load events"}
          </p>
        )}

        {!isLoading && events.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            No upcoming events. Check back soon.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((e) => {
            const { month, day, full } = formatDate(e.date);
            const joined = hasRsvpd(e);

            return (
              <article
                key={e._id}
                className="bg-white border border-[#00000031] rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-36 bg-gray-100">
                  {e.image ? (
                    <img
                      src={e.image}
                      alt={e.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">
                      📅
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute top-3 left-3 bg-white rounded-lg px-2.5 py-1.5 shadow-sm text-center min-w-[48px]">
                    <div className="text-[10px] font-semibold text-vd-green tracking-wide leading-none">
                      {month}
                    </div>
                    <div className="text-[18px] font-bold text-gray-900 leading-none mt-0.5">
                      {day}
                    </div>
                  </div>

                  {e.category && (
                    <div className="absolute top-3 right-3 bg-white px-3 py-[3px] rounded-full">
                      <span className="text-[11px] font-extrabold text-vd-green-dark tracking-wide uppercase">
                        {e.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-[16px] text-gray-900 leading-snug mb-1">
                    {e.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 mb-0.5">
                    {e.location}
                  </p>
                  <p className="text-[13px] text-gray-500 mb-4">{full}</p>

                  <button
                    onClick={() => handleRsvp(e._id)}
                    disabled={rsvpLoading}
                    className={`w-full h-10 text-[14px] font-medium rounded-md transition-colors ${
                      joined
                        ? "bg-red-300 border border-gray-200 text-white hover:bg-red-400"
                        : "bg-vd-green hover:bg-vd-green-dark text-white"
                    }`}
                  >
                    {joined ? "Going ✓" : "RSVP"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
