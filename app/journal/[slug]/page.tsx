import { client } from '@/lib/sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

export const instant = false;

export default async function IssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const issue = await client.fetch(`*[_type == "issue" && slug.current == $slug][0]{
    _id, number, title, description, contents, cover,
    "editor": editor->{ name },
    "works": works[]->{ _id, title, slug, kind, editorNote, body, "author": author->name }
  }`, { slug })

  if (!issue) notFound()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <div className="text-sm text-sun font-bold mb-4 uppercase tracking-widest">Выпуск {issue.number}</div>
        <h1 className="text-5xl font-bold text-pine mb-6">{issue.title}</h1>
        <p className="text-xl text-pine/70 max-w-2xl mx-auto mb-4">{issue.description}</p>
        {issue.editor && (
          <p className="text-sm text-pine/50">Редактор выпуска: {issue.editor.name}</p>
        )}
      </div>

      {/* Блок "О выпуске" (бывшее Содержание) */}
      {issue.contents && (
        <div className="prose prose-pine mx-auto mb-16 text-pine/80 border-l-2 border-sun pl-6">
          <h3 className="text-xl font-bold mb-4">О выпуске</h3>
          <PortableText value={issue.contents} />
        </div>
      )}

      <div className="space-y-6">
        {issue.works?.map((w: any) => (
          <Link key={w._id} href={`/work/${w.slug.current}`} className="group flex flex-col bg-pine-light/30 p-6 rounded-xl border border-pine/5 hover:border-sun/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-wave block">{w.kind}</span>
              <span className="text-sm text-pine/60">{w.author}</span>
            </div>
            
            <h2 className="text-2xl font-bold text-pine group-hover:text-sun transition-colors mb-3">{w.title}</h2>
            
            {/* Логика вывода: Комментарий редактора > Текст произведения */}
            {w.editorNote ? (
              <div className="text-sm text-pine/80 italic mt-2 border-l-2 border-sun pl-3">
                <span className="text-xs uppercase tracking-widest text-sun font-bold block not-italic mb-1">Комментарий редактора</span>
                «{w.editorNote}»
              </div>
            ) : w.body ? (
              <div className="text-sm text-pine/70 italic mt-2 line-clamp-3">
                {w.body.find((block: any) => block._type === 'block')?.children?.map((c: any) => c.text).join(' ') || ''}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  )
}