import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus } from 'lucide-react';

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
  { afterPeriod: 2, label: 'Short Break', time: '9:55 – 10:10' },
  { afterPeriod: 5, label: 'Lunch Break',  time: '12:40 – 1:40' },
];

const SUBJECT_COLORS = {
  DAA: '#4B47D6', OS: '#2ECC71', 'UI/UX': '#E85D26',
  FSD: '#3498DB', 'P&S': '#9B59B6', COA: '#1ABC9C',
  FP: '#E74C3C', UHV: '#F39C12', Training: '#95A5A6'
};

function subjectColor(s) {
  return SUBJECT_COLORS[s] || '#607D8B';
}

function getTodayIndex() {
  const v = new Date().getDay();
  return v === 0 ? 5 : v - 1;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Timetable() {
  const { timetable, handleSaveClass, handleDeleteClass, handleResetTimetable } = useApp();
  const todayIndex = getTodayIndex();
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [editing, setEditing]         = useState(null);
  const [showAdd, setShowAdd]         = useState(false);
  const [showReset, setShowReset]     = useState(false);

  const dayClasses = timetable
    .filter(c => c.dayOfWeek === selectedDay + 1)
    .sort((a, b) => a.period - b.period);

  const extraClasses = dayClasses.filter(c => c.period > 7);

  const accent = '#4B47D6';

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--page-bg)', paddingBottom: 80,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>

      {/* Header */}
      <div style={{
        background: 'var(--surface-1)', padding: '16px 20px',
        borderBottom: '0.5px solid var(--border-soft)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
              Timetable
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)',
                          letterSpacing: '1px', fontWeight: 500 }}>
              SECTION-20 · N-408
            </div>
          </div>
          <button
            onClick={() => setShowReset(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer',
                     color: accent, fontSize: 13, fontWeight: 600,
                     fontFamily: 'inherit' }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Day tabs */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        background: 'var(--surface-1)', padding: '8px 12px',
        borderBottom: '0.5px solid var(--border-soft)'
      }}>
        {DAYS.map((day, i) => {
          const isSelected = i === selectedDay;
          const isToday    = i === todayIndex;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(i)}
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', padding: '8px 10px',
                borderRadius: 12, cursor: 'pointer',
                fontSize: 13,
                fontWeight: isSelected ? 700 : 400,
                color: isSelected ? 'white' : 'var(--text-primary)',
                background: isSelected ? accent : 'transparent',
                border: 'none', fontFamily: 'inherit',
                transition: 'background 0.15s'
              }}
            >
              {day}
              {isToday && (
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  marginTop: 3,
                  background: isSelected ? 'white' : accent
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Schedule */}
      <div style={{ padding: '12px 16px' }}>
        {dayClasses.filter(c => c.period <= 7).length === 0 &&
         extraClasses.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        padding: '60px 20px', gap: 10 }}>
            <div style={{ fontSize: 40 }}>🎉</div>
            <div style={{ fontSize: 16, color: 'var(--text-secondary)' }}>
              No classes on {DAYS[selectedDay]}
            </div>
          </div>
        ) : (
          <>
            {/* Periods 1-7 with breaks */}
            {Array.from({ length: 7 }, (_, i) => i + 1).map(p => {
              const cls  = dayClasses.find(c => c.period === p);
              const info = PERIODS.find(x => x.period === p);
              const brk  = BREAKS.find(b => b.afterPeriod === p);
              const color = cls ? subjectColor(cls.subject) : '#E0E0E0';

              return (
                <div key={p}>
                  {/* Period row */}
                  {cls ? (
                    <div
                      onClick={() => setEditing(cls)}
                      style={{
                        background: 'var(--surface-1)', borderRadius: 14,
                        boxShadow: 'var(--shadow-card)',
                        overflow: 'hidden', display: 'flex',
                        marginBottom: 10, cursor: 'pointer'
                      }}
                    >
                      <div style={{
                        width: 5, flexShrink: 0, background: color
                      }} />
                      <div style={{
                        flex: 1, padding: '12px 14px',
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontSize: 11, color: 'var(--text-secondary)',
                                        fontWeight: 500 }}>
                            P{p} · {info?.start} – {info?.end}
                          </div>
                          <div style={{ fontSize: 17, fontWeight: 700,
                                        color: 'var(--text-primary)', marginTop: 2 }}>
                            {cls.subject}
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--text-secondary)',
                                        marginTop: 1 }}>
                            {cls.lecturer}
                          </div>
                        </div>
                        <div style={{
                          padding: '4px 10px', borderRadius: 8,
                          background: color + '22',
                          fontSize: 12, fontWeight: 600, color
                        }}>
                          {cls.room}
                        </div>
                      </div>
                    </div>
                  ) : info ? (
                    <div style={{
                      padding: '10px 4px', marginBottom: 4, opacity: 0.5
                    }}>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                        P{p} · {info.start} – {info.end}
                      </div>
                      <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                        Free Slot
                      </div>
                    </div>
                  ) : null}

                  {/* Break divider */}
                  {brk && (
                    <div style={{
                      display: 'flex', alignItems: 'center',
                      gap: 12, padding: '8px 4px', marginBottom: 4
                    }}>
                      <div style={{ flex: 1, height: 0.5,
                                    background: 'var(--border-soft)' }} />
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 10, fontWeight: 800,
                                      letterSpacing: '1px', color: 'var(--text-muted)' }}>
                          {brk.label.toUpperCase()}
                        </div>
                        <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>
                          {brk.time}
                        </div>
                      </div>
                      <div style={{ flex: 1, height: 0.5,
                                    background: 'var(--border-soft)' }} />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Extra periods */}
            {extraClasses.length > 0 && (
              <>
                <div style={{ fontSize: 11, fontWeight: 700,
                              letterSpacing: '1.5px', color: 'var(--text-secondary)',
                              marginTop: 16, marginBottom: 8 }}>
                  EXTRA PERIODS
                </div>
                {extraClasses.map(cls => {
                  const color = subjectColor(cls.subject);
                  return (
                    <div
                      key={cls._id}
                      onClick={() => setEditing(cls)}
                      style={{
                        background: 'var(--surface-1)', borderRadius: 14,
                        boxShadow: 'var(--shadow-card)',
                        overflow: 'hidden', display: 'flex',
                        marginBottom: 10, cursor: 'pointer'
                      }}
                    >
                      <div style={{ width: 5, background: color }} />
                      <div style={{ flex: 1, padding: '12px 14px' }}>
                        <div style={{ fontSize: 17, fontWeight: 700,
                                      color: 'var(--text-primary)' }}>
                          {cls.subject}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)',
                                      marginTop: 2 }}>
                          {cls.room} · {cls.lecturer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {/* Add extra period button */}
            <button
              onClick={() => setShowAdd(true)}
              style={{
                width: '100%', padding: 14,
                background: 'transparent', color: accent,
                border: `1px solid ${accent}80`,
                borderRadius: 14, fontSize: 14, fontWeight: 600,
                cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                gap: 6, fontFamily: 'inherit', marginTop: 16
              }}
            >
              <Plus size={18} /> Add Extra Period
            </button>
          </>
        )}
      </div>

      {/* Edit Dialog */}
      {editing && (
        <EditDialog
          entry={editing}
          accent={accent}
          onSave={async data => {
            await handleSaveClass(data);
            setEditing(null);
          }}
          onDelete={async () => {
            await handleDeleteClass(editing._id);
            setEditing(null);
          }}
          onDismiss={() => setEditing(null)}
        />
      )}

      {/* Add Extra Dialog */}
      {showAdd && (
        <AddExtraDialog
          dayOfWeek={selectedDay + 1}
          accent={accent}
          onSave={async data => {
            await handleSaveClass(data);
            setShowAdd(false);
          }}
          onDismiss={() => setShowAdd(false)}
        />
      )}

      {/* Reset Dialog */}
      {showReset && (
        <ConfirmDialog
          title="Reset timetable?"
          message="This restores the default Section-20 (N-408) timetable."
          accent={accent}
          onConfirm={async () => {
            await handleResetTimetable();
            setShowReset(false);
          }}
          onDismiss={() => setShowReset(false)}
        />
      )}
    </div>
  );
}

// ── Edit Dialog ───────────────────────────────────────────────────────────────
function EditDialog({ entry, accent, onSave, onDelete, onDismiss }) {
  const [subject,  setSubject]  = useState(entry.subject);
  const [room,     setRoom]     = useState(entry.room);
  const [lecturer, setLecturer] = useState(entry.lecturer);

  const inputStyle = {
    width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border-soft)',
    borderRadius: 12, padding: '12px 14px', fontSize: 14,
    color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit',
    marginBottom: 10
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--overlay-strong)',
      zIndex: 200, display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 20
    }}>
      <div style={{
        background: 'var(--surface-1)', borderRadius: 20,
        padding: 24, width: '100%', maxWidth: 380
      }}>
        <div style={{ fontSize: 18, fontWeight: 700,
                      color: 'var(--text-primary)', marginBottom: 16 }}>
          Edit P{entry.period} · {entry.subject}
        </div>
        <input style={inputStyle} placeholder="Subject"
          value={subject} onChange={e => setSubject(e.target.value)} />
        <input style={inputStyle} placeholder="Room"
          value={room} onChange={e => setRoom(e.target.value)} />
        <input style={inputStyle} placeholder="Lecturer"
          value={lecturer} onChange={e => setLecturer(e.target.value)} />
        <div style={{ display: 'flex', justifyContent: 'flex-end',
                      gap: 8, marginTop: 8 }}>
          <button onClick={onDelete}
            style={{ background: 'none', border: 'none', padding: '8px 14px',
                     borderRadius: 10, fontSize: 14, fontWeight: 600,
                     cursor: 'pointer', color: '#E74C3C',
                     fontFamily: 'inherit' }}>
            Delete
          </button>
          <button onClick={onDismiss}
            style={{ background: 'none', border: 'none', padding: '8px 14px',
                     borderRadius: 10, fontSize: 14, fontWeight: 600,
                     cursor: 'pointer', color: 'var(--text-secondary)',
                     fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button
            onClick={() => onSave({
              ...entry, subject, room, lecturer
            })}
            style={{ background: accent, border: 'none', padding: '8px 16px',
                     borderRadius: 10, fontSize: 14, fontWeight: 600,
                     cursor: 'pointer', color: 'white',
                     fontFamily: 'inherit' }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Add Extra Dialog ──────────────────────────────────────────────────────────
function AddExtraDialog({ dayOfWeek, accent, onSave, onDismiss }) {
  const [subject,  setSubject]  = useState('');
  const [room,     setRoom]     = useState('');
  const [lecturer, setLecturer] = useState('');
  const [timing,   setTiming]   = useState('');
  const [error,    setError]    = useState('');

  const inputStyle = {
    width: '100%', background: 'var(--input-bg)', border: '1px solid var(--border-soft)',
    borderRadius: 12, padding: '12px 14px', fontSize: 14,
    color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit',
    marginBottom: 10
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--overlay-strong)',
      zIndex: 200, display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 20
    }}>
      <div style={{
        background: 'var(--surface-1)', borderRadius: 20,
        padding: 24, width: '100%', maxWidth: 380
      }}>
        <div style={{ fontSize: 18, fontWeight: 700,
                      color: 'var(--text-primary)', marginBottom: 16 }}>
          Add Extra Period
        </div>
        {error && (
          <div style={{ fontSize: 12, color: '#E74C3C',
                        marginBottom: 10 }}>{error}</div>
        )}
        <input style={inputStyle} placeholder="Subject *"
          value={subject}
          onChange={e => { setSubject(e.target.value); setError(''); }} />
        <input style={inputStyle} placeholder="Timing (e.g. 3:20 – 4:10) *"
          value={timing}
          onChange={e => { setTiming(e.target.value); setError(''); }} />
        <input style={inputStyle} placeholder="Room *"
          value={room}
          onChange={e => { setRoom(e.target.value); setError(''); }} />
        <input style={inputStyle} placeholder="Lecturer *"
          value={lecturer}
          onChange={e => { setLecturer(e.target.value); setError(''); }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end',
                      gap: 8, marginTop: 8 }}>
          <button onClick={onDismiss}
            style={{ background: 'none', border: 'none', padding: '8px 14px',
                     borderRadius: 10, fontSize: 14, fontWeight: 600,
                     cursor: 'pointer', color: 'var(--text-secondary)',
                     fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button
            onClick={() => {
              if (!subject || !timing || !room || !lecturer) {
                setError('Please fill in all fields.');
                return;
              }
              onSave({
                dayOfWeek,
                period: 8,
                subject: subject.trim(),
                room: room.trim(),
                lecturer: `${timing.trim()} | ${lecturer.trim()}`
              });
            }}
            style={{ background: accent, border: 'none', padding: '8px 16px',
                     borderRadius: 10, fontSize: 14, fontWeight: 600,
                     cursor: 'pointer', color: 'white',
                     fontFamily: 'inherit' }}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Confirm Dialog ────────────────────────────────────────────────────────────
function ConfirmDialog({ title, message, accent, onConfirm, onDismiss }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--overlay-strong)',
      zIndex: 200, display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 20
    }}>
      <div style={{
        background: 'var(--surface-1)', borderRadius: 20,
        padding: 24, width: '100%', maxWidth: 380
      }}>
        <div style={{ fontSize: 18, fontWeight: 700,
                      color: 'var(--text-primary)', marginBottom: 8 }}>
          {title}
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)',
                      marginBottom: 20 }}>
          {message}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onDismiss}
            style={{ background: 'none', border: 'none', padding: '8px 14px',
                     borderRadius: 10, fontSize: 14, fontWeight: 600,
                     cursor: 'pointer', color: 'var(--text-secondary)',
                     fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button onClick={onConfirm}
            style={{ background: accent, border: 'none', padding: '8px 16px',
                     borderRadius: 10, fontSize: 14, fontWeight: 600,
                     cursor: 'pointer', color: 'white',
                     fontFamily: 'inherit' }}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
