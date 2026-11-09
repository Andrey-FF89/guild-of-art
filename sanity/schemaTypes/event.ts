import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Событие',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Название', type: 'string' }),
    defineField({ name: 'date', title: 'Дата', type: 'datetime' }),
    defineField({ name: 'description', title: 'Описание', type: 'text' }),
  ],
})