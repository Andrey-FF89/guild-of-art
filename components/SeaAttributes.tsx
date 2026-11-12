'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const attributes = [
  { id: 'poetry', title: 'Поэзия', slug: 'poetry', icon: '/icons/poetry-feather.svg' },
  { id: 'prose', title: 'Проза', slug: 'prose', icon: '/icons/prose-typewriter.svg' },
  { id: 'painting', title: 'Живопись', slug: 'painting', icon: '/icons/arts-palette.svg' },
  { id: 'photo', title: 'Фотографии', slug: 'photo', icon: '/icons/photography-camera.svg' },
]

export default function SeaAttributes() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="relative w-full max-w-4xl mx-auto min-h-[16rem] md:min-h-[20rem] flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-12 px-4">
      
      {/* Декоративная линия "воды" */}
      <div className="absolute inset-x-0 bottom-10 h-px bg-gradient-to-r from-transparent via-wave/50 to-transparent hidden md:block"></div>
      
      {attributes.map((attr) => (
        <Link 
          key={attr.id}
          href={`/catalog/${attr.slug}`}
          className={`relative z-10 flex flex-col items-center gap-2 md:gap-3 transition-all duration-300 ease-out ${
            hovered === attr.id ? '-translate-y-4' : 'translate-y-0'
          } text-pine group`}
          onMouseEnter={() => setHovered(attr.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="p-3 md:p-4 rounded-full bg-white/50 backdrop-blur-sm shadow-sm border border-pine/10 group-hover:shadow-sun/30 group-hover:border-sun/50 transition-all duration-300">
            <Image 
              src={attr.icon} 
              alt={attr.title} 
              width={64} 
              height={64} 
              className="w-10 h-10 md:w-16 md:h-16 opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(241,187,96,0.5)] transition-all duration-300 object-contain" 
            />
          </div>
          <span className="font-semibold text-xs md:text-base tracking-wide group-hover:text-sun transition-colors text-center">{attr.title}</span>
        </Link>
      ))}
    </div>
  )
}