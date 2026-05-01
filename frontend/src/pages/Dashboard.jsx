import { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AddAssignmentModal from '../components/AddAssignmentModal';

const PERIODS = [
  { period: 1, start: '08:15', end: '09:05' },
  { period: 2, start: '09:05', end: '09:55' },
  { period: 3, start: '10:10', end: '11:00' },
  { period: 4, start: '11:00', end: '11:50' },
  { period: 5, start: '11:50', end: '12:40' },
  { period: 6, start: '13:40', end: '14:30' },
  { period: 7, start: '14:30', end: '16:00' },
];

const BREAKS = [
  { afterPeriod: 2, label: 'Short Break', time: '9:55 - 10:10' },
  { afterPeriod: 5, label: 'Lunch Break', time: '12:40 - 1:40' },
];

const S = {
  page: {
    minHeight: '100vh',
    background: 'var(--page-bg)',
    paddingBottom: 80,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    background: 'var(--surface-1)',
    padding: '16px 20px',
    borderBottom: '0.5px solid var(--border-soft)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 800,
    fontStyle: 'italic',
    color: '#4B47D6',
    lineHeight: 1.1,
  },
  headerSub: {
    fontSize: 10,
    color: 'var(--text-secondary)',
    letterSpacing: '1.5px',
    fontWeight: 500,
    marginTop: 2,
  },
  headerDate: {
    fontSize: 11,
    color: 'var(--text-secondary)',
    fontWeight: 500,
    letterSpacing: '1px',
  },
  heroCard: {
    background: '#4B47D6',
    borderRadius: 20,
    padding: 20,
    margin: 16,
    color: 'white',
  },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
    padding: '4px 10px',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '1px',
    color: 'white',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginTop: 10,
    color: 'white',
  },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    lineHeight: 1.5,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '1.5px',
    color: 'var(--text-primary)',
    padding: '0 20px',
    marginBottom: 10,
  },
  nudgeCard: {
    background: 'var(--surface-1)',
    borderRadius: 14,
    boxShadow: 'var(--shadow-card)',
    overflow: 'hidden',
    display: 'flex',
    margin: '0 16px 10px',
  },
  nudgeBody: { padding: 12 },
  nudgeTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginTop: 2,
  },
  nudgeDesc: {
    fontSize: 12,
    color: 'var(--text-secondary)',
    marginTop: 2,
  },
  nudgeSubject: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 10px',
    borderRadius: 999,
    background: 'rgba(75, 71, 214, 0.1)',
    fontSize: 11,
    fontWeight: 700,
    color: '#4B47D6',
    letterSpacing: '0.3px',
    marginTop: 8,
  },
  periodsCard: {
    background: 'var(--surface-1)',
    borderRadius: 18,
    boxShadow: 'var(--shadow-card)',
    border: '1px solid var(--border-soft)',
    margin: '0 16px',
    overflow: 'hidden',
  },
  periodsCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 18px 12px',
    borderBottom: '1px solid var(--border-soft)',
  },
  periodsCardTitle: {
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: '1.2px',
    color: 'var(--text-primary)',
  },
  periodsCardMeta: {
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--text-secondary)',
  },
  timeline: {
    maxHeight: 280,
    overflowY: 'auto',
    padding: '18px 20px',
  },
  timelineSlot: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
    padding: '6px 0',
  },
  dotCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 16,
    flexShrink: 0,
    marginTop: 4,
  },
  line: {
    width: 2,
    height: 44,
    background: 'var(--border-soft)',
    marginTop: 2,
  },
  content: { flex: 1, paddingBottom: 8 },
  liveRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 10,
    fontWeight: 700,
    color: '#2ECC71',
    letterSpacing: '0.8px',
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#2ECC71',
  },
  periodTime: { fontSize: 11, color: 'var(--text-secondary)' },
  periodSubject: { fontSize: 16, color: 'var(--text-primary)', marginTop: 1 },
  periodRoom: { fontSize: 12, color: 'var(--text-secondary)' },
  breakLabel: {
    fontSize: 13,
    fontStyle: 'italic',
    color: 'var(--text-secondary)',
  },
  breakTime: { fontSize: 11, color: 'var(--text-muted)' },
  fab: {
    position: 'fixed',
    bottom: 88,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 56,
    height: 56,
    borderRadius: 16,
    background: '#4B47D6',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    zIndex: 90,
  },
};

function timeToMins(str) {
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
}

function getCurrentPeriod() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  return PERIODS.find((p) =>
    mins >= timeToMins(p.start) && mins <= timeToMins(p.end)
  ) || null;
}

function getBreakNow() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  if (mins >= timeToMins('09:55') && mins <= timeToMins('10:10')) return BREAKS[0];
  if (mins >= timeToMins('12:40') && mins <= timeToMins('13:40')) return BREAKS[1];
  return null;
}

function isPast(end) {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins > timeToMins(end);
}

function getDayOfWeek(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const v = d.getDay();
  return v === 0 ? 7 : v;
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).toUpperCase();
}

export default function Dashboard() {
  const { timetable, assignments, handleAddAssignment } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const todayDay = getDayOfWeek(0);
  const tomorrowDay = getDayOfWeek(1);

  const todayClasses = timetable
    .filter((c) => c.dayOfWeek === todayDay)
    .sort((a, b) => a.period - b.period);
  const tomorrowClasses = timetable
    .filter((c) => c.dayOfWeek === tomorrowDay)
    .sort((a, b) => a.period - b.period);

  const currentPeriod = getCurrentPeriod();
  const breakNow = getBreakNow();

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => window.clearInterval(timerId);
  }, []);

  const nudges = useMemo(
    () =>
      assignments.filter((a) => {
        if (a.isCompleted) return false;
        const days = Math.ceil((a.dueDateMillis - now) / 86400000);
        return days >= 0 && days <= 7;
      }),
    [assignments, now]
  );

  const timelineSlots = useMemo(() => {
    const slots = [];
    for (let p = 1; p <= 7; p += 1) {
      const cls = todayClasses.find((c) => c.period === p);
      const info = PERIODS.find((x) => x.period === p);
      if (cls && info) slots.push({ type: 'class', cls, info });
      const brk = BREAKS.find((b) => b.afterPeriod === p);
      if (brk) slots.push({ type: 'break', brk });
    }
    return slots;
  }, [todayClasses]);

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <div style={S.appTitle}>Sem-Assist</div>
          <div style={S.headerSub}>ACADEMIC ASSISTANT</div>
        </div>
        <div style={S.headerDate}>{formatDate()}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 16 }}>
        <div style={S.heroCard}>
          <span style={S.heroBadge}>TONIGHT&apos;S PREVIEW</span>
          <div style={S.heroTitle}>Prepare for Tomorrow</div>
          {tomorrowClasses.length > 0 ? (
            <div style={S.heroSub}>
              You have <b style={{ color: 'white' }}>{tomorrowClasses.length} periods</b> starting with{' '}
              <b style={{ color: 'white' }}>{tomorrowClasses[0].subject}</b> at{' '}
              {PERIODS.find((p) => p.period === tomorrowClasses[0].period)?.start}
            </div>
          ) : (
            <div style={S.heroSub}>No classes tomorrow - enjoy your free day!</div>
          )}
        </div>

        {nudges.length > 0 && (
          <div>
            <div style={S.sectionTitle}>SMART NUDGES</div>
            {nudges.map((a) => {
              const days = Math.ceil((a.dueDateMillis - now) / 86400000);
              const color = days === 0 ? '#E74C3C' : days <= 1 ? '#E85D26' : '#F39C12';
              const label =
                days === 0 ? 'DUE TODAY' : days === 1 ? 'DUE TOMORROW' : `${days} DAYS PRIOR`;

              return (
                <div key={a._id} style={S.nudgeCard}>
                  <div style={{ width: 4, background: color, flexShrink: 0 }} />
                  <div style={S.nudgeBody}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', color }}>
                      {label}
                    </div>
                    <div style={S.nudgeTitle}>{a.title}</div>
                    {a.description && <div style={S.nudgeDesc}>{a.description}</div>}
                    <div style={S.nudgeSubject}>{a.subject}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div>
          {todayClasses.length === 0 ? (
            <>
              <div style={S.sectionTitle}>TODAY&apos;S PERIODS</div>
              <p style={{ padding: '0 20px', color: 'var(--text-secondary)', fontSize: 14 }}>
                No classes today
              </p>
            </>
          ) : (
            <div style={S.periodsCard}>
              <div style={S.periodsCardHeader}>
                <div style={S.periodsCardTitle}>TODAY&apos;S PERIODS</div>
                <div style={S.periodsCardMeta}>{todayClasses.length} planned</div>
              </div>
              <div className="today-periods-fade-box">
                <div style={S.timeline}>
                  {timelineSlots.map((slot, i) => {
                    if (slot.type === 'break') {
                      const isCurrent = breakNow?.label === slot.brk.label;
                      return (
                        <div key={`b${i}`} style={S.timelineSlot}>
                          <div style={S.dotCol}>
                            <div
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: isCurrent ? '#4B47D6' : 'var(--border-soft)',
                              }}
                            />
                            <div style={S.line} />
                          </div>
                          <div style={S.content}>
                            {isCurrent && (
                              <div
                                style={{
                                  fontSize: 10,
                                  fontWeight: 700,
                                  color: '#4B47D6',
                                  letterSpacing: '0.8px',
                                }}
                              >
                                BREAK NOW
                              </div>
                            )}
                            <div style={S.breakLabel}>{slot.brk.label}</div>
                            <div style={S.breakTime}>{slot.brk.time}</div>
                          </div>
                        </div>
                      );
                    }

                    const { cls, info } = slot;
                    const isLive = currentPeriod?.period === cls.period;
                    const past = isPast(info.end);

                    return (
                      <div key={cls._id} style={S.timelineSlot}>
                        <div style={S.dotCol}>
                          <div
                            style={{
                              width: isLive ? 12 : 8,
                              height: isLive ? 12 : 8,
                              borderRadius: '50%',
                              background: isLive
                                ? '#2ECC71'
                                : past
                                  ? 'var(--border-soft)'
                                  : 'var(--text-muted)',
                            }}
                          />
                          <div style={S.line} />
                        </div>
                        <div style={S.content}>
                          {isLive ? (
                            <div style={S.liveRow}>
                              <div className="live-pulse-dot" style={S.liveDot} />
                              LIVE NOW
                            </div>
                          ) : (
                            <div style={S.periodTime}>
                              {info.start} - {info.end}
                            </div>
                          )}
                          <div
                            style={{
                              ...S.periodSubject,
                              fontWeight: isLive ? 700 : 400,
                              color: past ? 'var(--text-muted)' : 'var(--text-primary)',
                            }}
                          >
                            {cls.subject}
                          </div>
                          <div style={S.periodRoom}>
                            {cls.room} - {cls.lecturer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <button style={S.fab} onClick={() => setShowAdd(true)}>
        <Plus size={24} />
      </button>

      {showAdd && (
        <AddAssignmentModal
          onSave={async (data) => {
            await handleAddAssignment(data);
            setShowAdd(false);
          }}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}
