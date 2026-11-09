import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export const instant = false; // Отключаем строгую предсборку

export default async function EditorsPage() {
  const editors = await client.fetch(`*[_type == "editor"]{ _id, name, slug, bio, photo }`)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12 text-pine tracking-tight">Редакция</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {editors.map((e: any) => (
          <Link key={e._id} href={`/editor/${e.slug.current}`} className="group flex gap-6 items-start bg-pine-light p-6 rounded-xl border border-pine/5 hover:border-sun transition-colors">
            {e.photo && (
              <div className="w-20 h-20 relative rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                <Image src={urlFor(e.photo).width(200).height(200).url()} alt={e.name} fill className="object-cover" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-pine group-hover:text-wave transition-colors mb-2">{e.name}</h2>
              <p className="text-pine/70 line-clamp-3">{e.bio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}