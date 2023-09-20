# CaromGenie

![image](public/carom.svg)

This is simple standalone webapplication for managing point calculation for three cushion billiards. It has been created for various reasons:

- Most point calculators are native apps with limited device support which has caused problems within our billiards community.
- To prove that it can be done _easily_
- It was facinating how minimal state is required to feed UI

Some extra features that were requested:

- Support for three players (Optional)
- Possibility to pause the game

## Tech

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

Install dependecies:

```bash
npm install
```

Running the development server:

```bash
npm run dev
```

Make static export (production build)

```bash
npm run build
```

## Future development

What _could_ be done in the future

- Sharing the state
  - Different UI for observing running game
- PWA support
- SEO
- Support for shotclock extension
- Configurability
  - Innings limit (game length)
  - Shotclock duration
- "Raisa" support (in-house handicap system)
- Winning screen (how to handle draw?)
- Codebase cleanup
- Tests!
