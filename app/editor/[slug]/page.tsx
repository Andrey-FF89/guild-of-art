import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const instant = false;

export default async function EditorPage({ params }: { params: Promise<{ slug: string }> }) {
  // Ждем params
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Отладочный вывод в терминал
  console.log("Ищем редактора со слагом:", slug);

  const editor = await client.fetch(`*[_type == "editor" && slug.current == $slug][0]{
    _id, name, bio, photo,
    "works": *[_type == "work" && editor._ref == ^._id] | order(publishedAt desc){
      _id, title, slug, kind, images
    },
    "issues": *[_type == "issue" && editor._ref == ^._id] | order(_createdAt desc){
      _id, title, slug, number
    },
    "events": *[_type == "event" && editor._ref == ^._id] | order(date desc){
      _id, title, date
    }
  }`, { slug })

  console.log("Найден редактор:", editor ? editor.name : "НЕ НАЙДЕН");

  if (!editor) {
    console.log("Вызываем 404, так как editor === null");
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center gap-8 mb-16 border-b border-pine/10 pb-12">
        {editor.photo && (
          <div className="w-32 h-32 relative rounded-full overflow-hidden shrink-0 shadow-lg">
            <Image src={urlFor(editor.photo).width(300).height(300).url()} alt={editor.name} fill className="object-cover" />
          </div>
        )}
        <div>
          <h1 className="text-4xl font-bold text-pine mb-4">{editor.name}</h1>
          <p className="text-lg text-pine/70 leading-relaxed max-w-2xl">{editor.bio}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-pine mb-8">Произведения, добавленные редактором</h2>
      <div className="space-y-4 mb-16">
        {editor.works?.map((w: any) => (
          <Link key={w._id} href={`/work/${w.slug.current}`} className="group flex items-center justify-between p-6 bg-pine-light rounded-xl hover:bg-sun/10 transition-colors">
            <div>
              <span className="text-xs uppercase tracking-widest text-wave block mb-1">{w.kind}</span>
              <h3 className="text-xl font-bold text-pine group-hover:text-sun transition-colors">{w.title}</h3>
            </div>
            <span className="text-2xl text-pine/20 group-hover:text-sun transition-colors">→</span>
          </Link>
        ))}
        {(!editor.works || editor.works.length === 0) && <p className="text-pine/60">Этот редактор пока не добавил произведений.</p>}
      </div>

      {editor.issues && editor.issues.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-pine mb-8">Выпуски журнала</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {editor.issues.map((issue: any) => (
              <Link key={issue._id} href={`/journal/${issue.slug.current}`} className="p-6 bg-pine-light rounded-xl hover:bg-sun/10 transition-colors">
                <div className="text-sm text-sun font-bold mb-1">Выпуск {issue.number}</div>
                <h3 className="text-xl font-bold text-pine">{issue.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {editor.events && editor.events.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-pine mb-8">События</h2>
          <div className="space-y-4">
            {editor.events.map((event: any) => (
              <div key={event._id} className="p-6 bg-pine-light/50 rounded-xl border border-pine/10">
                <h3 className="text-xl font-bold text-pine">{event.title}</h3>
                <p className="text-sm text-pine/60">{new Date(event.date).toLocaleDateString('ru-RU')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}