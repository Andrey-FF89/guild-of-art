import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Событие',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Название', type: 'string', validation: (r) => r.required() }),
    defineField({ 
      name: 'slug', 
      title: 'URL-адрес', 
      type: 'slug', 
      options: { source: 'title' }, 
      validation: (r) => r.required() 
    }),
    defineField({ name: 'date', title: 'Дата', type: 'datetime' }),
    defineField({ name: 'description', title: 'Описание', type: 'text' }),
    defineField({
      name: 'editor',
      title: 'Редактор (кто добавил)',
      type: 'reference',
      to: [{ type: 'editor' }],
    }),
  ],
})