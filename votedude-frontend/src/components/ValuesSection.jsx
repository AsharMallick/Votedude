const values = [
  { n: '01', title: 'Facts', desc: 'Plain-language truth on candidates, laws, and the issues that matter — without the spin.' },
  { n: '02', title: 'Freedom', desc: 'The independence to think for yourself, free of party lines, pressure, and noise.' },
  { n: '03', title: 'Future', desc: 'Using knowledge and action to build a better country for the next generation.' },
  { n: '04', title: 'Fellowship', desc: 'Showing up for your community — at the ballot box, the town hall, and the field.' },
];

export default function ValuesSection() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <div>
            <p className="text-vd-green text-xs font-bold tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-vd-green" /> CORE VALUES
            </p>
            <h2 className="font-display font-black uppercase text-3xl sm:text-4xl">What we believe</h2>
          </div>
          <p className="text-vd-gray max-w-sm text-sm">
            We don't use the platform to advance an agenda — political, partisan, or otherwise.
            The truth belongs to the voter.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div key={v.n}>
              <div className="font-display font-black text-4xl text-black/10 mb-2">{v.n}</div>
              <h3 className="font-display font-bold uppercase text-sm tracking-wide mb-2">{v.title}</h3>
              <p className="text-vd-gray text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
