import { useScrollAnimation } from '../hooks/useScrollAnimation';

/* ── Invoice follow-up dashboard mockup ─────────────────── */
const invoices = [
  { client: 'Miller Design Co.',  num: 'INV-1042', amount: '$4,200', due: 'Apr 15', status: 'overdue',  note: '17d overdue' },
  { client: 'Harvest Media',      num: 'INV-1039', amount: '$1,850', due: 'Apr 22', status: 'reminded', note: 'Reminder sent' },
  { client: 'Oak & Stone LLC',    num: 'INV-1037', amount: '$680',   due: 'Apr 28', status: 'reminded', note: 'Reminder sent' },
  { client: 'Meridian Group',     num: 'INV-1035', amount: '$3,100', due: 'May 1',  status: 'overdue',  note: '3d overdue' },
  { client: 'Bellfield Co.',      num: 'INV-1033', amount: '$920',   due: 'May 5',  status: 'paid',     note: 'Paid ✓' },
];

const statusStyle = {
  overdue:  { bg: '#fee2e2', text: '#b91c1c' },
  reminded: { bg: '#fef9c3', text: '#92400e' },
  paid:     { bg: '#dcfce7', text: '#15803d' },
};

const navItems = [
  { icon: 'fa-gauge',       label: 'Dashboard'  },
  { icon: 'fa-file-invoice-dollar', label: 'Invoices', active: true },
  { icon: 'fa-paper-plane', label: 'Follow-ups' },
  { icon: 'fa-gear',        label: 'Settings'   },
];

function ProductMockup() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200/60">
      {/* Browser chrome */}
      <div className="h-9 bg-gray-100 flex items-center px-4 gap-2 border-b border-gray-200">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <div className="ml-3 flex-1 bg-white rounded-full h-5 max-w-[200px] flex items-center px-3">
          <span className="text-[10px] text-gray-400 truncate">app.aurrallo.com</span>
        </div>
        {/* QuickBooks sync badge */}
        <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-[9px] font-semibold text-green-700">QB Synced</span>
        </div>
      </div>

      {/* App shell */}
      <div className="flex bg-white" style={{ minHeight: 300 }}>
        {/* Sidebar */}
        <div className="w-40 bg-gray-50 border-r border-gray-100 p-3.5 flex-shrink-0">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">A</span>
            </div>
            <span className="text-xs font-bold text-gray-700">Aurrallo</span>
          </div>
          {navItems.map(({ icon, label, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[11px] mb-1 ${
                active ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-gray-500'
              }`}
            >
              <i className={`fa-solid ${icon} text-[10px]`} />
              {label}
            </div>
          ))}

          {/* Outstanding summary */}
          <div className="mt-4 p-2.5 rounded-xl bg-red-50 border border-red-100">
            <div className="text-[9px] text-red-500 font-semibold uppercase tracking-wide mb-1">Outstanding</div>
            <div className="text-[13px] font-bold text-red-700">$9,980</div>
            <div className="text-[9px] text-red-400 mt-0.5">4 invoices</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-bold text-gray-800">Invoices</div>
              <div className="text-[10px] text-gray-400 mt-0.5">5 invoices · 2 need follow-up</div>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-indigo-500 text-white text-[10px] font-semibold">
              + Send reminders
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 mb-3">
            {['All', 'Overdue', 'Sent', 'Paid'].map((tab, i) => (
              <div
                key={tab}
                className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                  i === 0 ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Invoice rows */}
          <div className="flex flex-col gap-1.5">
            {invoices.map((inv) => {
              const s = statusStyle[inv.status];
              return (
                <div
                  key={inv.num}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-gray-700 truncate">{inv.client}</div>
                    <div className="text-[9px] text-gray-400">{inv.num} · Due {inv.due}</div>
                  </div>
                  <div className="text-[11px] font-bold text-gray-700 flex-shrink-0">{inv.amount}</div>
                  <div
                    className="px-2 py-0.5 rounded-full text-[9px] font-semibold flex-shrink-0"
                    style={{ backgroundColor: s.bg, color: s.text }}
                  >
                    {inv.note}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Solution({ config, colors }) {
  const [ref,   isVisible]  = useScrollAnimation();
  const [refMock, mockVisible] = useScrollAnimation();
  const { sectionLabel, title, subtitle, points } = config;

  return (
    <section className="py-28 px-6" style={{ backgroundColor: colors.solutionBg }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text column */}
          <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
              style={{ backgroundColor: colors.solutionIconBg, color: colors.solutionAccent }}
            >
              {sectionLabel}
            </span>
            <h2
              className="font-neue font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: colors.solutionText }}
            >
              {title}
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: colors.solutionSubtext }}>
              {subtitle}
            </p>

            <ul className="flex flex-col gap-4">
              {points.map((pt, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 transition-all duration-500 ease-out"
                  style={{ transitionDelay: `${i * 110 + 200}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-12px)' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: colors.solutionIconBg }}
                  >
                    <i className={`${pt.icon} text-sm`} style={{ color: colors.solutionAccent }} />
                  </div>
                  <span className="font-medium text-[15px]" style={{ color: colors.solutionText }}>
                    {pt.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mockup column */}
          <div
            ref={refMock}
            className={`transition-all duration-900 ease-out ${
              mockVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <ProductMockup />
          </div>

        </div>
      </div>
    </section>
  );
}
