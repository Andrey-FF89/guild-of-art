import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const instant = false;

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const author = await client.fetch(`*[_type == "author" && slug.current == $slug][0]{
    _id, name, bio, photo,
    "works": *[_type == "work" && references(^._id)] | order(publishedAt desc){
      _id, title, slug, kind, image
    }
  }`, { slug })

  if (!author) notFound()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center gap-8 mb-16 border-b border-pine/10 pb-12">
        {author.photo && (
          <div className="w-32 h-32 relative rounded-full overflow-hidden shrink-0 shadow-lg">
            <Image src={urlFor(author.photo).width(300).height(300).url()} alt={author.name} fill className="object-cover" />
          </div>
        )}
        <div>
          <h1 className="text-4xl font-bold text-pine mb-4">{author.name}</h1>
          <p className="text-lg text-pine/70 leading-relaxed max-w-2xl">{author.bio}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-pine mb-8">Произведения автора</h2>
      <div className="space-y-4">
        {author.works.map((w: any) => (
          <Link key={w._id} href={`/work/${w.slug.current}`} className="group flex items-center justify-between p-6 bg-pine-light rounded-xl hover:bg-sun/10 transition-colors">
            <div>
              <span className="text-xs uppercase tracking-widest text-wave block mb-1">{w.kind}</span>
              <h3 className="text-xl font-bold text-pine group-hover:text-sun transition-colors">{w.title}</h3>
            </div>
            <span className="text-2xl text-pine/20 group-hover:text-sun transition-colors">→</span>
          </Link>
        ))}
        {author.works.length === 0 && <p className="text-pine/60">У этого автора пока нет опубликованных произведений.</p>}
      </div>
    </div>
  )
}
