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
    { title: 'Живопись', slug: 'painting' },
  ]

  return (
    <>
      <header className="bg-white border-b border-pine/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/Logo1.jpg" 
              alt="Логотип" 
              width={40} 
              height={40} 
              className="rounded-full object-cover" 
            />
            <span className="text-2xl font-bold text-pine tracking-wide">
              Гильдия Искусства
            </span>
          </Link>
          
          <div className="flex gap-6 items-center">
            <Link href="/journal" className="hidden md:block text-pine font-medium hover:text-sun transition-colors">
              Журнал
            </Link>
            
            {/* Кнопка Каталога сдвинута вправо */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 text-wave font-semibold hover:text-sun transition-colors cursor-pointer ml-4"
            >
              {isOpen ? 'Закрыть' : 'Каталог'} 
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>
      </header>

      {/* Выдвижная панель справа */}
      <div 
        className={`fixed inset-0 bg-pine/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      <nav 
        className={`fixed top-0 right-0 h-full w-80 bg-pine-light z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-pine">Каталог</h2>
            <button onClick={() => setIsOpen(false)} className="text-2xl text-pine hover:text-sun cursor-pointer">×</button>
          </div>
          
          <ul className="space-y-4">
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
          </ul>

          {/* Кнопки Авторы и Редакция с обводкой */}
          <div className="mt-8 space-y-3">
            <Link 
              href="/journal" 
              onClick={() => setIsOpen(false)}
              className="block text-center border-2 border-pine text-pine font-bold py-3 rounded-xl hover:bg-pine hover:text-white transition-colors"
            >
              Журнал
            </Link>
            <Link 
              href="/authors" 
              onClick={() => setIsOpen(false)}
              // Текст сделали темным (text-pine), а обводку оставили голубой (border-wave)
              className="block text-center border-2 border-wave text-pine font-bold py-3 rounded-xl hover:bg-wave hover:text-white transition-colors"
            >
              Авторы
            </Link>
            <Link 
              href="/editors" 
              onClick={() => setIsOpen(false)}
              // Текст сделали темным (text-pine), а обводку оставили золотой (border-sun)
              className="block text-center border-2 border-sun text-pine font-bold py-3 rounded-xl hover:bg-sun hover:text-white transition-colors"
            >
              Редакция
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}