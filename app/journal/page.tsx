import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export const instant = false;

export default async function JournalPage() {
  const issues = await client.fetch(`*[_type == "issue"] | order(_createdAt desc){ _id, number, title, slug, cover, description }`)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4 text-pine tracking-tight">Журнал</h1>
      <p className="text-xl text-pine/70 mb-12">Тематические выпуски со всеми видами творчества.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {issues.map((issue: any) => (
          <Link key={issue._id} href={`/journal/${issue.slug.current}`} className="group block">
            {issue.cover && (
              <div className="aspect-[3/4] relative bg-pine-light rounded-xl overflow-hidden mb-6 shadow-lg">
                <Image 
                  src={urlFor(issue.cover).width(800).url()} 
                  alt={issue.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
            )}
            <div className="text-sm text-sun font-bold mb-2 uppercase tracking-wider">Выпуск {issue.number}</div>
            <h2 className="text-2xl font-bold text-pine group-hover:text-wave transition-colors mb-2">{issue.title}</h2>
            <p className="text-pine/70 line-clamp-3">{issue.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}