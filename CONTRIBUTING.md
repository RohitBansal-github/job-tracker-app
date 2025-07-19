
# Contributing to Job Tracker

We welcome contributions to **Job Tracker**! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated. This guide outlines how to contribute to the project.

## Table of Contents
- [How to Contribute](#how-to-contribute)
- [Prerequisites](#prerequisites)
- [Setting Up the Project](#setting-up-the-project)
- [Code Style Guidelines](#code-style-guidelines)
- [Reporting Issues](#reporting-issues)
- [Contact](#contact)

## How to Contribute
1. **Fork the Repository**:
   - Go to [https://github.com/RohitBansal-github/job-tracker-app](https://github.com/RohitBansal-github/job-tracker-app).
   - Click the "Fork" button to create a copy under your GitHub account.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/job-tracker-app.git
   cd job-tracker-app
   ```

3. **Create a Feature Branch**:
   - Use a descriptive branch name, e.g., `feature/add-dark-mode` or `bugfix/cors-error`.
   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Changes**:
   - Implement your feature or bug fix in the `job-tracker` (frontend) or `server` (backend) directory.
   - Follow the [Code Style Guidelines](#code-style-guidelines).

5. **Commit Changes**:
   - Write clear, concise commit messages, e.g., `Add dark mode toggle to Navbar.jsx`.
   ```bash
   git commit -m "Your descriptive commit message"
   ```

6. **Push to Your Fork**:
   ```bash
   git push origin feature/YourFeatureName
   ```

7. **Submit a Pull Request**:
   - Go to your fork on GitHub and click "New Pull Request".
   - Select your branch and compare it to the `main` branch of the original repository.
   - Provide a clear description of your changes, referencing any related issues (e.g., `Fixes #123`).

## Prerequisites
- **Node.js** (v16 or higher): For running the frontend and backend.
- **MongoDB Account**: For the `MONGO_URI` environment variable.
- **Git**: For version control.
- **Vercel and Render Accounts**: Optional, for testing deployments.
- **Code Editor**: VS Code or similar, with ESLint and Prettier extensions recommended.

## Setting Up the Project
Follow the [Getting Started section](README.md#getting-started) in the `README.md` for detailed setup instructions. Summary:
1. **Frontend Setup**:
   ```bash
   cd job-tracker
   npm install
   npm run dev
   ```
   Runs on `http://localhost:5173`.
2. **Backend Setup**:
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in `server/`:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
   Run the backend:
   ```bash
   npm start
   ```
   Runs on `http://localhost:5000`.
3. **Test Changes**:
   - Ensure CORS allows `http://localhost:5173` or `https://jobtracker-client.vercel.app`.
   - Test locally before submitting a pull request.

## Code Style Guidelines
- **JavaScript/React**:
  - Use functional components and hooks in `src/components/` and `src/pages/`.
  - Follow ESLint rules defined in `.eslintrc.js`.
  - Use PascalCase for component files (e.g., `JobForm.jsx`).
- **CSS/Tailwind**:
  - Use Tailwind CSS classes in `src/tailwind.config.js`.
  - Avoid inline styles; use `className` for consistency.
- **Node.js/Express**:
  - Place route handlers in `server/controllers/`, routes in `server/routes/`.
  - Use async/await for API calls and proper error handling.
- **Commits**:
  - Write clear messages: `Add feature`, `Fix bug`, `Update docs`.
  - Keep changes focused; avoid large, unrelated commits.
- **Testing**:
  - Test frontend UI on desktop and mobile (e.g., Chrome DevTools).
  - Test backend endpoints with tools like Postman or curl.
  - Ensure no console errors or warnings.

## Reporting Issues
- Check the [Issues tab](https://github.com/RohitBansal-github/job-tracker-app/issues) for existing bugs or feature requests.
- If reporting a new issue:
  - Use a descriptive title (e.g., `Sidebar not displaying on desktop`).
  - Include steps to reproduce, expected behavior, actual behavior, and screenshots if applicable.
  - Tag with appropriate labels (e.g., `bug`, `enhancement`).

## Contact
For questions or suggestions, reach out via:
- **GitHub Issues**: [https://github.com/RohitBansal-github/job-tracker-app/issues](https://github.com/RohitBansal-github/job-tracker-app/issues)
- **Email**: Contact the maintainer at [your email, if applicable].

Thank you for contributing to Job Tracker!
```
