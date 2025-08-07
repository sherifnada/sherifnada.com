# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Starts both Next.js dev server and content watcher in parallel
- `npm run build` - Builds the production Next.js application
- `npm run start` - Starts the production server
- `npm run lint` - Runs Next.js linting
- When you test the changes, make sure the server is running in the background

### Node Version
Use Node.js 22.12.0 (specified in .nvmrc)

## Architecture

This is a personal blog built with Next.js 14, TypeScript, and Tailwind CSS, hosted on Vercel.

### Content Management
- Blog posts are stored as Markdown files in `/public/[post-name]/index.md`
- Each post uses frontmatter for metadata (title, createdDate, description, draft, tags)
- Content is loaded at build time via `contentService.ts`
- Draft posts (draft: true) are filtered from the homepage

### Key Components
- **Content Loading**: `src/utils/contentService.ts` reads and parses all markdown posts from the public directory
- **Live Reload**: `src/watcher.ts` runs a WebSocket server (port 3001) that watches for content changes and triggers browser refresh during development
- **Post Rendering**: `src/app/[post]/page.tsx` renders individual blog posts with syntax highlighting for code blocks
- **RSS Feed**: `src/app/rss.xml/route.ts` generates an RSS feed of all posts

### Routing
- `/` - Homepage listing all posts
- `/[post-name]` - Individual blog post pages
- `/about` - About page
- `/newsletter` - Newsletter subscription page
- `/rss.xml` - RSS feed

### Styling
- Uses Tailwind CSS with Typography plugin for prose content
- Custom fonts imported via `src/utils/fonts.ts`
- Dark mode enabled by default

## Design Guidelines
- Whenever doing UI changes, use Playwright MCP to verify changes
- Take screenshots during UI verification
- Prioritize top-tier design aesthetic similar to Stripe, Linear, or Airbnb
  - Focus on creating slick, polished, and modern user interfaces
  - Pay attention to micro-interactions, animations, and overall design refinement