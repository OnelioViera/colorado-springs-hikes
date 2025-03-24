# Colorado Springs Hiking Trails

A modern web application showcasing hiking trails in Colorado Springs, built with Next.js and Sanity.io.

## Features

- Beautiful, responsive design
- Detailed trail information including difficulty, length, and elevation gain
- High-quality images for each trail
- Interactive map locations
- Seasonal recommendations
- Trail features and amenities

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- A Sanity.io account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd colorado-springs-hikes
```

2. Install dependencies:
```bash
npm install
```

3. Create a Sanity.io project:
- Go to [sanity.io](https://www.sanity.io/)
- Create a new project
- Get your project ID and API token

4. Configure environment variables:
- Copy `.env.local.example` to `.env.local`
- Fill in your Sanity project ID and API token

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Setting up Sanity Studio

1. Install Sanity CLI globally:
```bash
npm install -g @sanity/cli
```

2. Initialize Sanity Studio:
```bash
sanity init
```

3. Start Sanity Studio:
```bash
npm run sanity
```

4. Open [http://localhost:3333](http://localhost:3333) to access Sanity Studio

## Adding Content

1. Log in to Sanity Studio
2. Navigate to the "Trails" section
3. Click "Create new document"
4. Fill in the trail information:
   - Name
   - Description
   - Difficulty
   - Length
   - Elevation gain
   - Location coordinates
   - Images
   - Features
   - Best seasons to visit

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Sanity.io](https://www.sanity.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 