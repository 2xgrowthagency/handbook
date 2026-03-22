import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '2x Agency Handbook',
  description: 'How we work, who we are, and what we\'re here to do.',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      { text: 'Who We Are', link: '/who-we-are' },
      { text: 'How We Work', link: '/how-we-work' },
      { text: 'Our Clients', link: '/our-clients' },
      { text: 'The Work', link: '/the-work' },
      { text: 'Communication', link: '/communication' },
      { text: 'Making a Career', link: '/making-a-career' },
    ],
  },
});
