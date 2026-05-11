# Wealth Engine

## Overview
Wealth Engine is a financial projection tool designed to assist users in estimating their healthcare costs, specifically focusing on Medicare Part B and Part D premiums. The application provides a user-friendly interface that adapts based on the user's age and income level.

## Project Structure
```
wealth-engine
├── app
│   ├── page.tsx                  # Main entry point of the application
│   └── components
│       └── MedicareCostProjection.tsx  # Component for calculating Medicare premiums
├── public                         # Directory for static assets
├── styles
│   └── globals.css               # Global CSS styles
├── package.json                  # npm configuration file
├── tsconfig.json                 # TypeScript configuration file
└── README.md                     # Project documentation
```

## Installation
To get started with the Wealth Engine project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd wealth-engine
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Usage
- Users can input their age and ZIP code to determine which financial funnel they fall into: Wealth or Medicare.
- The MedicareCostProjection component allows users to enter their income levels to calculate estimated Medicare Part B and Part D premiums.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.