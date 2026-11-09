import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

export const instant = false;

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const work = await client.fetch(`*[_type == "work" && slug.current == $slug][0]{
    _id, title, kind, body, image, 
    "author": author->{ name, slug },
    "editor": editor->{ name, slug } 
  }`, { slug })

  if (!work) notFound()

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-wave mb-4 block">{work.kind}</span>
        <h1 className="text-4xl md:text-5xl font-bold text-pine mb-4">{work.title}</h1>
        <div className="flex flex-col items-center gap-2">
          {work.author && (
            <Link href={`/author/${work.author.slug.current}`} className="text-lg text-sun hover:text-wave transition-colors font-medium">
              Автор: {work.author.name}
            </Link>
          )}
          {work.editor && (
            <div className="text-sm text-pine/60">
              Добавил: <Link href={`/editor/${work.editor.slug.current}`} className="hover:text-wave transition-colors underline decoration-pine/20 underline-offset-4">{work.editor.name}</Link>
            </div>
          )}
        </div>
      </div>

      {/* Вывод картинки (если есть) */}
      {work.image && (
        <div className="relative w-full aspect-[16/9] mb-12 rounded-xl overflow-hidden shadow-lg">
          <Image 
            src={urlFor(work.image).width(1200).url()} 
            alt={work.title} 
            fill 
            className="object-contain bg-pine-light" 
          />
        </div>
      )}

      {/* Вывод текста (если есть) */}
      {work.body && (
        <div className="prose prose-lg prose-pine mx-auto text-pine/80 leading-relaxed text-lg">
          <PortableText value={work.body} />
        </div>
      )}
    </article>
  )
}
