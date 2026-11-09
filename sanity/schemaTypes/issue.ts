import { defineField, defineType } from 'sanity'

export const issue = defineType({
  name: 'issue',
  title: 'Выпуск журнала',
  type: 'document',
  fields: [
    defineField({ name: 'number', title: 'Номер выпуска', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Название', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'URL-адрес', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'cover', title: 'Обложка', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'editor',
      title: 'Редактор выпуска',
      type: 'reference',
      to: [{ type: 'editor' }],
    }),
    defineField({ name: 'description', title: 'Описание выпуска', type: 'text' }),
    defineField({ 
      name: 'contents', 
      title: 'Содержание (текст)', 
      type: 'array', 
      of: [{ type: 'block' }] 
    }),
    defineField({ 
      name: 'works', 
      title: 'Произведения в выпуске', 
      type: 'array', 
      of: [{ type: 'reference', to: [{ type: 'work' }] }] 
    }),
  ],
})
