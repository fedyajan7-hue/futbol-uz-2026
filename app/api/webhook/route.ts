import { NextResponse } from 'next/server';
import { kv } from '@vercel_kv'; // Эта библиотека будет работать с базой из Шага 1

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Если ты написал боту текст, он сохранится в базу
    if (body.message && body.message.text) {
      const text = body.message.text;
      
      // Сохраняем текст сообщения как "последнюю новость"
      await kv.set('latest_news', text);
      
      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error('Ошибка вебхука:', error);
  }
  
  return NextResponse.json({ ok: false });
}