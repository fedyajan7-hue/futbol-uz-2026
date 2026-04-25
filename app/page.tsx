'use client';
import { useState, useEffect } from 'react';
import { Trophy, Bell, Newspaper, ChartBar, Calendar, MapPin } from 'lucide-react';

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

// Компонент для получения новости из Telegram бота
function LatestNews() {
  const [news, setNews] = useState('Yangiliklar yuklanmoqda...');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/get-news');
        const data = await res.json();
        if (data.news) setNews(data.news);
      } catch (e) {
        setNews("Hozircha yangiliklar yo'q");
      }
    };
    fetchNews();
    const interval = setInterval(fetchNews, 10000); // Проверка каждые 10 секунд
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl mb-12 backdrop-blur-sm">
      <div className="flex items-center justify-center gap-3 mb-3">
        <Newspaper className="text-blue-500 w-5 h-5" />
        <span className="text-blue-400 font-black uppercase italic text-sm tracking-widest">Tezkor Xabar</span>
      </div>
      <p className="text-xl md:text-2xl font-bold italic text-white leading-tight text-center">
        "{news}"
      </p>
      <div className="mt-3 text-[10px] text-slate-500 uppercase font-black tracking-widest text-center">
        — Telegram orqali yuborildi
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* Навигация */}
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Trophy className="text-green-500 w-8 h-8 group-hover:rotate-12 transition-transform" />
            <span className="font-black text-2xl tracking-tighter italic uppercase">
              Futbol<span className="text-green-500">Uz</span>2026
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full font-bold text-xs transition-all shadow-lg shadow-green-900/20">
              LIVE
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        {/* БЛОК ЖИВЫХ НОВОСТЕЙ */}
        <LatestNews />

        <section className="py-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-1.5 rounded-full text-xs font-black mb-8 tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Jahon Chempionati Debyuti
          </div>

          <h2 className="text-5xl md:text-8xl font-black mb-4 uppercase italic tracking-tighter leading-none">
            Tarixiy <span className="text-green-500">Onlar</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl mb-4">O'zbekiston milliy terma jamoasining ilk o'yiniga qoldi:</p>
          
          <Countdown />

          {/* Карточка матча */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-800 p-8 md:p-12 rounded-[50px] shadow-2xl max-w-4xl mx-auto relative overflow-hidden mt-10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
            
            <div className="flex flex-col md:flex-row justify-around items-center gap-8 relative z-10">
              <div className="text-center group w-40">
                <div className="text-[100px] mb-4 drop-shadow-2xl">🇺🇿</div>
                <div className="font-black text-2xl uppercase tracking-tighter">O'zbekiston</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-5xl font-black italic text-slate-700/50 mb-2 tracking-widest underline decoration-green-500/30 decoration-4 underline-offset-8">VS</div>
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-[0.3em] bg-slate-950/50 px-4 py-2 rounded-full">
                   <MapPin className="w-3 h-3" /> Mexico City
                </div>
              </div>

              <div className="text-center group w-40">
                <div className="text-[100px] mb-4 drop-shadow-2xl">🇨🇴</div>
                <div className="font-black text-2xl uppercase tracking-tighter">Kolumbiya</div>
              </div>
            </div>

            {/* Блок голосования */}
            <div className="mt-16 pt-10 border-t border-slate-800">
              <h4 className="text-slate-400 uppercase text-xs font-black tracking-[0.4em] mb-8">Sizning bashoratingiz?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {['G\'alaba', 'Durang', 'Mag\'lubiyat'].map((choice) => (
                  <button 
                    key={choice}
                    onClick={() => handleVote(choice)}
                    className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-black transition-all border-2 ${
                      vote === choice 
                      ? 'bg-green-600 border-green-400 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                      : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                    }`}
                  >
                    <span className="relative z-10">{choice}</span>
                    {vote === choice && <span className="absolute inset-0 bg-white/10 animate-pulse"></span>}
                  </button>
                ))}
              </div>
              {vote && (
                <div className="mt-6 text-green-500 font-bold animate-fade-in text-sm flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                  Rahmat! Sizning ovozingiz tizimga kiritildi ✅
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Секция AI и доп. контента */}
        <section className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[32px] group hover:bg-slate-900 transition-colors">
            <div className="bg-green-600/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ChartBar className="text-green-500 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-3 italic uppercase tracking-tighter">AI-Bashorat</h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              Sun'iy intellekt tahliliga ko'ra, O'zbekistonning bu bahsda g'alaba qozonish ehtimoli 
              <span className="text-green-500 font-bold"> 38%</span>. Durang natija esa 
              <span className="text-slate-300 font-bold"> 24%</span>ni tashkil etmoqda.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[32px] group hover:bg-slate-900 transition-colors">
            <div className="bg-blue-600/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Newspaper className="text-blue-500 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black mb-3 italic uppercase tracking-tighter">Arxiv</h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              O'zbekiston futboli tarixidagi eng muhim yangiliklar va debyutga tayyorgarlik jarayonlari shu yerda saqlanadi.
            </p>
          </div>
        </section>
      </main>

      <footer className="text-center py-20 text-slate-700">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">FutbolUz &copy; 2026 - O'zbekiston birinchi marta Jahon Chempionatida!</p>
      </footer>
    </div>
  );
}