# Overview

Azani is a modern African fashion e-commerce application built with a full-stack TypeScript architecture. The application showcases authentic African couture, offering both ready-to-wear products and custom order services. It features a beautiful, responsive design with a focus on showcasing traditional African fashion with modern web technologies.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built with React and TypeScript, utilizing a component-based architecture with the following key decisions:

- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessibility and consistency
- **Styling**: Tailwind CSS with CSS variables for theming, supporting both light and dark modes
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context for currency selection, React Hook Form for form state
- **Data Fetching**: TanStack Query for server state management with caching and background updates
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
The server follows a REST API pattern with Express.js:

- **Framework**: Express.js with TypeScript for type safety
- **API Design**: RESTful endpoints with consistent error handling and request/response logging
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Validation**: Zod schemas for runtime type validation on API endpoints
- **Development**: Hot reloading with Vite integration for seamless development experience

## Data Storage Solutions
The application uses a flexible storage architecture:

- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Design**: Separate tables for users, products, custom orders, and contacts
- **Development Storage**: In-memory storage implementation for rapid prototyping
- **Migrations**: Drizzle Kit for database schema management and migrations

## Authentication and Authorization
Currently implements a basic structure for user management:

- **User Model**: Username/password based authentication schema
- **Session Management**: Prepared for session-based authentication with connect-pg-simple
- **Future Expansion**: Architecture supports easy integration of OAuth providers

## External Dependencies

### Core Technologies
- **React 18** with TypeScript for the frontend framework
- **Express.js** with TypeScript for the backend server
- **Drizzle ORM** with PostgreSQL for database operations
- **Neon Database** serverless PostgreSQL hosting

### UI and Styling
- **Shadcn/ui** component library built on Radix UI
- **Tailwind CSS** for utility-first styling
- **Lucide React** for consistent iconography
- **Google Fonts** (Inter, Playfair Display) for typography

### Development Tools
- **Vite** for build tooling and development server
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation for forms
- **Wouter** for lightweight routing

### Third-Party Services
- **Replit** platform integration for development environment
- **Image hosting** via external CDN services (Pixabay for demo content)
- **Currency conversion** with built-in KES to USD exchange rate handling

The architecture is designed to be scalable and maintainable, with clear separation of concerns between frontend and backend, and a flexible storage layer that can easily transition from development to production environments.