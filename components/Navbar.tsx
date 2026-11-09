'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const categories = [
    { title: 'Поэзия', slug: 'poetry' },
    { title: 'Проза', slug: 'prose' },
    { title: 'Фотографии', slug: 'photo' },
    { title: 'Картины', slug: 'painting' },
  ]

  return (
    <>
      <header className="bg-white border-b border-pine/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-3">
            <Image src="/Logo1.jpg" alt="Логотип" width={48} height={48} className="rounded-full" />
            <span className="text-2xl font-bold text-pine tracking-wide">
              Гильдия Искусства
            </span>
          </Link>
          
          <div className="flex gap-6 items-center">
            <Link href="/journal" className="hidden md:block text-pine font-medium hover:text-sun transition-colors">
              Журнал
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 text-wave font-semibold hover:text-sun transition-colors cursor-pointer"
            >
              {isOpen ? 'Закрыть' : 'Каталог'} 
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>
      </header>

      {/* Выдвижная панель */}
      <div 
        className={`fixed inset-0 bg-pine/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      <nav 
        className={`fixed top-0 left-0 h-full w-80 bg-pine-light z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-pine">Каталог</h2>
            <button onClick={() => setIsOpen(false)} className="text-2xl text-pine hover:text-sun cursor-pointer">×</button>
          </div>
          <ul className="space-y-6">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link 
                  href={`/catalog/${cat.slug}`} 
                  onClick={() => setIsOpen(false)}
                  className="text-xl text-pine hover:text-sun transition-colors block border-b border-pine/10 pb-2"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
            {/* Ссылка на журнал и авторов в мобильном меню */}
            <li className="pt-4">
              <Link 
                href="/journal" 
                onClick={() => setIsOpen(false)}
                className="text-xl text-pine hover:text-sun transition-colors block border-b border-pine/10 pb-2"
              >
                Журнал
              </Link>
            </li>
            <li className="pt-2">
              <Link 
                href="/editors" 
                onClick={() => setIsOpen(false)}
                className="text-xl text-wave font-bold hover:text-sun transition-colors"
              >
                Редакция
              </Link>
            </li>
            <li>
              <Link 
                href="/authors" 
                onClick={() => setIsOpen(false)}
                className="text-xl text-wave font-bold hover:text-sun transition-colors"
              >
                Авторы
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
