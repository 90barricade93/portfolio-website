# Portfolio Website

A modern portfolio website built with React and Node.js, featuring:

- GitHub API integration with 12-month activity tracking
- LinkedIn professional profile integration
- Interactive project showcase cards
- Skills and expertise visualization
- Blog system with CRUD functionality
- AI-powered chat interface

## Tech Stack

- Frontend: React with TypeScript
- Backend: Express.js
- Database: PostgreSQL with Drizzle ORM
- Styling: Tailwind CSS with Shadcn UI
- Authentication: Custom JWT implementation
- APIs: GitHub and LinkedIn integration

## Features

### GitHub Integration
- Display public and private repository counts
- Show contribution statistics for the last 12 months
- List recent commit activity

### LinkedIn Integration
- Professional profile display
- Skills and certifications showcase
- Work experience timeline

### Blog System
- Create, read, update, and delete blog posts
- Rich text editing
- Image upload support
- Post categorization

### AI Chat
- Interactive chat interface
- Context-aware responses about portfolio
- Professional conversation handling

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Start the development server: `npm run dev`

## Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `GITHUB_TOKEN`: GitHub personal access token
- `GITHUB_USERNAME`: GitHub username
- `OPENAI_API_KEY`: OpenAI API key for chat functionality
- `ADMIN_PASSWORD`: Admin password for blog management

## License

MIT License - feel free to use this code for your own portfolio!
