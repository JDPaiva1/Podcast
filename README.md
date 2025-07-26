# Podcast App

A Next.js podcast application that displays channels and podcasts from an API.

### Architecture Changes

- Converted all class components to function components
- Replaced `getInitialProps` with `getServerSideProps` where appropriate
- Added TypeScript interfaces for all data structures
- Implemented proper type safety throughout the application
- Replaced custom routing with Next.js rewrites

### File Structure

- All `.js` files converted to `.tsx`
- Added `types/index.ts` for centralized type definitions
- Added `tsconfig.json` for TypeScript configuration
- Added `next.config.js` for Next.js configuration

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Features

- Browse podcast channels
- View channel details and podcasts
- Play podcasts with audio controls
- Responsive design
- TypeScript support for better development experience
