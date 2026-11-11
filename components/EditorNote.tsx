'use client'

import { useState } from 'react'

export default function EditorNote({ note }: { note: string }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!note) return null

  return (
    <div className="w-full md:w-80 flex flex-col items-end">
      {/* Кнопка, которая открывает текст */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs uppercase tracking-widest text-sun font-bold mb-2 hover:text-wave transition-colors flex items-center gap-2 cursor-pointer"
      >
        Комментарий редактора
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ↓
        </span>
      </button>
      
      {/* Выпадающий текст */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out text-right w-full ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-sun/5 p-4 rounded-lg text-pine/80 italic leading-relaxed text-sm">
          «{note}»
        </div>
      </div>
    </div>
  )
}