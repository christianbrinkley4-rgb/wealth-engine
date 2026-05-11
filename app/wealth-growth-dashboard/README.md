# Wealth Growth Dashboard

## Overview
The Wealth Growth Dashboard is a professional financial tool designed to help users visualize their potential investment returns based on their age and market conditions. The dashboard compares a standard 6% market return against a more optimized 7.8% return, providing users with insights into their financial growth.

## Project Structure
```
wealth-growth-dashboard
├── app
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── DashboardHeader.tsx
│   ├── ReturnChart.tsx
│   └── AgeInputForm.tsx
├── lib
│   └── returns.ts
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
└── README.md
```

## Installation
To get started with the Wealth Growth Dashboard, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd wealth-growth-dashboard
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the dashboard.

## Features
- **User Input**: Users can input their age to see personalized return projections.
- **Return Comparison**: The dashboard displays a high-end line chart comparing a 6% market return with a 7.8% optimized return.
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive user interface.

## Components
- **DashboardHeader**: Renders the header of the dashboard with branding and navigation.
- **ReturnChart**: Utilizes a line chart library to visualize return data based on user input.
- **AgeInputForm**: A form for users to input their age, which updates the return projections.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.