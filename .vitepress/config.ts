import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'The OpenClaw Handbook',
  description: 'How we work with AI agents at 2x.',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'All Chapters', link: '/chapters' },
      {
        text: 'For Agents',
        items: [
          { text: 'Agent onboarding', link: '/23-agent-onboarding' },
          { text: 'Memory protocol', link: '/24-agent-memory-protocol' },
          { text: 'Self-improvement', link: '/25-agent-self-improvement' },
          { text: 'Coding strategy', link: '/26-coding-strategy' },
        ],
      },
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'What is this', link: '/00-what-is-this' },
          { text: 'First conversation', link: '/01-first-conversation' },
          { text: 'Core files', link: '/02-core-files' },
          { text: 'How memory works', link: '/03-how-memory-works' },
          { text: 'Your first week', link: '/04-your-first-week' },
        ],
      },
      {
        text: 'Skills and Tools',
        items: [
          { text: 'What skills are', link: '/05-what-are-skills' },
          { text: 'Installing skills safely', link: '/06-installing-skills-safely' },
          { text: 'Creating skills', link: '/07-creating-skills' },
          { text: 'Essential skills', link: '/08-essential-skills' },
        ],
      },
      {
        text: 'How Agents Work',
        items: [
          { text: 'Sessions and context', link: '/09-sessions-and-context' },
          { text: 'Heartbeats vs crons', link: '/10-heartbeats-vs-crons' },
          { text: 'Standard heartbeats', link: '/11-standard-heartbeats' },
          { text: 'Sub-agents and Ralph loops', link: '/12-sub-agents-ralph-loops' },
          { text: 'Memory architecture', link: '/13-memory-architecture' },
          { text: 'Brain/areas and QMD', link: '/14-brain-areas-qmd' },
        ],
      },
      {
        text: 'Multi-Agent',
        items: [
          { text: 'Telegram routing', link: '/15-telegram-routing' },
          { text: 'Inter-agent communication', link: '/16-inter-agent-communication' },
          { text: 'Keeping agents in sync', link: '/17-keeping-agents-in-sync' },
        ],
      },
      {
        text: 'Security',
        items: [
          { text: 'Threat model', link: '/18-threat-model' },
          { text: 'Safe practices', link: '/19-safe-practices' },
          { text: 'Audit and monitoring', link: '/20-audit-and-monitoring' },
        ],
      },
      {
        text: 'Model Selection',
        items: [
          { text: 'Choosing a model', link: '/21-choosing-a-model' },
          { text: 'Coding agents', link: '/22-coding-agents' },
        ],
      },
      {
        text: 'For Agents',
        items: [
          { text: 'Agent onboarding', link: '/23-agent-onboarding' },
          { text: 'Agent memory protocol', link: '/24-agent-memory-protocol' },
          { text: 'Agent self-improvement', link: '/25-agent-self-improvement' },
          { text: 'Coding strategy', link: '/26-coding-strategy' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/2xgrowthagency/handbook' },
    ],
    footer: {
      message: 'The OpenClaw Handbook — 2x Growth Agency',
    },
  },
});
