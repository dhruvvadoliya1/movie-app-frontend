# Movie Manager Application

A full-stack web application for managing movies with features like search, filter, and CRUD operations.

## Features

- View list of movies in a responsive grid layout
- Search movies by title
- Filter movies by genre and year
- Add new movies
- Edit existing movies
- Delete movies
- Star rating system
- Pagination
- Responsive design

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v15 or higher)
- Docker (optional, for containerized deployment)

## Installation

### Option 1: Local Installation

1. Clone the repository:
```bash
git clone https://github.com/dhruvvadoliya1/movie-app-frontend.git
cd movie-app-frontend
```

2. Install dependencies:
```bash
npm install
```

### Option 2: Docker Installation

1. Clone the repository:
```bash
git clone https://github.com/dhruvvadoliya1/movie-app-frontend.git
cd movie-app-frontend
```

2. Build the Docker image:
```bash
docker build -t movie-app-frontend .
```

## Running the Application

### Option 1: Local Development

1. Start the development server:
```bash
ng serve
```

2. Open your browser and navigate to:
```
http://localhost:4200
```

### Option 2: Docker Deployment

1. Run the container:
```bash
docker run -d -p 4200:80 --name movie-app-frontend movie-app-frontend
```

2. Open your browser and navigate to:
```
http://localhost:4200
```

### Docker Commands Reference

- Build the image:
```bash
docker build -t movie-app-frontend .
```

- Run the container:
```bash
docker run -d -p 4200:80 --name movie-app-frontend movie-app-frontend
```

- Stop the container:
```bash
docker stop movie-app-frontend
```

- Remove the container:
```bash
docker rm movie-app-frontend
```

- View container logs:
```bash
docker logs movie-app-frontend
```

- Rebuild and restart (after changes):
```bash
docker-compose up --build -d
```

## Project Structure

```
src/
├── app/
│   ├── movie/
│   │   ├── create/
│   │   ├── edit/
│   │   ├── list/
│   │   └── show/
│   └── services/
├── assets/
└── environments/
```

## Technologies Used

- Angular
- Bootstrap 5
- Font Awesome
- TypeScript
- HTML5
- CSS3
- Docker

## Features in Detail

### Movie List View
- Responsive grid layout with 3 cards per row
- Search functionality by movie title
- Filter by genre and year
- Star rating display
- Pagination with customizable items per page

### Movie Cards
- Movie title
- Genre
- Year
- Star rating (supports decimal values)
- Action buttons (Show, Edit, Delete)

### Search and Filter
- Real-time search by title
- Dropdown filters for genre and year
- Combined search and filter functionality

### Pagination
- Customizable items per page (5, 10, 20, 50)
- Page navigation
- Current page indicator
- Total items display

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email <your-email> or open an issue in the repository.
