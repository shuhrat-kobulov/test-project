# React + TypeScript + Vite

A modern React application with TypeScript, featuring a comprehensive code quality setup.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📋 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Check for linting errors
npm run lint:fix         # Fix linting errors
npm run format           # Format code with Prettier
npm run format:check     # Check if code is formatted
npm run type-check       # TypeScript type checking
npm run validate         # Run all checks (recommended before commit)
```

## 📝 Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new feature
fix: bug fix
docs: documentation
style: formatting
refactor: code refactoring
test: add tests
chore: maintenance
```

Pre-commit hooks will automatically:

- Lint and format changed files
- Validate commit message format

## 📚 Project Structure

```
src/
├── app/          # Application setup (providers, routing)
├── features/     # Feature modules (auth, etc.)
├── pages/        # Page components
├── widgets/      # Complex UI blocks (header, sidebar)
├── entities/     # Business entities
└── shared/       # Shared utilities, UI components, types
```

Based on [Feature-Sliced Design](https://feature-sliced.design/) architecture.
