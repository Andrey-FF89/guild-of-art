import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import SeaAttributes from '@/components/SeaAttributes'

const socials = [
  { name: 'TikTok', url: 'https://www.tiktok.com/@artguildia?_r=1&_t=ZS-95wlnZWtZrB' },
  { name: 'Telegram', url: 'https://t.me/guild_of_art' },
  { name: 'Threads', url: 'https://www.threads.com/@_guild_of_art_?igshid=NTc4MTIwNjQ2YQ==' },
  { name: 'Чат', url: 'https://t.me/guild_of_art_chat' },
]

async function getData() {
  "use cache";
  const works = await client.fetch(`*[_type == "work"] | order(publishedAt desc)[0...3]{ _id, title, slug, kind, editorNote, body, "author": author->name }`)
  const events = await client.fetch(`*[_type == "event"] | order(date asc)[0...2]{ _id, title, date, description, slug }`)
  return { works, events }
}

export default async function Home() {
  const { works, events } = await getData()

  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-pine-light/20 to-wave/10 -z-10"></div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-pine tracking-tight">
          Приветствуем вас <br className="hidden md:block"/> на причале Гильдии искусства!
        </h1>
        
        <p className="text-lg md:text-xl text-pine/80 max-w-3xl mx-auto leading-relaxed mb-8">
          Мы – творческое объединение, где встречаются поэты и прозаики, художники и фотографы, музыканты и рассказчики. 
          Наш курс – творческий горизонт возможностей, к которому хочется держать путь. <br/>
          <span className="font-semibold text-wave">Мы про свободу, даль и попутное движение.</span>
        </p>

        <SeaAttributes />

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {socials.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full border border-pine/20 text-sm font-medium text-pine hover:border-sun hover:text-sun transition-colors">
              {s.name}
            </a>
          ))}
        </div>
      </section>

      {/* Блок Новое на сайте */}
      <section className="max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-pine">Новое на сайте</h2>
          <Link href="/journal" className="text-wave text-sm hover:text-sun font-medium">Смотреть журнал →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {works.map((w: any) => (
            <Link key={w._id} href={`/work/${w.slug.current}`} className="group flex flex-col bg-white p-6 rounded-xl border border-pine/5 hover:border-sun/50 transition-colors">
              <span className="text-xs uppercase tracking-widest text-wave mb-3 block">{w.kind}</span>
              <h3 className="text-xl font-bold text-pine group-hover:text-sun transition-colors mb-3 line-clamp-2">{w.title}</h3>
              
              {w.editorNote ? (
                <div className="text-sm text-pine/80 italic mb-4 line-clamp-3 border-l-2 border-sun pl-3">
                  <span className="text-xs uppercase tracking-widest text-sun font-bold block not-italic mb-1">Комментарий редактора</span>
                  «{w.editorNote}»
                </div>
              ) : w.body ? (
                <div className="text-sm text-pine/70 italic mb-4 line-clamp-3">
                  {w.body.find((block: any) => block._type === 'block')?.children?.map((c: any) => c.text).join(' ') || ''}
                </div>
              ) : null}

              <div className="mt-auto pt-4 text-sm text-pine/60">{w.author}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Блок Событий */}
      {events.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12 w-full">
          <h2 className="text-2xl font-bold text-pine mb-8">Актуальные события</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((e: any) => (
              <Link 
                key={e._id} 
                href={`/event/${e.slug?.current || e._id}`} 
                className="group bg-white p-6 rounded-xl border border-pine/10 hover:border-sun/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm text-sun font-bold mb-2">
                    {e.date ? new Date(e.date).toLocaleDateString('ru-RU') : 'Дата не указана'}
                  </div>
                  <h3 className="text-xl font-bold text-pine group-hover:text-sun transition-colors mb-2">{e.title}</h3>
                  <p className="text-pine/70 line-clamp-2">{e.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ПОДВАЛ */}
      <footer className="bg-pine text-pine-light mt-auto py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-white">Гильдия Искусства</h3>
            <p className="text-pine-light/60 max-w-md">
              Творческое объединение вольных авторов. Публикуем лучшее по выбору редакции. 
              Наш курс — творческий горизонт.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-sun">Связь с нами</h4>
            <ul className="space-y-2 text-pine-light/80">
              <li><a href="https://t.me/guild_of_art" target="_blank" className="hover:text-sun transition-colors">Telegram-канал</a></li>
              <li><a href="https://t.me/guild_of_art_chat" target="_blank" className="hover:text-sun transition-colors">Чат Гильдии</a></li>
              <li><a href="mailto:info@guild-of-arts.ru" className="hover:text-sun transition-colors">info@guild-of-arts.ru</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-pine-light/10 text-sm text-pine-light/40 text-center">
          © 2026 Гильдия Искусства. Все права защищены.
        </div>
      </footer>
    </div>
  )
}