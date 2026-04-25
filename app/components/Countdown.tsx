'use client'; // Это значит, что код работает на стороне пользователя
import { useState, useEffect } from 'react';

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center my-6">
      {[
        { label: 'Kun', value: timeLeft.days },
        { label: 'Soat', value: timeLeft.hours },
        { label: 'Min', value: timeLeft.mins },
        { label: 'Sek', value: timeLeft.secs },
      ].map((item) => (
        <div key={item.label} className="bg-slate-800 p-3 rounded-xl min-w-[70px] border border-slate-700">
          <div className="text-2xl font-black text-green-500 leading-none">{item.value}</div>
          <div className="text-[10px] uppercase text-slate-500 font-bold mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  );
}