/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { getPreferences, updatePreferences } from '../api/preferences';
import { getAssignments, addAssignment, updateAssignment, deleteAssignment } from '../api/assignments';
import { getTimetable, saveClass, deleteClass, resetTimetable } from '../api/timetable';

const AppContext = createContext();
const ACCENT_OPTIONS = {
  Purple: '#4B47D6', Blue: '#1565C0', Green: '#2E7D32',
  Orange: '#E65100', Pink: '#AD1457', Teal: '#00695C'
};

export const AppProvider = ({ children }) => {
  const [timetable, setTimetable]     = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [prefs, setPrefs]             = useState({
    studentName: '', sectionName: 'Section-20', roomName: 'N-408',
    darkMode: false, accentColor: 'Purple', notifEnabled: true
  });
  const [loading, setLoading] = useState(true);

  // Apply dark mode and accent color
  useEffect(() => {
    document.documentElement.classList.toggle('dark', prefs.darkMode);
    document.documentElement.style.setProperty(
      '--accent', ACCENT_OPTIONS[prefs.accentColor] || '#4B47D6'
    );
  }, [prefs.darkMode, prefs.accentColor]);

  // Load everything on mount
  useEffect(() => {
    const loadAll = async () => {
      try {
        const [ttRes, asRes, prRes] = await Promise.all([
          getTimetable(), getAssignments(), getPreferences()
        ]);
        setTimetable(ttRes.data);
        setAssignments(asRes.data);
        setPrefs(prRes.data);
      } catch (err) {
        console.error('Load error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  // Timetable actions
  const handleSaveClass = async (data) => {
    await saveClass(data);
    const res = await getTimetable();
    setTimetable(res.data);
  };

  const handleDeleteClass = async (id) => {
    await deleteClass(id);
    setTimetable(prev => prev.filter(c => c._id !== id));
  };

  const handleResetTimetable = async () => {
    const res = await resetTimetable();
    setTimetable(res.data);
  };

  // Assignment actions
  const handleAddAssignment = async (data) => {
    const res = await addAssignment(data);
    setAssignments(prev => [...prev, res.data]);
  };

  const handleUpdateAssignment = async (id, data) => {
    const res = await updateAssignment(id, data);
    setAssignments(prev => prev.map(a => a._id === id ? res.data : a));
  };

  const handleDeleteAssignment = async (id) => {
    await deleteAssignment(id);
    setAssignments(prev => prev.filter(a => a._id !== id));
  };

  // Preferences actions
  const handleUpdatePrefs = async (data) => {
    const res = await updatePreferences(data);
    setPrefs(res.data);
  };

  return (
    <AppContext.Provider value={{
      timetable, assignments, prefs, loading,
      handleSaveClass, handleDeleteClass, handleResetTimetable,
      handleAddAssignment, handleUpdateAssignment, handleDeleteAssignment,
      handleUpdatePrefs
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
