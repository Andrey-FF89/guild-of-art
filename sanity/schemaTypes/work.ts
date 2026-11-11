import { defineField, defineType } from 'sanity'

export const work = defineType({
  name: 'work',
  title: 'Произведение',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Заголовок', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'URL-адрес', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'kind',
      title: 'Тип (Каталог)',
      type: 'string',
      options: {
        list: [
          { title: 'Поэзия', value: 'poetry' },
          { title: 'Проза', value: 'prose' },
          { title: 'Фотография', value: 'photo' },
          { title: 'Живопись', value: 'painting' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      title: 'Автор',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'editor',
      title: 'Редактор',
      type: 'reference',
      to: [{ type: 'editor' }],
    }),
    defineField({ name: 'body', title: 'Текст (для поэзии/прозы)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ 
      name: 'images', 
      title: 'Изображения (для живописи/фото)', 
      type: 'array', 
      of: [{ type: 'image', options: { hotspot: true } }] 
    }),
    defineField({ name: 'publishedAt', title: 'Дата публикации', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ 
      name: 'editorNote', 
      title: 'Комментарий редактора', 
      type: 'text',
      description: 'Короткая заметка или рецензия от редакции. Появится на странице произведения.' 
    }),
  ],
})
