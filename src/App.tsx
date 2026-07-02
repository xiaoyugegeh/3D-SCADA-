import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Devices from '@/pages/Devices';
import Tasks from '@/pages/Tasks';
import AIChat from '@/pages/AIChat';
import Reports from '@/pages/Reports';
import { LayoutDashboard, Cpu, ListTodo, MessageSquare, FileText, LogOut } from 'lucide-react';

const navItems = [
  { path: '/', label: '大屏', icon: LayoutDashboard },
  { path: '/devices', label: '设备', icon: Cpu },
  { path: '/tasks', label: '任务', icon: ListTodo },
  { path: '/ai-chat', label: 'AI 问答', icon: MessageSquare },
  { path: '/reports', label: '报表', icon: FileText },
];

function SideNav() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  if (isLogin) return null;

  return (
    <nav className="fixed left-0 top-1/2 z-30 -translate-y-1/2 rounded-r-xl border border-white/10 border-l-0 bg-[#050d24]/90 py-3 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center gap-3 px-4 py-3 transition-all ${
                active ? 'text-cyan-300' : 'text-white/50 hover:text-white'
              }`}
            >
              {active && <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-cyan-400" />}
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
        <Link
          to="/login"
          className="mt-2 flex items-center gap-3 border-t border-white/10 px-4 py-3 text-white/40 transition-colors hover:text-red-300"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-xs font-medium">退出</span>
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <SideNav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}
