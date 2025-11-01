# Zema (ዜማ) - Ethiopian Music Streaming Platform

A modern, production-ready music streaming platform with authentic Ethiopian cultural elements, built with React, TypeScript, Supabase, and Tailwind CSS.

## Features

### Core Features

- **Real Authentication**: Full Supabase authentication with email/password
- **Database Integration**: Complete Supabase database with proper RLS policies
- **Bilingual Support**: Full interface in English and Amharic (አማርኛ)
- **Unique Design**: Ethiopian-inspired with green-yellow-red color palette
- **Responsive**: Mobile-first design that works on all devices
- **Dark Mode**: System, light, and dark theme support
- **Music Player**: Full-featured player with play, pause, skip, shuffle, and repeat
- **Playlists**: Create, edit, and manage personal playlists
- **Collaborative Playlists**: Work together with friends on playlists
- **Social Features**: Follow users and artists, like songs
- **Search**: Comprehensive search across songs, artists, albums, and playlists
- **Premium Subscription**: Upgrade for ad-free listening and more features
- **Admin Dashboard**: Analytics and management tools for premium users

### Ethiopian Cultural Elements

- **Color Palette**: Authentic green, yellow, and red colors throughout
- **Traditional Patterns**: Subtle Ethiopian pattern backgrounds
- **Bilingual UI**: Complete Amharic translation with proper RTL support where needed
- **Ethiopian Genres**: Tizita, Ambassel, Anchihoye, and Ethio-Jazz
- **Cultural Branding**: "Zema" (ዜማ) meaning "melody" or "hymn" in Amharic

### Technical Features

- **TypeScript**: Full type safety across the application
- **Zustand**: Lightweight state management
- **Framer Motion**: Smooth animations and transitions
- **Row Level Security**: Secure data access with Supabase RLS
- **Real-time**: Live updates using Supabase subscriptions
- **Performance**: Optimized bundle with code splitting
- **Production Ready**: Built and tested for deployment

## Database Schema

### Tables

1. **profiles** - User profiles with premium status
2. **artists** - Artist information and verification
3. **albums** - Music albums
4. **songs** - Individual tracks with lyrics support
5. **playlists** - User-created playlists
6. **playlist_songs** - Playlist track relationships
7. **user_follows** - Social following system
8. **user_likes** - Song favorites
9. **listening_history** - Play history for recommendations
10. **playlist_collaborators** - Collaborative playlist permissions

## Pages

### Public Pages
- **Landing Page** - Beautiful Ethiopian-themed landing page with feature showcase
- **Home** - Music discovery with trending songs and artists
- **Search** - Find songs, artists, albums, and playlists
- **Artist Detail** - Artist profile with discography
- **Album Detail** - Album view with track listing

### Protected Pages
- **Library** - Personal music collection
- **Liked Songs** - Favorited tracks
- **Playlist Detail** - View and edit playlists
- **Profile** - User profile with stats
- **Settings** - Preferences and theme settings
- **Premium** - Subscription plans
- **Admin** - Analytics dashboard (premium only)
- **Player** - Full-screen player view

## Language Support

The app supports two languages:
- **English (EN)** - Default language
- **Amharic (አማርኛ)** - Ethiopian language

Switch languages using the globe icon in the navbar.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment variables are pre-configured in `.env`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Authentication

The app uses Supabase authentication:
- Sign up with email and password
- Automatic profile creation
- Session persistence
- Secure password handling

## Security

- Row Level Security (RLS) enabled on all tables
- Authenticated access required for write operations
- Public read access for public content
- Owner-based permissions for user data

## Design Philosophy

The design is intentionally **not** a Spotify clone. Instead, it features:

- **Ethiopian Colors**: Green, yellow, and red from the Ethiopian flag
- **Unique Layouts**: Custom card designs and spacing
- **Cultural Typography**: Support for Amharic script
- **Pattern Integration**: Subtle Ethiopian patterns in backgrounds
- **Vibrant Gradients**: Multi-color gradients throughout
- **Unique Landing Page**: Feature-rich landing with cultural elements

## Development

### Tech Stack

- **Frontend**: React 18, TypeScript
- **Routing**: React Router v7
- **State**: Zustand
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Build**: Vite

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run typecheck # Run TypeScript type checking
```

## Future Enhancements

- Audio file upload and storage
- Podcast support
- Real-time collaborative playlists
- Music recommendations engine
- Lyrics display with synchronization
- Sleep timer and alarm features
- Crossfade between tracks
- Queue management with drag-and-drop
- Artist verification system
- Payment integration for premium subscriptions

## License

This project is for demonstration purposes.

## Credits

- Design inspired by Ethiopian culture and aesthetics
- Images from Pexels (free stock photos)
- Ethiopian flag colors for color palette
- Amharic translations for bilingual support
