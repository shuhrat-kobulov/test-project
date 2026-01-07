# React + TypeScript + Vite

A modern React application with TypeScript, featuring a comprehensive code quality setup.

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Ant Design** - UI components
- **React Router** - Routing

## 🎯 Code Quality Tools

This project includes enterprise-grade code quality tools:

- ✅ **ESLint** - Code linting with React, TypeScript, A11y rules
- ✅ **Prettier** - Automatic code formatting
- ✅ **TypeScript Strict Mode** - Maximum type safety
- ✅ **Husky** - Git hooks for pre-commit checks
- ✅ **lint-staged** - Lint only changed files
- ✅ **Commitlint** - Conventional commit messages
- ✅ **EditorConfig** - Consistent editor settings

📖 **See [CODE_QUALITY.md](./CODE_QUALITY.md) for complete documentation**  
⚡ **See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for quick commands**

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

## 🎨 VS Code Setup

Install recommended extensions when prompted, or manually:

- ESLint
- Prettier
- EditorConfig

The project includes workspace settings for automatic formatting on save.

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

## 🔒 Features

- ✅ Authentication with JWT tokens
- ✅ Protected routes
- ✅ Product listing with pagination
- ✅ Client-side search
- ✅ Responsive layout
- ✅ TypeScript strict mode
- ✅ Code quality automation

## 📖 Documentation

- [CODE_QUALITY.md](./CODE_QUALITY.md) - Complete guide to code quality tools
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Quick command reference

## 🤝 Contributing

1. Write code following the established patterns
2. Run `npm run validate` before committing
3. Use conventional commit messages
4. All checks must pass before merge
