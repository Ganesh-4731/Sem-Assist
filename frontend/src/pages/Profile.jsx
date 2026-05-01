import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, User, Users, DoorOpen,
         Moon, Sun, Palette, Bell, Info } from 'lucide-react';

const ACCENT_OPTIONS = {
  Purple: '#4B47D6', Blue: '#1565C0', Green: '#2E7D32',
  Orange: '#E65100', Pink: '#AD1457', Teal: '#00695C'
};

export default function Profile() {
  const { prefs, handleUpdatePrefs } = useApp();
  const [editing, setEditing] = useState(null);
  const [tempVal, setTempVal] = useState('');

  const accent = ACCENT_OPTIONS[prefs.accentColor] || '#4B47D6';

  const initial = prefs.studentName
    ? prefs.studentName[0].toUpperCase() : '?';

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--page-bg)', paddingBottom: 80,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>

      {/* Avatar header */}
      <div style={{
        background: 'var(--surface-1)', padding: '20px',
        borderBottom: '0.5px solid var(--border-soft)',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: accent, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: 30, fontWeight: 700, color: 'white'
        }}>
          {initial}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700,
                      color: 'var(--text-primary)', marginTop: 10 }}>
          {prefs.studentName || 'Set your name'}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
          {prefs.sectionName} · {prefs.roomName}
        </div>
      </div>

      {/* Profile section */}
      <SectionTitle text="PROFILE" />
      <SettingsCard>
        <SettingsRow
          icon={<User size={18} color={accent} />}
          label="Student name"
          value={prefs.studentName || 'Not set'}
          accent={accent}
          onClick={() => { setTempVal(prefs.studentName); setEditing('name'); }}
        />
        <SettingsDivider />
        <SettingsRow
          icon={<Users size={18} color={accent} />}
          label="Section"
          value={prefs.sectionName}
          accent={accent}
          onClick={() => { setTempVal(prefs.sectionName); setEditing('section'); }}
        />
        <SettingsDivider />
        <SettingsRow
          icon={<DoorOpen size={18} color={accent} />}
          label="Room"
          value={prefs.roomName}
          accent={accent}
          onClick={() => { setTempVal(prefs.roomName); setEditing('room'); }}
        />
      </SettingsCard>

      {/* Appearance section */}
      <SectionTitle text="APPEARANCE" />
      <SettingsCard>
        {/* Dark mode */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 16px'
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: accent + '20', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}>
            {prefs.darkMode
              ? <Moon size={18} color={accent} />
              : <Sun size={18} color={accent} />
            }
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>
              Dark mode
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {prefs.darkMode ? 'On' : 'Off'}
            </div>
          </div>
          <Toggle
            checked={prefs.darkMode}
            accent={accent}
            onChange={v => handleUpdatePrefs({ darkMode: v })}
          />
        </div>

        <SettingsDivider />

        {/* Accent color */}
        <div style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14,
                        marginBottom: 14 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: accent + '20', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}>
              <Palette size={18} color={accent} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>
              Accent color
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap',
                        paddingLeft: 50 }}>
            {Object.entries(ACCENT_OPTIONS).map(([name, color]) => {
              const isSelected = name === prefs.accentColor;
              return (
                <div
                  key={name}
                  onClick={() => handleUpdatePrefs({ accentColor: name })}
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: color, cursor: 'pointer',
                    border: isSelected ? `3px solid white` : '3px solid transparent',
                    outline: isSelected ? `3px solid ${color}` : 'none',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.15s'
                  }}
                />
              );
            })}
          </div>
        </div>
      </SettingsCard>

      {/* Notifications */}
      <SectionTitle text="NOTIFICATIONS" />
      <SettingsCard>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 16px'
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: accent + '20', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}>
            <Bell size={18} color={accent} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>
              Assignment reminders
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Get nudged before due dates
            </div>
          </div>
          <Toggle
            checked={prefs.notifEnabled}
            accent={accent}
            onChange={v => handleUpdatePrefs({ notifEnabled: v })}
          />
        </div>
      </SettingsCard>

      {/* About */}
      <SectionTitle text="ABOUT" />
      <SettingsCard>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '14px 16px'
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: accent + '20', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}>
            <Info size={18} color={accent} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>
              SemAssist Web
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Version 1.0.0</div>
          </div>
        </div>
      </SettingsCard>

      {/* Edit dialogs */}
      {editing && (
        <EditFieldDialog
          label={
            editing === 'name'    ? 'Student name' :
            editing === 'section' ? 'Section' : 'Room'
          }
          value={tempVal}
          accent={accent}
          onSave={val => {
            if (editing === 'name')    handleUpdatePrefs({ studentName: val });
            if (editing === 'section') handleUpdatePrefs({ sectionName: val });
            if (editing === 'room')    handleUpdatePrefs({ roomName: val });
            setEditing(null);
          }}
          onDismiss={() => setEditing(null)}
        />
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function SectionTitle({ text }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px',
                  color: 'var(--text-secondary)', padding: '16px 20px 6px' }}>
      {text}
    </div>
  );
}

function SettingsCard({ children }) {
  return (
    <div style={{
      background: 'var(--surface-1)', borderRadius: 16,
      boxShadow: 'var(--shadow-card)',
      margin: '0 16px', overflow: 'hidden'
    }}>
      {children}
    </div>
  );
}

function SettingsDivider() {
  return (
    <div style={{
      height: 0.5, background: 'var(--border-soft)', margin: '0 16px'
    }} />
  );
}

function SettingsRow({ icon, label, value, accent, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 16px', cursor: 'pointer'
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: accent + '20', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>
          {label}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{value}</div>
      </div>
      <ChevronRight size={18} color="#CCC" />
    </div>
  );
}

function Toggle({ checked, accent, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 46, height: 26, borderRadius: 26,
        background: checked ? accent : '#E0E0E0',
        position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s', flexShrink: 0
      }}
    >
      <div style={{
        position: 'absolute',
        width: 20, height: 20,
        borderRadius: '50%', background: 'white',
        top: 3,
        left: checked ? 23 : 3,
        transition: 'left 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
      }} />
    </div>
  );
}

function EditFieldDialog({ label, value, accent, onSave, onDismiss }) {
  const [val, setVal] = useState(value);
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
          Edit {label}
        </div>
        <input
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder={label}
          style={{
            width: '100%', background: 'var(--input-bg)',
            border: '1px solid var(--border-soft)', borderRadius: 12,
            padding: '12px 14px', fontSize: 14,
            color: 'var(--text-primary)', outline: 'none',
            fontFamily: 'inherit', marginBottom: 16
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onDismiss}
            style={{ background: 'none', border: 'none', padding: '8px 14px',
                     borderRadius: 10, fontSize: 14, fontWeight: 600,
                     cursor: 'pointer', color: 'var(--text-secondary)', fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button onClick={() => onSave(val.trim())}
            style={{ background: accent, border: 'none', padding: '8px 16px',
                     borderRadius: 10, fontSize: 14, fontWeight: 600,
                     cursor: 'pointer', color: 'white', fontFamily: 'inherit' }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
