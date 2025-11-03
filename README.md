# Générateur de Mémoires Techniques - Frontend

This is the frontend application for the AI-powered technical memoir generation system, built with Next.js 14 and modern React patterns.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **File Upload**: react-dropzone
- **Document Preview**: react-pdf, docx-preview
- **Diff Viewer**: react-diff-viewer-continued
- **Animations**: Framer Motion

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── projects/          # Project-specific components
│   ├── library/           # Library components
│   ├── editor/            # Editor components
│   └── common/            # Shared components
├── lib/
│   ├── api/               # API client
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript types
└── styles/                # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Update environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

### Linting

Run ESLint:

```bash
npm run lint
```

Type check:

```bash
npm run type-check
```

## Key Features

- **Project Management**: Create and manage technical memoir projects
- **AI-Powered Generation**: Automatic content generation using RAG
- **Smart Editor**: Section-by-section editing with regeneration capabilities
- **Library Management**: Organize and reuse reference memoirs
- **Document Export**: Export to DOCX and PDF formats

## Development Guidelines

### Adding shadcn/ui Components

To add new shadcn/ui components:

```bash
npx shadcn-ui@latest add [component-name]
```

### API Integration

All API calls should use the hooks in `src/lib/hooks/`:

```typescript
import { useProjects } from "@/lib/hooks/useProjects";

function MyComponent() {
  const { data, isLoading } = useProjects();
  // ...
}
```

### Type Safety

Always use TypeScript types from `src/lib/types/` for type safety.

## Color Scheme

The application uses a custom color scheme based on the brand:

- Primary Green: `#78B45A`
- Primary Blue: `#2E5090`
- Accent Orange: `#FF7043`
- Neutral Gray: `#F5F5F5`

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure linting and type checks pass
4. Submit a pull request

## License

ISC