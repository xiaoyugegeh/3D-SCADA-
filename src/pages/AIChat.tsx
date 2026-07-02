// AI 智能问答页

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Bot, User, Sparkles } from 'lucide-react';
import { GlassButton } from '@/components/ui/GlassButton';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  time: string;
}

const SUGGESTIONS = [
  '当前仓库整体运行状态如何？',
  '哪些机器人需要充电？',
  '今日出库任务完成情况',
  '预测未来 2 小时入库高峰',
];

const MOCK_REPLIES: Record<string, string> = {
  '当前仓库整体运行状态如何？': '当前仓库运行平稳。15 台机器人中 3 台工作中、8 台充电中、4 台空闲；库位利用率约 78.6%，有 585 个异常库位待处理；充电桩空闲 2 个。',
  '哪些机器人需要充电？': 'AGV-010 电量 15%、AGV-015 电量 5%、AGV-009 电量 30%，建议优先调度至充电桩。',
  '今日出库任务完成情况': '今日已完成出库任务 156 单，当前执行中 8 单，失败 2 单（TASK-0023、TASK-0024），失败原因待人工复核。',
  '预测未来 2 小时入库高峰': '基于历史数据预测，未来 2 小时入库量将增长 35%，建议提前释放一层缓存区并增加 2 台 AGV 待命。',
};

function getReply(input: string) {
  const matched = Object.keys(MOCK_REPLIES).find((k) => input.includes(k));
  if (matched) return MOCK_REPLIES[matched];
  return `收到您的问题：“${input}”。作为智慧立库 AI 助手，我建议您查看数字孪生大屏的实时数据面板，或通过左侧菜单进入设备/任务页面进一步下钻分析。`;
}

export default function AIChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'ai',
      content: '您好，我是智慧立库 AI 助手。您可以询问仓库状态、设备告警、任务进度等问题。',
      time: new Date().toLocaleTimeString('zh-CN'),
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString('zh-CN'),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'ai',
        content: getReply(text),
        time: new Date().toLocaleTimeString('zh-CN'),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  }

  return (
    <div className="screen-bg flex h-screen flex-col p-6">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
        <header className="mb-4 flex items-center gap-4">
          <Link to="/" className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">AI 智能问答</h1>
            <p className="text-xs text-white/40">基于仓库实时数据的智能助手</p>
          </div>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel/40 backdrop-blur-md">
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === 'ai' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/10 text-white'}`}>
                  {msg.role === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'ai' ? 'bg-white/5 text-white/90' : 'bg-cyan-500/20 text-cyan-50'}`}>
                  {msg.content}
                  <div className={`mt-1 text-[10px] ${msg.role === 'ai' ? 'text-white/30' : 'text-cyan-200/50'}`}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/70 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  <Sparkles className="h-3 w-3" />
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入问题，例如：当前仓库状态如何？"
                className="h-10 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:outline-none"
              />
              <GlassButton type="submit" active className="px-4">
                <Send className="h-4 w-4" />
              </GlassButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
