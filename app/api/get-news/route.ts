import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic'; // Чтобы новости обновлялись сразу

export async function GET() {
  try {
    const news = await kv.get('latest_news');
    return NextResponse.json({ news: news || "Hozircha yangiliklar yo'q" });
  } catch (error) {
    return NextResponse.json({ news: "Xatolik yuz berdi" }, { status: 500 });
  }
}