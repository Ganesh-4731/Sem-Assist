import { useState } from 'react';
import { X } from 'lucide-react';

const SUBJECTS = [
  'DAA','OS','UI/UX','FSD','P&S','COA','FP','UHV','Training'
];

export default function AddAssignmentModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    subject: SUBJECTS[0], title: '', description: '',
    day: '', month: '', year: new Date().getFullYear().toString()
  });
  const [error, setError] = useState('');
  const accent = '#4B47D6';

  const inputStyle = {
    width: '100%', background: 'var(--input-bg)',
    border: '1px solid var(--border-soft)', borderRadius: 12,
    padding: '12px 14px', fontSize: 14, color: 'var(--text-primary)',
    outline: 'none', fontFamily: 'inherit'
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.day || !form.month || !form.year) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const date = new Date(
        Number(form.year), Number(form.month) - 1, Number(form.day)
      );
      if (isNaN(date.getTime())) throw new Error();
      onSave({
        subject: form.subject, title: form.title.trim(),
        description: form.description.trim(),
        dueDateMillis: date.getTime(), isCompleted: false
      });
    } catch {
      setError('Please enter a valid date.');
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--overlay-strong)',
      zIndex: 200, display: 'flex', alignItems: 'flex-end',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'var(--surface-1)', width: '100%', maxWidth: 430,
        borderRadius: '24px 24px 0 0', padding: 24,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            Add Assignment
          </div>
          <button onClick={onClose}
            style={{ background: 'none', border: 'none',
                     cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={22} />
          </button>
        </div>

        {error && (
          <div style={{ fontSize: 12, color: '#E74C3C',
                        marginBottom: 10 }}>{error}</div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <select style={inputStyle} value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <input style={inputStyle} placeholder="Assignment title *"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} />

          <textarea style={{ ...inputStyle, resize: 'none' }}
            placeholder="Description (optional)" rows={2}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} />

          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)',
                          marginBottom: 6 }}>Due date *</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { key: 'day',   placeholder: 'DD',   max: 2 },
                { key: 'month', placeholder: 'MM',   max: 2 },
                { key: 'year',  placeholder: 'YYYY', max: 4 },
              ].map(({ key, placeholder, max }) => (
                <input key={key}
                  style={{ ...inputStyle, textAlign: 'center', flex: 1 }}
                  placeholder={placeholder} value={form[key]}
                  maxLength={max}
                  onChange={e => setForm({
                    ...form, [key]: e.target.value.replace(/\D/g, '')
                  })} />
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            style={{
              width: '100%', padding: 14, background: accent,
              color: 'white', border: 'none', borderRadius: 14,
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'inherit'
            }}>
            Save Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
