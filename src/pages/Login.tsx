// 登录页

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Warehouse, User, Lock, Eye, EyeOff } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';
import type { UserRole } from '@/types';

const ROLES: UserRole[] = [
  { id: 'manager', name: 'manager', label: '运营经理' },
  { id: 'engineer', name: 'engineer', label: '运维工程师' },
  { id: 'dispatcher', name: 'dispatcher', label: '调度员' },
  { id: 'guest', name: 'guest', label: '演示账号' },
];

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>('manager');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('role', role);
      localStorage.setItem('user', username);
      navigate('/');
      setLoading(false);
    }, 600);
  }

  return (
    <div className="screen-bg flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-panel/70 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 shadow-[0_0_24px_rgba(0,210,255,0.4)]">
            <Warehouse className="h-8 w-8 text-cyan-300" />
          </div>
          <h1 className="title-glow text-2xl font-black text-white">智慧立库</h1>
          <p className="mt-1 text-sm text-white/50">3D SCADA 数字孪生平台</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs text-white/60">选择角色</label>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <GlassButton
                  key={r.id}
                  type="button"
                  active={role === r.id}
                  onClick={() => setRole(r.id)}
                  className="justify-start"
                >
                  <User className="h-3.5 w-3.5" />
                  {r.label}
                </GlassButton>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-white/60">账号</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10 w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 text-sm text-white focus:border-cyan-500/50 focus:outline-none"
                placeholder="请输入账号"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-white/60">密码</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-10 text-sm text-white focus:border-cyan-500/50 focus:outline-none"
                placeholder="请输入密码"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
              >
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <GlassButton
            type="submit"
            active
            className="h-11 w-full text-sm font-bold"
          >
            {loading ? '登录中...' : '登 录'}
          </GlassButton>
        </form>

        <p className="mt-6 text-center text-xs text-white/30">演示环境任意账号密码均可登录</p>
      </div>
    </div>
  );
}
