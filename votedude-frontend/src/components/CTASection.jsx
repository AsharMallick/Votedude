export default function CTASection() {
  return (
    <section className="bg-vd-black text-white text-center">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="font-display font-black uppercase text-3xl sm:text-4xl mb-4">
          Take your first step
        </h2>
        <p className="text-white/60 text-sm leading-relaxed mb-8">
          When you become a Vote Dude, you begin the work of becoming a better citizen. Build a
          real understanding of the issues, connect with men who care, and cast a vote you can
          stand behind.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-vd-green hover:bg-vd-green-dark transition-colors text-white font-bold text-sm px-6 py-3.5 rounded-md">
            REGISTER TO VOTE →
          </button>
          <button className="border border-white/30 hover:border-white transition-colors text-white font-bold text-sm px-6 py-3.5 rounded-md">
            REGISTER A TEAM →
          </button>
        </div>
      </div>
    </section>
  );
}
