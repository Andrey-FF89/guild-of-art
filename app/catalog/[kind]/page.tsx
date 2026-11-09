import { client, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

export const instant = false;

export default async function CategoryPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params
  
  // Получаем произведения нужного типа
  const works = await client.fetch(`*[_type == "work" && kind == $kind] | order(publishedAt desc){
    _id, title, slug, image, "author": author->name
  }`, { kind })

  const titles: Record<string, string> = {
    poetry: 'Поэзия', prose: 'Проза', photo: 'Фотографии', painting: 'Картины'
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12 text-pine tracking-tight">{titles[kind] || kind}</h1>
      
      {works.length === 0 ? (
        <p className="text-pine/60 text-lg">В этом разделе пока нет произведений.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((w: any) => (
            <Link key={w._id} href={`/work/${w.slug.current}`} className="group block">
              {/* Если есть картинка, показываем её */}
              {w.image && (
                <div className="aspect-[4/3] relative bg-pine-light rounded-lg overflow-hidden mb-4">
                  <Image 
                    src={urlFor(w.image).width(600).height(450).url()} 
                    alt={w.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              )}
              <h2 className="text-xl font-bold text-pine group-hover:text-wave transition-colors mb-2">{w.title}</h2>
              <p className="text-sm text-pine/60">{w.author}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
