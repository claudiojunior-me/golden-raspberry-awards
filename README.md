# Golden Raspberry Awards

This project displays information about movies nominated and winners of Raspberry Awards. It provides dashboards and listing features to analyze historical data of the awards.

### Technologies
- Next.js 14
- React 18
- TypeScript
- Jest & React Testing Library
- Docker

## Getting Started

### Prerequisites
- Node.js 20.x (or use nvm)
- npm 10.x
- Docker (optional)

### Environment Variables

Create a .env.local file with:

```bash
# API base URL
NEXT_PUBLIC_API_URL=https://challenge.outsera.tech/api/movies

# Number of items per page
NEXT_PUBLIC_PAGE_SIZE=15
```

### Development Setup

##### Using nvm
```bash
# Install and use the correct Node.js version
nvm install
nvm use
```

#### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

#### Using Docker
```bash
# Build and start development container
docker-compose up --build
```

The application will be available at `http://localhost:3000`.

## Running Tests
```bash
# Run unit tests
npm test
```

## Production Build

### Local Build
```bash
# Create production build
npm run build

# Start production server
npm start
```

### Using Docker
```bash
# Build production image
docker build -t golden-raspberry-awards:prod --target production .

# Run production container
docker run -p 3000:3000 golden-raspberry-awards:prod
```

## Project Structure

### Components

- **Menu**: The navigation menu component, located in `src/components/Menu/Menu.tsx`. It includes links to the Dashboard and Movies pages.
- **DataTable**: A reusable table component for displaying data, located in `src/components/DataTable/DataTable.tsx`.

### Pages

- **Dashboard**: The main dashboard page, located in `src/app/dashboard/page.tsx`. It displays various statistics and data visualizations.
- **Movies**: The movies listing page, located in `src/app/movies/page.tsx`. It lists movies and allows filtering and pagination.

### Utilities

- **fetchData**: Utility functions for fetching data from the API, located in `src/lib/fetchData.ts`.
