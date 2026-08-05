export default function Footer() {
  return (
    <footer className="bg-vd-black text-white/70 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          {/* <div className="flex items-center gap-2 font-display font-black text-white mb-3">
            <span className="w-7 h-7 rounded-full bg-vd-green flex items-center justify-center text-white text-xs">VD</span>
            VOTE DUDE
          </div> */}
          <img src="/logo-white.png" className="w-[15vh]" />
          <p className="text-xs leading-relaxed">
            Nonpartisan civic engagement for men who want facts, freedom, and a
            future worth building.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs tracking-wide mb-3">
            ENGAGE
          </h4>
          <ul className="space-y-2 text-xs">
            <li>Candidates</li>
            <li>Issues</li>
            <li>Laws</li>
            <li>Petitions</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs tracking-wide mb-3">
            ACT
          </h4>
          <ul className="space-y-2 text-xs">
            <li>Register to Vote</li>
            <li>Sports Leagues</li>
            <li>Events</li>
            <li>Discussions</li>
            <li>News</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs tracking-wide mb-3">
            STAY IN THE LOOP
          </h4>
          <p className="text-xs mb-3">Get weekly nonpartisan updates.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="bg-white/10 text-xs px-3 py-2 rounded-md flex-1 outline-none placeholder:text-white/40"
            />
            <button className="bg-vd-green text-white text-xs font-bold px-4 rounded-md">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <span>© 2026 Vote Dude. Nonpartisan & independent.</span>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
