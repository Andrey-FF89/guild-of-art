import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

export const instant = false;

export default async function CategoryPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params
  
  const works = await client.fetch(`*[_type == "work" && kind == $kind] | order(publishedAt desc){
    _id, title, slug, editorNote, body, "author": author->name
  }`, { kind })

  const titles: Record<string, string> = {
    poetry: 'Поэзия', prose: 'Проза', photo: 'Фотографии', painting: 'Живопись'
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12 text-pine tracking-tight">{titles[kind] || kind}</h1>
      
      {works.length === 0 ? (
        <p className="text-pine/60 text-lg">В этом разделе пока нет произведений.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((w: any) => (
            <Link key={w._id} href={`/work/${w.slug.current}`} className="group flex flex-col bg-pine-light/30 p-6 rounded-xl border border-pine/5 hover:border-sun/50 transition-colors">
              <h2 className="text-2xl font-bold text-pine group-hover:text-sun transition-colors mb-3 line-clamp-2">{w.title}</h2>
              
              {/* Логика вывода: Комментарий редактора > Текст произведения */}
              {w.editorNote ? (
                <div className="text-sm text-pine/80 italic mb-4 line-clamp-3 border-l-2 border-sun pl-3">
                  <span className="text-xs uppercase tracking-widest text-sun font-bold block not-italic mb-1">Комментарий редактора</span>
                  «{w.editorNote}»
                </div>
              ) : w.body ? (
                <div className="text-pine/70 italic mb-4 line-clamp-3">
                  {w.body.find((block: any) => block._type === 'block')?.children?.map((c: any) => c.text).join(' ') || ''}
                </div>
              ) : null}

              <div className="mt-auto pt-4 text-sm text-pine/60">{w.author}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}