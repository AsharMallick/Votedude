export default function Hero() {
  return (
    <section className="relative bg-vd-black text-white overflow-hidden">
      {/* Placeholder for real photography — swap background image once assets are provided */}
      <div className="absolute inset-0 bg-gradient-to-br from-vd-dark via-vd-black to-vd-black opacity-95" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
        <p className="text-vd-green text-xs font-bold tracking-[0.2em] mb-4 flex items-center gap-2">
          <span className="w-6 h-px bg-vd-green" /> FACTS / FREEDOM / FUTURE / FELLOWSHIP
        </p>

        <h1 className="font-display font-black uppercase leading-[0.95] text-5xl sm:text-6xl lg:text-7xl">
          Not just
          <br />
          a voter.
          <br />
          <span className="text-vd-green">A citizen.</span>
        </h1>

        <p className="mt-6 max-w-xl text-white/70 text-base leading-relaxed">
          Know the issues. Show up to vote. Play on the team. Vote Dude is where good men build a
          better community — at the ballot box and on the field.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="bg-vd-green hover:bg-vd-green-dark transition-colors text-white font-bold text-sm px-6 py-3.5 rounded-md">
            REGISTER TO VOTE →
          </button>
          <button className="border border-white/30 hover:border-white transition-colors text-white font-bold text-sm px-6 py-3.5 rounded-md">
            JOIN A LEAGUE →
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative bg-vd-green-dark/90">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
          {[
            ['500K+', 'ACTIVE MEMBERS'],
            ['50', 'STATES COVERED'],
            ['4', 'SPORTS LEAGUES'],
            ['1,200+', 'TEAMS REGISTERED'],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="font-display font-black text-2xl sm:text-3xl">{num}</div>
              <div className="text-xs text-white/70 font-semibold tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
