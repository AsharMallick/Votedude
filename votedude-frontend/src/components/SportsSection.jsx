const sports = [
  { name: 'Bowling', teams: '214 teams registered', icon: '🎳' },
  { name: 'Basketball', teams: '386 teams registered', icon: '🏀' },
  { name: 'Flag Football', teams: '302 teams registered', icon: '🏈' },
  { name: 'Pickleball', teams: '298 teams registered', icon: '🏓' },
];

export default function SportsSection() {
  return (
    <section className="bg-vd-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-vd-green text-xs font-bold tracking-[0.2em] mb-3 flex items-center gap-2">
          <span className="w-6 h-px bg-vd-green" /> NEW · SPORTS LEAGUES
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <h2 className="font-display font-black uppercase text-3xl sm:text-4xl leading-tight">
            Compete together.
            <br />
            Vote together.
          </h2>
          <p className="text-white/60 max-w-sm text-sm">
            Community isn't just built at the ballot box. Register your squad and get after it —
            four leagues, open to every chapter.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {sports.map((s) => (
            <div key={s.name} className="bg-vd-dark p-6">
              <div className="text-2xl mb-3">{s.icon}</div>
              <h3 className="font-display font-bold uppercase text-sm tracking-wide">{s.name}</h3>
              <p className="text-white/50 text-xs mt-1">{s.teams}</p>
              <a href="#leagues" className="text-vd-green text-xs font-semibold mt-3 inline-block">
                Register your team →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
