# Golden Raspberry Awards

This project displays information about movies nominated and winners of Raspberry Awards. It provides dashboards and listing features to analyze historical data of the awards.

## Getting Started

### Prerequisites
- Node.js 20.x
- npm 10.x
- Docker (optional)

### Development Setup

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

### Running Tests
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
