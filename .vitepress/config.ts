import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '2x Agency Handbook',
  description: 'Documentation for the 2x Agency Handbook.',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      { text: 'Chapter 1', link: '/chapter-1' },
      { text: 'Chapter 2', link: '/chapter-2' },
      { text: 'Chapter 3', link: '/chapter-3' },
      { text: 'Chapter 4', link: '/chapter-4' },
      { text: 'Chapter 5', link: '/chapter-5' },
      { text: 'Chapter 6', link: '/chapter-6' },
    ],
  },
});
