import { defineField, defineType } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Автор',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Имя', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'URL-адрес', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'bio', title: 'Биография', type: 'text' }),
    defineField({ name: 'photo', title: 'Портрет', type: 'image', options: { hotspot: true } }),
  ],
})