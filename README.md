# hulu-challenge

## Running the Project

To get this project up and running on your local machine, follow these simple steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine. This project uses npm (Node Package Manager) to handle dependencies.

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:nicokaen/hulu-challenge.git

   cd hulu-challenge
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Optional: Running Tests
If you want to run the tests for this project, you can do so by executing the following command:
```bash
npm run test
```

## Exported Notion Tasks

### Step 0: Research
- [x] Analyze Hulu's UX and similar apps to understand navigation patterns and interactions.
- [x] Cards: Div vs Anchor vs Button
- [x] Determine the number of cards per screen.

### Step 1: Project Setup
- [x] Compare Vite vs Webpack.
- [x] Use Vite with TypeScript.
- [x] Clean up initial code.
- [x] Create basic layout using HTML and CSS only.

### Step 2: API Integration
- [x] Create API service.
- [x] Mock data to prevent multiple refreshes during development.
- [x] Create API types.
- [x] Populate categories.
- [x] Implement lazy loading: fetch empty collections when scrolling down.

### Step 3: Tile Focus & Navigation
- [x] Implement remote-like navigation with up/down/left/right keys.
- [x] Keep column index when moving between rows.
- [x] Prevent moving “out-of-bound”.

### Step 4: Modal Implementation
- [x] Create basic layout for the modal.
- [x] Implement open/close logic.
- [x] Add show/movie details.
- [x] Add cover image (vertical).

### Step 5: Polish
- [x] Incorporate transitions and/or visual aesthetics.
- [x] Render different themed rows (e.g., different sized or oriented tiles).
- [x] Add watermarks to tiles.
- [x] Implement some Hulu magic (simple responsive design).
- [x] Conduct performance review using Chrome Lighthouse.
- [x] Update documentation, including the README.
- [x] Implement unit tests.
- [x] Ensure accessibility (A11y).
- [x] Implement error handling.
- [x] Deploy app to Netlify.

### Chrome Lighthouse report
![Lighthouse](https://i.imgur.com/IhOnkcX.png)