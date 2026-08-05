// import React from "react";

// const sports = [
//   { name: "Bowling", teams: "214 teams registered", icon: "🎳" },
//   { name: "Basketball", teams: "386 teams registered", icon: "🏀" },
//   { name: "Flag Football", teams: "302 teams registered", icon: "🏈" },
//   { name: "Pickleball", teams: "298 teams registered", icon: "🏓" },
// ];

// const values = [
//   {
//     n: "01",
//     title: "Facts",
//     desc: "Plain-language truth on candidates, laws, and the issues that matter — without the spin.",
//   },
//   {
//     n: "02",
//     title: "Freedom",
//     desc: "The independence to think for yourself, free of party lines, pressure, and noise.",
//   },
//   {
//     n: "03",
//     title: "Future",
//     desc: "Using knowledge and action to build a better country for the next generation.",
//   },
//   {
//     n: "04",
//     title: "Fellowship",
//     desc: "Showing up for your community — at the ballot box, the town hall, and the field.",
//   },
// ];

// const Home = () => {
//   return (
//     <div>
//       <Hero />
//       <SportsSection />
//       <ValuesSection />
//       <CTASection />
//     </div>
//   );
// };

// export default Home;

// const Hero = () => {
//   return (
//     <section className="relative bg-vd-black text-white overflow-hidden">
//       {/* Placeholder for real photography — swap background image once assets are provided */}
//       <div className="absolute inset-0 bg-gradient-to-br from-vd-dark via-vd-black to-vd-black opacity-95" />

//       <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
//         <p className="text-vd-green text-xs font-bold tracking-[0.2em] mb-4 flex items-center gap-2">
//           <span className="w-6 h-px bg-vd-green" /> FACTS / FREEDOM / FUTURE /
//           FELLOWSHIP
//         </p>

//         <h1 className="font-display font-black uppercase leading-[0.95] text-5xl sm:text-6xl lg:text-7xl">
//           Not just
//           <br />
//           a voter.
//           <br />
//           <span className="text-vd-green">A citizen.</span>
//         </h1>

//         <p className="mt-6 max-w-xl text-white/70 text-base leading-relaxed">
//           Know the issues. Show up to vote. Play on the team. Vote Dude is where
//           good men build a better community — at the ballot box and on the
//           field.
//         </p>

//         <div className="mt-8 flex flex-wrap gap-4">
//           <button className="bg-vd-green hover:bg-vd-green-dark transition-colors text-white font-bold text-sm px-6 py-3.5 rounded-md">
//             REGISTER TO VOTE →
//           </button>
//           <button className="border border-white/30 hover:border-white transition-colors text-white font-bold text-sm px-6 py-3.5 rounded-md">
//             JOIN A LEAGUE →
//           </button>
//         </div>
//       </div>

//       {/* Stats bar */}
//       <div className="relative bg-vd-green-dark/90">
//         <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
//           {[
//             ["500K+", "ACTIVE MEMBERS"],
//             ["50", "STATES COVERED"],
//             ["4", "SPORTS LEAGUES"],
//             ["1,200+", "TEAMS REGISTERED"],
//           ].map(([num, label]) => (
//             <div key={label}>
//               <div className="font-display font-black text-2xl sm:text-3xl">
//                 {num}
//               </div>
//               <div className="text-xs text-white/70 font-semibold tracking-wide">
//                 {label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const SportsSection = () => {
//   return (
//     <section className="bg-vd-dark text-white">
//       <div className="max-w-7xl mx-auto px-6 py-16">
//         <p className="text-vd-green text-xs font-bold tracking-[0.2em] mb-3 flex items-center gap-2">
//           <span className="w-6 h-px bg-vd-green" /> NEW · SPORTS LEAGUES
//         </p>
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
//           <h2 className="font-display font-black uppercase text-3xl sm:text-4xl leading-tight">
//             Compete together.
//             <br />
//             Vote together.
//           </h2>
//           <p className="text-white/60 max-w-sm text-sm">
//             Community isn't just built at the ballot box. Register your squad
//             and get after it — four leagues, open to every chapter.
//           </p>
//         </div>

//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
//           {sports.map((s) => (
//             <div key={s.name} className="bg-vd-dark p-6">
//               <div className="text-2xl mb-3">{s.icon}</div>
//               <h3 className="font-display font-bold uppercase text-sm tracking-wide">
//                 {s.name}
//               </h3>
//               <p className="text-white/50 text-xs mt-1">{s.teams}</p>
//               <a
//                 href="#leagues"
//                 className="text-vd-green text-xs font-semibold mt-3 inline-block"
//               >
//                 Register your team →
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const ValuesSection = () => {
//   return (
//     <section className="bg-white">
//       <div className="max-w-7xl mx-auto px-6 py-16">
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
//           <div>
//             <p className="text-vd-green text-xs font-bold tracking-[0.2em] mb-3 flex items-center gap-2">
//               <span className="w-6 h-px bg-vd-green" /> CORE VALUES
//             </p>
//             <h2 className="font-display font-black uppercase text-3xl sm:text-4xl">
//               What we believe
//             </h2>
//           </div>
//           <p className="text-vd-gray max-w-sm text-sm">
//             We don't use the platform to advance an agenda — political,
//             partisan, or otherwise. The truth belongs to the voter.
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {values.map((v) => (
//             <div key={v.n}>
//               <div className="font-display font-black text-4xl text-black/10 mb-2">
//                 {v.n}
//               </div>
//               <h3 className="font-display font-bold uppercase text-sm tracking-wide mb-2">
//                 {v.title}
//               </h3>
//               <p className="text-vd-gray text-sm leading-relaxed">{v.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const CTASection = () => {
//   return (
//     <section className="bg-vd-black text-white text-center">
//       <div className="max-w-3xl mx-auto px-6 py-20">
//         <h2 className="font-display font-black uppercase text-3xl sm:text-4xl mb-4">
//           Take your first step
//         </h2>
//         <p className="text-white/60 text-sm leading-relaxed mb-8">
//           When you become a Vote Dude, you begin the work of becoming a better
//           citizen. Build a real understanding of the issues, connect with men
//           who care, and cast a vote you can stand behind.
//         </p>
//         <div className="flex flex-wrap justify-center gap-4">
//           <button className="bg-vd-green hover:bg-vd-green-dark transition-colors text-white font-bold text-sm px-6 py-3.5 rounded-md">
//             REGISTER TO VOTE →
//           </button>
//           <button className="border border-white/30 hover:border-white transition-colors text-white font-bold text-sm px-6 py-3.5 rounded-md">
//             REGISTER A TEAM →
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };
import React from "react";

// Update the sports data with image URLs.
const sports = [
  {
    name: "Bowling",
    teams: "214 teams registered",
    icon: "https://images.unsplash.com/photo-1620914902131-016149176f28?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Basketball",
    teams: "386 teams registered",
    icon: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Flag Football",
    teams: "302 teams registered",
    icon: "https://images.unsplash.com/photo-1616012053158-7550f24f0c8a?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Pickleball",
    teams: "298 teams registered",
    icon: "https://images.unsplash.com/photo-1662998394469-8083a99cc1aa?q=80&w=400&auto=format&fit=crop",
  },
];

const values = [
  {
    n: "01",
    title: "Facts",
    desc: "Plain-language truth on candidates, laws, and the issues that matter — without the spin.",
  },
  {
    n: "02",
    title: "Freedom",
    desc: "The independence to think for yourself, free of party lines, pressure, and noise.",
  },
  {
    n: "03",
    title: "Future",
    desc: "Using knowledge and action to build a better country for the next generation.",
  },
  {
    n: "04",
    title: "Fellowship",
    desc: "Showing up for your community — at the ballot box, the town hall, and the field.",
  },
];

const Home = () => {
  return (
    <>
      <div className="bg-[#121614] text-white font-sans">
        <Hero />
        <GreenDivider />
        <AboutSection />
        <SportsSection />
        <WhoWeAreSection />
        <QuoteBanner />
        <ValuesSection />
        <CTASection />
      </div>
    </>
  );
};

export default Home;

/* HERO SECTION */
const Hero = () => {
  return (
    <section className="relative bg-[#121614] text-white overflow-hidden min-h-[85vh] flex flex-col justify-between">
      {/* Background image for the Hero section */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=2500&auto=format&fit=crop"
          alt="Voter crowd background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/20 via-[#121614] to-[#121614] z-10" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12 w-full flex-1 flex flex-col justify-center z-20">
        <p className="text-[#3ea876] text-xs font-bold tracking-[0.25em] mb-6 flex items-center gap-2">
          <span className="w-6 h-px bg-[#3ea876]" /> FACTS / FREEDOM / FUTURE /
          FELLOWSHIP
        </p>

        <h1 className="font-extrabold uppercase leading-[0.95] text-5xl sm:text-7xl lg:text-8xl tracking-tight">
          Not just
          <br />
          a voter.
          <br />
          <span className="text-[#3ea876]">A citizen.</span>
        </h1>

        <p className="mt-6 max-w-lg text-white/70 text-sm sm:text-base leading-relaxed">
          Know the issues. Show up to vote. Play on the team. Vote Dude is where
          good men build a better community — at the ballot box and on the
          field.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="bg-[#3ea876] hover:bg-[#348f64] transition-colors text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded">
            Register to Vote →
          </button>
          <button className="border border-white/30 hover:border-white transition-colors text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded">
            Join a League →
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative bg-[#0d100e] border-t border-white/10 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
          {[
            ["500K+", "ACTIVE MEMBERS"],
            ["50", "STATES COVERED"],
            ["4", "SPORTS LEAGUES"],
            ["1,200+", "TEAMS REGISTERED"],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="font-black text-2xl sm:text-3xl text-white">
                {num}
              </div>
              <div className="text-[10px] text-white/60 font-bold tracking-widest mt-0.5">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ACCENT DIVIDER */
const GreenDivider = () => <div className="h-3 bg-[#3ea876] w-full" />;

/* "WHAT IS VOTE DUDE?" SECTION */
const AboutSection = () => {
  return (
    <section className="bg-white text-neutral-900 py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="aspect-[4/5] bg-neutral-200 rounded-lg overflow-hidden relative shadow-lg">
            {/* Swapped placeholder for a thematic image */}
            <img
              src="/citizen.png"
              alt="Community engagement"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-[#121614] text-white p-4 rounded max-w-[160px]">
              <div className="font-black text-2xl">10K+</div>
              <div className="text-[10px] text-white/70 uppercase tracking-wider leading-tight mt-1">
                Active Discussions Monthly
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[#3ea876] text-xs font-bold tracking-[0.2em] mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-[#3ea876]" /> THE MOVEMENT
          </p>
          <h2 className="font-extrabold uppercase text-4xl sm:text-5xl mb-6 tracking-tight">
            What is <br /> Vote Dude?
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed mb-4">
            Vote Dude is a nonpartisan movement for men who want the truth — not
            the spin. It cuts through the noise of modern politics to give you
            real answers on candidates, laws, and the issues that shape your
            daily life.
          </p>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Through facts, open discussion, and the drive to act, the future of
            informed citizenship relies on men like you — a tireless effort to
            turn good men into engaged citizens, on and off the field.
          </p>
        </div>
      </div>
    </section>
  );
};

/* SPORTS LEAGUES SECTION */
const SportsSection = () => {
  return (
    <section className="bg-[#121614] text-white py-20 relative">
      {/* Background image for the Sports section */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1508100134119-f2aa5939963e?q=80&w=2500&auto=format&fit=crop"
          alt="Field background"
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <p className="text-[#3ea876] text-xs font-bold tracking-[0.2em] mb-3 flex items-center gap-2">
          <span className="w-6 h-px bg-[#3ea876]" /> NEW · SPORTS LEAGUES
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <h2 className="font-extrabold uppercase text-3xl sm:text-5xl leading-tight tracking-tight">
            Compete Together.
            <br />
            Vote Together.
          </h2>
          <p className="text-white/60 max-w-md text-xs sm:text-sm leading-relaxed">
            Community isn't just built at the ballot box. Register your squad
            and get after it — four leagues, open to every chapter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((s) => (
            <div
              key={s.name}
              className="bg-[#1a201c] p-6 rounded border border-white/5 flex flex-col justify-between h-64 shadow-xl"
            >
              <div>
                <div className="w-16 h-16 rounded bg-[#3ea876]/10 text-[#3ea876] flex items-center justify-center mb-4 overflow-hidden border border-[#3ea876]/20">
                  {/* Corrected logic for image rendering */}
                  <img
                    src={s.icon}
                    alt={`${s.name} Icon`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=Image";
                    }}
                  />
                </div>
                <h3 className="font-extrabold uppercase text-sm tracking-wider">
                  {s.name}
                </h3>
                <p className="text-white/40 text-xs mt-1">{s.teams}</p>
              </div>
              <a
                href="#leagues"
                className="text-[#3ea876] text-xs font-semibold hover:underline inline-block mt-4"
              >
                Register your team →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* "WHO WE ARE" SECTION */
const WhoWeAreSection = () => {
  return (
    <section className="bg-white text-neutral-900 py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#3ea876] text-xs font-bold tracking-[0.2em] mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-[#3ea876]" /> THE CITIZEN
          </p>
          <h2 className="font-extrabold uppercase text-4xl sm:text-5xl mb-6 tracking-tight">
            Who we are
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed mb-4">
            A Vote Dude is a man who has taken it on himself to be informed.
            Beyond casting a ballot, being a Vote Dude means so much more — he's
            committed to bettering his community, and he brings other men along
            with him.
          </p>
          <p className="text-neutral-600 text-sm leading-relaxed">
            There are habits of every Vote Dude: get the facts, join the
            conversation, show up to vote, and show up for your teammates. Some
            start with a single petition, others build whole chapters and whole
            leagues.
          </p>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] bg-neutral-200 rounded-lg overflow-hidden shadow-lg">
            {/* Added a thematic group image */}
            <img
              src="/who-are-we-1.png"
              alt="Community group"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 w-1/2 aspect-square rounded-lg overflow-hidden border-4 border-white shadow-xl hidden sm:block">
            {/* Added a team image */}
            <img
              //   src="https://images.unsplash.com/photo-1517649763962-0c623266010b?q=80&w=600&auto=format&fit=crop"
              src="/who-are-we-2.png"
              alt="Teammates"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

/* QUOTE BANNER */
const QuoteBanner = () => {
  return (
    <section className="relative bg-[#121614] text-white py-24 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-black/70 z-10" />
      {/* Retained thematic background image */}
      <img
        src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80"
        alt="Background ballot"
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
      />
      <div className="relative z-20 max-w-3xl mx-auto">
        <span className="text-[#3ea876] text-4xl font-serif">“</span>
        <blockquote className="font-semibold italic text-xl sm:text-3xl text-white/90 leading-snug">
          Look at the ballot. You'll see the country a whole new way.
        </blockquote>
      </div>
    </section>
  );
};

/* VALUES SECTION */
const ValuesSection = () => {
  return (
    <section className="bg-white text-neutral-900 py-20 relative overflow-hidden">
      {/* Background image for the Values section */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2500&auto=format&fit=crop"
          alt="Subtle texture"
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="text-[#3ea876] text-xs font-bold tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-[#3ea876]" /> CORE VALUES
            </p>
            <h2 className="font-extrabold uppercase text-3xl sm:text-5xl tracking-tight">
              What we believe
            </h2>
          </div>
          <p className="text-neutral-500 max-w-md text-xs sm:text-sm leading-relaxed">
            We don't use the platform to advance an agenda — political,
            partisan, or otherwise. The truth belongs to the voter.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div
              key={v.n}
              className="border-t border-neutral-200 pt-6 bg-white/50 p-4 rounded shadow-sm"
            >
              <div className="font-black text-4xl text-neutral-200 mb-2">
                {v.n}
              </div>
              <h3 className="font-extrabold uppercase text-sm tracking-wider mb-2">
                {v.title}
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* CTA SECTION */
const CTASection = () => {
  return (
    <section className="relative bg-[#121614] text-white py-24 text-center overflow-hidden">
      <div className="absolute inset-0 bg-black/70 z-10" />
      {/* Retained thematic background image */}
      <img
        src="/take-your-first-step.png"
        alt="Team huddled"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />
      <div className="relative z-20 max-w-3xl mx-auto px-6">
        <h2 className="font-extrabold uppercase text-3xl sm:text-5xl mb-4 tracking-tight">
          Take your first step
        </h2>
        <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-8">
          When you become a Vote Dude, you begin the work of becoming a better
          citizen. Build a real understanding of the issues, connect with men
          who care, register a team, and cast a vote you can stand behind.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-[#3ea876] hover:bg-[#348f64] transition-colors text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded">
            Register to Vote →
          </button>
          <button className="border border-white/30 hover:border-white transition-colors text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded">
            Register a Team →
          </button>
        </div>
      </div>
    </section>
  );
};
