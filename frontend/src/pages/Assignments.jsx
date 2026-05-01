import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react';

const SUBJECT_COLORS = {
  DAA: '#4B47D6', OS: '#2ECC71', 'UI/UX': '#E85D26',
  FSD: '#3498DB', 'P&S': '#9B59B6', COA: '#1ABC9C',
  FP: '#E74C3C', UHV: '#F39C12', Training: '#95A5A6'
};

function subjectColor(s) { return SUBJECT_COLORS[s] || '#607D8B'; }

export default function Assignments() {
  const { assignments, handleUpdateAssignment, handleDeleteAssignment } = useApp();
  const [completedOpen, setCompletedOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const accent = '#4B47D6';

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => window.clearInterval(timerId);
  }, []);

  const active    = assignments.filter(a => !a.isCompleted);
  const completed = assignments.filter(a =>  a.isCompleted);
  const overdue   = active.filter(a => a.dueDateMillis < now);
  const upcoming  = active.filter(a => a.dueDateMillis >= now);
  const bySubject = upcoming.reduce((acc, a) => {
    if (!acc[a.subject]) acc[a.subject] = [];
    acc[a.subject].push(a);
    return acc;
  }, {});

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
        <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
          Assignments
        </div>
        <div style={{
          fontSize: 11, fontWeight: 500, letterSpacing: '1px', marginTop: 2,
          color: overdue.length > 0 ? '#E74C3C' : '#666'
        }}>
          {active.length} ACTIVE · {overdue.length} OVERDUE · {completed.length} DONE
        </div>
      </div>

      {assignments.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      padding: '80px 20px', gap: 10 }}>
          <div style={{ fontSize: 40 }}>✅</div>
          <div style={{ fontSize: 16, color: 'var(--text-secondary)' }}>No assignments yet</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Add one from the Dashboard
          </div>
        </div>
      ) : (
        <div style={{ paddingTop: 12 }}>

          {/* Overdue */}
          {overdue.length > 0 && (
            <>
              <SectionLabel text="OVERDUE" color="#E74C3C" />
              {overdue.map(a => (
                <AssignmentCard
                  key={a._id} assignment={a} now={now}
                  showActions accent={accent}
                  onComplete={() => handleUpdateAssignment(
                    a._id, { isCompleted: true }
                  )}
                  onDelete={() => handleDeleteAssignment(a._id)}
                />
              ))}
            </>
          )}

          {/* Upcoming by subject */}
          {upcoming.length > 0 && (
            <>
              <SectionLabel text="UPCOMING" color={accent} />
              {Object.entries(bySubject)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([subject, list]) => (
                  <div key={subject}>
                    <SubjectLabel subject={subject} />
                    {list
                      .sort((a, b) => a.dueDateMillis - b.dueDateMillis)
                      .map(a => (
                        <AssignmentCard
                          key={a._id} assignment={a} now={now}
                          showActions accent={accent}
                          onComplete={() => handleUpdateAssignment(
                            a._id, { isCompleted: true }
                          )}
                          onDelete={() => handleDeleteAssignment(a._id)}
                        />
                      ))
                    }
                  </div>
                ))
              }
            </>
          )}

          {/* Completed */}
          {completed.length > 0 && (
            <>
              <div
                onClick={() => setCompletedOpen(o => !o)}
                style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '12px 20px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700,
                               letterSpacing: '1.5px', color: '#2ECC71' }}>
                  COMPLETED ({completed.length})
                </span>
                {completedOpen
                  ? <ChevronUp size={18} color="#2ECC71" />
                  : <ChevronDown size={18} color="#2ECC71" />
                }
              </div>
              {completedOpen && completed.map(a => (
                <AssignmentCard
                  key={a._id} assignment={a} now={now}
                  isCompleted accent={accent}
                  onUncomplete={() => handleUpdateAssignment(
                    a._id, { isCompleted: false }
                  )}
                  onDelete={() => handleDeleteAssignment(a._id)}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function SectionLabel({ text, color }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px',
                  color, padding: '0 20px', marginBottom: 10 }}>
      {text}
    </div>
  );
}

function SubjectLabel({ subject }) {
  const color = subjectColor(subject);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8,
                  padding: '4px 16px', marginBottom: 4 }}>
      <div style={{ width: 8, height: 8, borderRadius: 2,
                    background: color }} />
      <span style={{ fontSize: 12, fontWeight: 700,
                     letterSpacing: '0.5px', color }}>
        {subject}
      </span>
    </div>
  );
}

function AssignmentCard({
  assignment, now, showActions, isCompleted,
  accent, onComplete, onUncomplete, onDelete
}) {
  const due      = assignment.dueDateMillis;
  const daysLeft = Math.ceil((due - now) / 86400000);
  const isOver   = daysLeft < 0;

  const urgencyColor = isCompleted ? '#2ECC71'
    : isOver       ? '#E74C3C'
    : daysLeft === 0 ? '#E74C3C'
    : daysLeft <= 1  ? '#E85D26'
    : daysLeft <= 3  ? '#F39C12'
    : '#2ECC71';

  const badgeText = isCompleted ? 'Submitted'
    : isOver         ? `${-daysLeft}d overdue`
    : daysLeft === 0 ? 'Due today'
    : daysLeft === 1 ? 'Tomorrow'
    : `${daysLeft}d left`;

  const dueDateStr = new Date(due).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div style={{
      background: isCompleted ? 'var(--surface-2)' : 'var(--surface-1)',
      borderRadius: 16,
      boxShadow: isCompleted ? 'none' : 'var(--shadow-card)',
      overflow: 'hidden', display: 'flex',
      margin: '0 16px 10px'
    }}>
      <div style={{
        width: 5, flexShrink: 0,
        background: urgencyColor, minHeight: 72
      }} />
      <div style={{ flex: 1, padding: '12px 14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', gap: 8 }}>
          <div style={{
            fontSize: 15, fontWeight: isCompleted ? 400 : 600,
            color: isCompleted ? 'var(--text-secondary)' : 'var(--text-primary)', flex: 1
          }}>
            {assignment.title}
          </div>
          <div style={{
            padding: '4px 8px', borderRadius: 8,
            background: urgencyColor + '20',
            fontSize: 11, fontWeight: 700,
            color: urgencyColor, whiteSpace: 'nowrap', flexShrink: 0
          }}>
            {badgeText}
          </div>
        </div>

        {assignment.description && (
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            {assignment.description}
          </div>
        )}
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
          Due {dueDateStr}
        </div>

        {/* Action buttons */}
        {showActions && (
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button
              onClick={onComplete}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '6px 12px', borderRadius: 8,
                background: '#2ECC7120', border: 'none',
                fontSize: 12, fontWeight: 500, color: '#2ECC71',
                cursor: 'pointer', fontFamily: 'inherit'
              }}
            >
              <Check size={14} /> Submitted
            </button>
            <button
              onClick={onDelete}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '6px 12px', borderRadius: 8,
                background: '#E74C3C15', border: 'none',
                fontSize: 12, fontWeight: 500, color: '#E74C3C',
                cursor: 'pointer', fontFamily: 'inherit'
              }}
            >
              <X size={14} /> Remove
            </button>
          </div>
        )}

        {/* Completed undo */}
        {isCompleted && (
          <button
            onClick={onUncomplete}
            style={{
              background: 'none', border: 'none', padding: 0,
              fontSize: 11, color: accent, cursor: 'pointer',
              textDecoration: 'underline', marginTop: 6,
              fontFamily: 'inherit'
            }}
          >
            Mark as incomplete
          </button>
        )}
      </div>
    </div>
  );
}
