import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

export const instant = false;

export default async function IssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const issue = await client.fetch(`*[_type == "issue" && slug.current == $slug][0]{
    _id, number, title, description, contents, cover,
    "editor": editor->{ name },
    "works": works[]->{ _id, title, slug, kind, image, "author": author->name }
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

      {/* Содержание (если добавлено) */}
      {issue.contents && (
        <div className="prose prose-pine mx-auto mb-16 text-pine/80 border-l-2 border-sun pl-6">
          <h3 className="text-xl font-bold mb-4">Содержание</h3>
          <PortableText value={issue.contents} />
        </div>
      )}

      <div className="space-y-12">
        {issue.works?.map((w: any) => (
          <Link key={w._id} href={`/work/${w.slug.current}`} className="group flex flex-col md:flex-row gap-8 items-center bg-pine-light p-6 rounded-2xl hover:bg-sun/5 transition-colors border border-transparent hover:border-sun/20">
            {w.image && (
              <div className="w-full md:w-1/3 aspect-square relative rounded-lg overflow-hidden shrink-0">
                <Image src={urlFor(w.image).width(400).url()} alt={w.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest text-wave block mb-2">{w.kind}</span>
              <h2 className="text-2xl font-bold text-pine group-hover:text-sun transition-colors mb-2">{w.title}</h2>
              <p className="text-pine/60">{w.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}