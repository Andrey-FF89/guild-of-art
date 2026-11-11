import EditorNote from '@/components/EditorNote'
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

export const instant = false;

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const work = await client.fetch(`*[_type == "work" && slug.current == $slug][0]{
    _id, title, kind, body, images, publishedAt, editorNote, 
    "author": author->{ name, slug },
    "editor": editor->{ name, slug } 
  }`, { slug })

  if (!work) notFound()

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      {/* Шапка произведения */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-wave mb-4 block">{work.kind}</span>
        <h1 className="text-4xl md:text-5xl font-bold text-pine mb-4">{work.title}</h1>
        
        <div className="flex flex-col items-center gap-2 mb-4">
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

                {/* Дата и комментарий редактора */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mt-8 mb-12 border-t border-pine/10 pt-6">
          
          {/* Дата (слева) */}
          {work.publishedAt && (
            <div className="text-sm text-pine/50 shrink-0 md:mt-1">
              {new Date(work.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          )}

          {/* Комментарий редактора (справа, сворачиваемый) */}
          {work.editorNote && (
            <EditorNote note={work.editorNote} />
          )}
        </div>

      {/* Вывод всех картинок */}
      {work.images && work.images.length > 0 && (
        <div className="space-y-8 mb-12">
          {work.images.map((img: any, index: number) => (
            <div key={index} className="relative w-full rounded-xl overflow-hidden shadow-lg bg-pine-light">
              <Image 
                src={urlFor(img).width(1200).url()} 
                alt={`${work.title} — изображение ${index + 1}`} 
                width={1200}
                height={800}
                className="w-full h-auto object-contain" 
              />
            </div>
          ))}
        </div>
      )}
      </div>

      {/* Вывод текста */}
      {work.body && (
        <div className="prose prose-lg prose-pine mx-auto text-pine/80 leading-relaxed text-lg">
          <PortableText value={work.body} />
        </div>
      )}
    </article>
  )
}