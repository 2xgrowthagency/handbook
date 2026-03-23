import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'OpenClaw Handbook',
  description: 'A guide to running your AI agent at 2x.',
  themeConfig: {
    nav: [{ text: 'Home', link: '/' }],
    sidebar: [
      {
        text: 'For Operators',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Daily Use', link: '/daily-use' },
          { text: 'Skills', link: '/skills' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
        ],
      },
      {
        text: 'For Owners',
        items: [
          { text: 'Architecture', link: '/architecture' },
          { text: 'Upgrade Checklist', link: '/upgrade-checklist' },
        ],
      },
    ],
  },
});
