import { NavLink } from 'react-router-dom';
import { Home, Calendar, Bell, User } from 'lucide-react';

const tabs = [
  { to: '/dashboard',   icon: Home,     label: 'Home' },
  { to: '/timetable',   icon: Calendar, label: 'Timetable' },
  { to: '/assignments', icon: Bell,     label: 'Alerts' },
  { to: '/profile',     icon: User,     label: 'Profile' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `nav-item${isActive ? ' active' : ''}`
          }
        >
          <Icon size={22} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}