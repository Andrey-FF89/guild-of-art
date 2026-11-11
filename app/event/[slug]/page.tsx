import { client } from '@/lib/sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const instant = false;

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Выводим в терминал, что именно мы ищем
  console.log("Ищем событие по адресу:", slug);

  const event = await client.fetch(`*[_type == "event" && (slug.current == $slug || _id == $slug)][0]{
    _id, title, date, description
  }`, { slug });

  // Выводим в терминал, что нашли
  console.log("Найдено событие:", event ? event.title : "НИЧЕГО НЕ НАЙДЕНО");

  if (!event) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-wave hover:text-sun transition-colors mb-8 inline-block">
        ← На главную
      </Link>
      
      <div className="text-center mb-12">
        <div className="text-sm text-sun font-bold mb-4 uppercase tracking-widest">
          {event.date ? new Date(event.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Дата не указана'}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-pine mb-6">{event.title}</h1>
      </div>

      <div className="prose prose-lg prose-pine mx-auto text-pine/80 leading-relaxed text-lg bg-pine-light/30 p-8 rounded-2xl border border-pine/5">
        <p>{event.description}</p>
      </div>
    </div>
  )
}