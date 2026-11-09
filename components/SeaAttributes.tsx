'use client'

import Link from 'next/link'
import { useState } from 'react'

// Красивые иконки (можно заменить на свои картинки позже)
const attributes = [
  { 
    id: 'poetry', 
    title: 'Поэзия', 
    slug: 'poetry', 
    // Иконка пера (литература)
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 md:w-16 md:h-16">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    )
  },
  { 
    id: 'painting', 
    title: 'Картины', 
    slug: 'painting', 
    // Иконка палитры (живопись)
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 md:w-16 md:h-16">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    )
  },
  { 
    id: 'photo', 
    title: 'Фотографии', 
    slug: 'photo', 
    // Иконка объектива (фото)
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 md:w-16 md:h-16">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  { 
    id: 'prose', 
    title: 'Проза', 
    slug: 'prose', 
    // Иконка книги (проза)
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 md:w-16 md:h-16">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    )
  },
]

export default function SeaAttributes() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="relative w-full max-w-4xl mx-auto h-64 md:h-80 flex items-center justify-center gap-8 md:gap-16 mt-12">
      {/* Декоративная линия "воды" */}
      <div className="absolute inset-x-0 bottom-10 h-px bg-gradient-to-r from-transparent via-wave/30 to-transparent"></div>
      
      {attributes.map((attr) => (
        <Link 
          key={attr.id}
          href={`/catalog/${attr.slug}`}
          className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-500 ease-out ${
            hovered === attr.id ? '-translate-y-4' : 'translate-y-0'
          } text-pine hover:text-sun`}
          onMouseEnter={() => setHovered(attr.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="p-4 rounded-full bg-white/50 backdrop-blur-sm shadow-sm border border-pine/5 hover:shadow-md transition-shadow">
            {attr.icon}
          </div>
          <span className="font-semibold text-sm md:text-base tracking-wide">{attr.title}</span>
        </Link>
      ))}
    </div>
  )
}
