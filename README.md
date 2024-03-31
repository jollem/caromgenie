# CaromGenie

![image](public/carom.svg)

Caromgenie is a web service for managing score keeping for [three-cushion carom billiards](RULES.md).

It aims to be [simple](MANUAL.md), platform independent and free.

## Why?

- Most point calculators are native apps with limited device support which caused problems within our billiards community :bison:.
- To prove that it can be done _easily(?)_
- It was facinating how minimal game state is required to drive the UI
- To have a meaningful hobby project for trying out some cool new tricks

Some extra features that were requested:

- Support for three players "party mode" (Optional) ✅
- Remote monitoring UI for observing games ✅
- Possibility to pause the game ✅
- Shotclock extension ✅
- Statistics for game over screen ✅
- Remember configuration stuff across sessions ✅

## Development

Prerequisites: [Node](https://nodejs.org/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Some extra packages has been added for maximum oomph!

Interested? Read more [in-depth description](TECH.md).

### Quick start

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

### Getting involved

This project is licensed under the terms of the [MIT license](LICENSE.txt).

Fork, clone, do whatever you like; If you break it, you can keep all the pieces.

One can send in improvement ideas via normal GitHub channels e.g. PR:s or issues.

If you like what you see, please hit a star just to prove that someone visited.
