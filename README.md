# Wordle React Clone

Welcome to the Wordle React Clone, a fun and interactive word puzzle game built with React. This clone of the popular Wordle game offers a sleek user interface and engaging gameplay, all developed using modern web technologies.

## Try my app here: https://neon-creponne-d76877.netlify.app/

## Features

- **Interactive Game Board**: A dynamic 6x5 grid where players input their guesses to uncover the hidden word.
- **Responsive Keyboard**: A custom-built on-screen keyboard that supports both desktop and mobile users.
- **Game Logic**: Implemented in React, the game logic handles user inputs, validates guesses, and tracks game progress.
- **Dynamic Alerts and Dialogs**: Provides feedback and instructions to enhance the user experience.
- **State Management**: Utilizes React Context (`GameContext.jsx`) for efficient state management across components.

## Structure

- `App.jsx`: The main entry point of the application, integrating the Header, Main, and Footer components.
- `GameContext.jsx`: Manages the game state, including current guesses, game status, and word validation.
- `components/GameBoard.jsx`: Renders the game board with individual rows for guesses.
- `components/Keyboard.jsx`: Displays the interactive keyboard for user input.
- `components/Letter.jsx`: Represents each letter cell in the game board.
- `components/Main.jsx`: Central component that brings together the game board and keyboard.
- `vite.config.js`: Configuration file for Vite, enhancing the development experience.

## Getting Started

To get started with this project:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Run the application using `npm run dev`.

## Contributing

Contributions to enhance the Wordle React Clone are welcome. Feel free to fork the repository and submit your pull requests.
