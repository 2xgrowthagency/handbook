# 2x Agency Handbook — Build PRD

**Agent:** GPT 5.4 (Codex)
**Voice Pass:** Sonnet 4.6 (after content is done)
**Project dir:** /root/clawd/dev/2x-handbook
**Git author:** John Chan <john@2xcd.com>

---

## Context

Build the 2x Agency public handbook as a VitePress site. Modelled after basecamp.com/handbook — markdown-first, clean reader layout, sidebar navigation, strong typography.

**Reference files to read before writing content:**
- `/root/clawd/SOUL.md` — values, character, what we care about
- `/root/clawd/USER.md` — John and Jenn profiles
- `/root/clawd/AGENTS.md` — how 2x operates, workflows

**Tone:** John Chan's voice — direct, no fluff, real. Not corporate. If it sounds like a brochure, rewrite it.

---

## Tasks

- [x] Initialize VitePress project: run `npm init -y && npm install vitepress --save-dev` in /root/clawd/dev/2x-handbook
- [x] Create `package.json` scripts: `"dev": "vitepress dev"`, `"build": "vitepress build"`, `"preview": "vitepress preview"`
- [x] Create `.gitignore` with: node_modules, dist, .vitepress/cache
- [x] Create `.vitepress/config.ts` — site title "2x Agency Handbook", description, nav with Home link, sidebar with all 6 chapters
- [x] Create `.vitepress/theme/index.ts` — import default theme, import custom style
- [x] Create `.vitepress/theme/style.css` — typography: body Georgia serif 18px/1.75, headings Inter sans-serif, max-width 740px, background #FAFAF8, text #1A1A1A, accent blue #2563EB, sidebar #F3F4F6
- [x] Create `index.md` — homepage with title "The 2x Agency Handbook", subtitle, short intro paragraph, and links to all 6 chapters
- [x] Create `who-we-are.md` — Who we are: mission, origin story, what we believe about marketing, brief intro to John and Jenn. Read /root/clawd/USER.md and /root/clawd/SOUL.md for content. ~400-600 words.
- [x] Create `how-we-work.md` — How we work: async-first, bias for action, no unnecessary meetings, how we communicate, how we make decisions. ~400-600 words.
- [x] Create `our-clients.md` — Who we work with: ideal client profile, who we don't work with, what a great client relationship looks like, what we expect from each other. ~400-600 words.
- [x] Create `the-work.md` — The work: what performance marketing means to us, how we think about growth, what good looks like, our philosophy on testing and iteration. ~400-600 words.
- [x] Create `communication.md` — Communication: how we communicate with clients, response times, what we use for what, how to give feedback, how to raise concerns. ~400-600 words.
- [x] Create `making-a-career.md` — Making a career at 2x: how we think about growth and development, what we look for, how we work together as a team. ~400-600 words.
- [x] Create `README.md` — one-liner description and note that the live site is at handbook.2x.agency
- [x] Run `npm run build` and confirm it succeeds with no errors
- [x] Stage all files and commit with message `feat: initial handbook build` using git author John Chan <john@2xcd.com>
