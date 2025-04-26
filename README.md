# Raymond Blog - Vue 3 + TypeScript + Vite

A modern frontend project built with Vue 3, TypeScript, and Vite, providing a complete blog system with admin panel functionality.

## Project Overview

This project is a fully-featured blog system consisting of two main parts: a frontend display and an admin backend. The system utilizes modern technology stack to deliver a smooth user experience and powerful management capabilities.

### Key Features

- 📝 Article Management
    - Article publishing, editing, and deletion
    - Markdown editor support
    - Article categorization and tagging
    - Comment system
    - Article search functionality
- 👥 User System
    - User registration and login
    - Role management
    - Personal profile center
    - Notification system
- 💬 Social Features
    - Comment system
    - Group chat functionality
    - User interactions
- 📊 Data Statistics
    - Visitor analytics
    - User behavior analysis
    - Data visualization
- ⚙️ System Administration
    - System configuration
    - Log management
    - Permission control
    - Menu management

## Technology Stack

### Core Frameworks

- Vue 3 - Progressive JavaScript framework
- TypeScript - Typed superset of JavaScript
- Vite - Next-generation frontend build tool

### State Management & Routing

- Pinia - State management library for Vue
- Vue Router - Official router for Vue.js

### UI Components & Styling

- Arco Design Vue - Vue 3 component library by ByteDance
- SASS - CSS preprocessor
- Font Awesome - Icon library

### Data Visualization & Editors

- ECharts - Powerful charting library
- MD Editor V3 - Markdown editor component

### Utility Libraries

- Axios - Promise-based HTTP client
- MockJS - Data mocking tool
- Day.js - Lightweight date library
- NProgress - Progress bar component

## Project Structure

```plain
src/
├── api/                # API definitions
│   ├── article_api.ts  # Article-related APIs
│   ├── user_api.ts     # User-related APIs
│   ├── chat_api.ts     # Chat-related APIs
│   └── ...
├── assets/            # Static assets
│   ├── theme.css      # Theme styles
│   └── base.css       # Base styles
├── components/        # Shared components
├── global/           # Global configurations
├── lib/              # Third-party library configs
├── router/           # Routing configurations
├── service/          # Service layer
├── stores/           # Pinia state management
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── views/            # Page view components
│   ├── admin/        # Admin panel pages
│   ├── login/        # Login-related pages
│   └── web/          # Frontend pages
└── main.ts           # Application entry file
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn or pnpm
- Modern browser (Chrome >= 87, Firefox >= 78, Safari >= 14, Edge >= 88)

### Installation

1. Clone the repository

```plain
git clone [repository-url]
cd gvb-web-ts
```

2. Install dependencies

```plain
npm install
# or
yarn install
# or
pnpm install
```

3. Configure environment variables

```plain
cp .env.example .env
# Edit .env file with necessary configurations
```

4. Start development server

```plain
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Build & Deployment

1. Build for production

```plain
npm run build
# or
yarn build
# or
pnpm build
```

2. Preview production build

```plain
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Development Guide

### Code Standards

- Use TypeScript for type safety
- Follow Vue 3 Composition API best practices
- Apply ESLint and Prettier for code formatting
- Use PascalCase for component names
- Use kebab-case for file names

### Directory Structure

- Components in `components` directory
- Pages in `views` directory
- API definitions in `api` directory
- Utility functions in `utils` directory
- Type definitions in `types` directory

### State Management

- Use Pinia for state management
- Organize stores by feature modules
- Follow actions/state/getters pattern

### Routing

- Use Vue Router for navigation
- Organize routes by modules
- Implement lazy loading
- Configure route guards for authentication

## Deployment

### Production Requirements

- Node.js >= 18
- Nginx or other web server
- HTTPS support
- Proper caching strategy

### Deployment Steps

1. Build the project

```plain
npm run build
```

2. Configure Nginx

```plain
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /path/to/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy configuration
    location /api {
        proxy_pass http://your-api-server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

3. Start production server

```plain
# Using PM2
pm2 start npm --name "gvb-web" -- run start
```

## Browser Compatibility

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## Contribution Guide

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
