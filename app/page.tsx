'use client';
import { useState, useEffect } from 'react';
import { Trophy, Newspaper, ChartBar, MapPin } from 'lucide-react';

// Компонент Таймера
function Countdown() {
  const targetDate = "2026-06-15T21:00:00";
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 justify-center my-8">
      {[
        { label: 'Kun', value: timeLeft.days },
        { label: 'Soat', value: timeLeft.hours },
        { label: 'Min', value: timeLeft.mins },
        { label: 'Sek', value: timeLeft.secs },
      ].map((item) => (
        <div key={item.label} className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-2xl min-w-[80px] border border-slate-700 shadow-xl">
          <div className="text-3xl font-black text-green-500 leading-none">{item.value}</div>
          <div className="text-[10px] uppercase text-slate-500 font-bold mt-2 tracking-widest">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

// Компонент для получения новости
function LatestNews() {
  const [news, setNews] = useState('Yangiliklar yuklanmoqda...');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/get-news');
        const data = await res.json();
        // Если база пустая, выведем дефолтную фразу
        setNews(data.news || "Hozircha yangiliklar yo'q");
      } catch (e) {
        console.error("News fetch error:", e);
        setNews("Бот готов к приему сообщений!");
      }
    };
    fetchNews();
    const interval = setInterval(fetchNews, 5000); // Опрашиваем чаще для теста
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-blue-600/10 border border-blue-500/20 p-8 rounded-[40px] mb-12 backdrop-blur-md">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Newspaper className="text-blue-500 w-6 h-6" />
        <span className="text-blue-400 font-black uppercase italic text-sm tracking-[0.2em]">Tezkor Xabar</span>
      </div>
      <p className="text-2xl md:text-3xl font-bold italic text-white leading-tight text-center">
        "{news}"
      </p>
      <div className="mt-4 text-[10px] text-slate-500 uppercase font-black tracking-widest text-center opacity-50">
        — LIVE UPDATE FROM TELEGRAM —
      </div>
    </div>
  );
}

export default function Home() {
  const [vote, setVote] = useState<string | null>(null);

  useEffect(() => {
    const savedVote = localStorage.getItem('user_vote');
    if (savedVote) setVote(savedVote);
  }, []);

  const handleVote = (choice: string) => {
    setVote(choice);
    localStorage.setItem('user_vote', choice);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 selection:bg-green-500 selection:text-black">
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Trophy className="text-green-500 w-8 h-8 group-hover:rotate-12 transition-transform" />
            <span className="font-black text-2xl tracking-tighter italic uppercase">
              Futbol<span className="text-green-500">Uz</span>2026
            </span>
          </div>
          <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full font-bold text-xs transition-all shadow-lg shadow-green-900/40 active:scale-95">
            LIVE
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 pt-12">
        {/* Блок живых новостей */}
        <LatestNews />

        <section className="text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-2 rounded-full text-[10px] font-black mb-8 tracking-[0.3em] uppercase">
            Jahon Chempionati Debyuti
          </div>

          <h2 className="text-6xl md:text-9xl font-black mb-6 uppercase italic tracking-tighter leading-none">
            Tarixiy <span className="text-green-500 underline decoration-white/10 underline-offset-8">Onlar</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl mb-8 font-medium">O'zbekistonning ilk o'yiniga qoldi:</p>
          
          <Countdown />

          {/* Карточка матча */}
          <div className="bg-slate-900/40 border border-white/5 p-10 md:p-16 rounded-[60px] shadow-2xl max-w-4xl mx-auto relative overflow-hidden mt-16">
            <div className="flex flex-col md:flex-row justify-around items-center gap-12 relative z-10">
              <div className="text-center w-48">
                <div className="text-[120px] mb-6 drop-shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all">🇺🇿</div>
                <div className="font-black text-3xl uppercase tracking-tighter italic">O'zbekiston</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-6xl font-black italic text-white/10 mb-4 tracking-widest">VS</div>
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest bg-white/5 px-6 py-3 rounded-full border border-white/5">
                   <MapPin className="w-3 h-3 text-green-500" /> Mexico City
                </div>
              </div>

              <div className="text-center w-48">
                <div className="text-[120px] mb-6 drop-shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all">🇨🇴</div>
                <div className="font-black text-3xl uppercase tracking-tighter italic">Kolumbiya</div>
              </div>
            </div>

            {/* Блок голосования */}
            <div className="mt-20 pt-12 border-t border-white/5">
              <h4 className="text-slate-500 uppercase text-[10px] font-black tracking-[0.5em] mb-10">Sizning bashoratingiz?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                {['G\'alaba', 'Durang', 'Mag\'lubiyat'].map((choice) => (
                  <button 
                    key={choice}
                    onClick={() => handleVote(choice)}
                    className={`group relative overflow-hidden px-8 py-5 rounded-3xl font-black transition-all border-2 ${
                      vote === choice 
                      ? 'bg-green-600 border-green-400 text-white' 
                      : 'bg-slate-950 border-white/5 text-slate-500 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10 uppercase italic tracking-tighter">{choice}</span>
                  </button>
                ))}
              </div>
              {vote && (
                <div className="mt-8 text-green-500 font-black text-xs uppercase tracking-widest animate-bounce">
                  ✅ Ovoz kiritildi
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-24 border-t border-white/5 mt-20">
        <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.6em]">FutbolUz &copy; 2026 — Road to Glory</p>
      </footer>
    </div>
  );
}