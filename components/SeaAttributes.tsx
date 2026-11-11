'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const attributes = [
  { id: 'poetry', title: 'Поэзия', slug: 'poetry', icon: '/icons/poetry-feather.svg' },
  { id: 'prose', title: 'Проза', slug: 'prose', icon: '/icons/prose-typewriter.svg' },
  { id: 'painting', title: 'Живопись', slug: 'painting', icon: '/icons/arts-palette.svg' }, // Переименовали
  { id: 'photo', title: 'Фотографии', slug: 'photo', icon: '/icons/photography-camera.svg' },
]

export default function SeaAttributes() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="relative w-full max-w-4xl mx-auto h-64 md:h-80 flex items-center justify-center gap-8 md:gap-16 mt-12">
      <div className="absolute inset-x-0 bottom-10 h-px bg-gradient-to-r from-transparent via-wave/50 to-transparent"></div>
      
      {attributes.map((attr) => (
        <Link 
          key={attr.id}
          href={`/catalog/${attr.slug}`}
          className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-300 ease-out ${
            hovered === attr.id ? '-translate-y-4' : 'translate-y-0'
          } text-pine group`}
          onMouseEnter={() => setHovered(attr.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="p-4 rounded-full bg-white/50 backdrop-blur-sm shadow-sm border border-pine/10 group-hover:shadow-sun/30 group-hover:border-sun/50 transition-all duration-300">
            {/* Анимация яркости и легкого увеличения */}
            <Image 
              src={attr.icon} 
              alt={attr.title} 
              width={64} 
              height={64} 
              className="w-12 h-12 md:w-16 md:h-16 opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(241,187,96,0.5)] transition-all duration-300" 
            />
          </div>
          <span className="font-semibold text-sm md:text-base tracking-wide group-hover:text-sun transition-colors">{attr.title}</span>
        </Link>
      ))}
    </div>
  )
}