# Newsletter Curation Tool

A powerful and intuitive frontend for curating newsletter content from multiple news sources. This tool gives you personal control over the news that goes out to your audience, making it much easier to curate content compared to traditional automation tools.

## What This Project Does

This is a **newsletter curation tool** that streamlines the process of selecting and organizing articles for your newsletter. Instead of relying on automated systems that might miss the nuance of what you actually want to share, this tool puts you in the driver's seat.

### The Problem We Solve
- **Information Overload**: Too many news sources to manually check
- **Quality Control**: Need personal oversight of what content gets included
- **Efficiency**: Traditional tools like n8n are cumbersome for content curation
- **Brand Voice**: Maintaining personal touch in automated workflows

### Our Workflow

**Phase 1: Content Aggregation & Curation** (Current)
We pull articles from 6 major tech news sources including:
- The Verge
- VentureBeat  
- TechCrunch
- And other leading publications

Watch our workflow explanation:

[![Newsletter Automation Workflow](https://img.youtube.com/vi/YpnLSpJ2bEQ/0.jpg)](https://youtu.be/YpnLSpJ2bEQ)

The custom frontend interface allows you to:
- View all articles with images, snippets, and metadata
- Sort by source, publication date, or index
- Select articles that align with your interests and audience
- Build curated lists with ease
- Maintain personal control over every piece of content

**Phase 2: Article Generation & Publishing** (Coming Next)
The next step will be to:
- Take curated news items and generate article blocks
- Format content for newsletter platforms
- Publish directly to platforms like Substack
- Maintain your unique voice and perspective

### Why Not Full Automation?

While I *could* deploy an AI agent to fully automate this process, **personal curation is the key differentiator**. The goal is to select news that I would personally be interested in and that reflects the quality and perspective my audience expects. This tool gives you the efficiency of automation while preserving the human touch that makes great newsletters.

## Features

- ✨ **Intuitive Interface**: Clean, modern UI built with React and Tailwind CSS
- 🔍 **Smart Sorting**: Sort articles by source, date, or index number
- 🖼️ **Rich Content Display**: View article images, snippets, and metadata
- ✅ **Easy Selection**: Check/uncheck articles with persistent selection
- 📱 **Responsive Design**: Works on desktop and mobile
- 🎯 **Condensed View**: Toggle between full and compact article views
- 🗑️ **Curated Management**: Easy removal from curated lists

## Installation

### Prerequisites
- **Code Editor**: We recommend [VSCode](https://code.visualstudio.com/) or [Cursor](https://cursor.sh/)
- **Node.js**: Version 16 or higher
- **AI Assistant**: Your AI coding assistant can help with any installation issues!

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd curate-splurge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```bash
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see your curation tool in action!

### Need Help?

- 🤖 **Use AI**: Your AI assistant (Claude, ChatGPT, etc.) can help troubleshoot any installation issues
- 📖 **Check the docs**: Most issues are covered in the Vite and React documentation
- 🔧 **Common fixes**: Try `npm ci` if you have dependency issues

## Tech Stack

This project is built with modern web technologies:

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite for fast development and building
- **Database**: Supabase for data storage and real-time updates
- **Icons**: Lucide React for beautiful icons

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/        # Reusable UI components
├── hooks/            # Custom React hooks
├── pages/            # Main application pages
├── types/            # TypeScript type definitions
├── lib/              # Utility functions
└── integrations/     # External service integrations
```

## Contributing

This is a personal project, but feedback and suggestions are welcome! Feel free to open issues or reach out with ideas for improvements.

## License

This project is for personal use in newsletter curation workflows.

---

<div align="center">
  <img src="/logo.png" alt="Project Logo" height="60">
</div>