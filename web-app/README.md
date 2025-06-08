# Low-Level Design Examples

This project showcases various low-level design implementations in Python, presented through a Next.js web application.

## Local Development

To run the application locally:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

This project is configured for easy deployment to Vercel. Follow these steps:

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project from the `web-app` directory:
   ```bash
   cd web-app
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Alternative: Deploy using Vercel Dashboard

1. Create a new repository and push this code to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New" > "Project"
4. Import your Git repository
5. Select the `web-app` directory as the root directory
6. Click "Deploy"

## Project Structure

- `/app` - Next.js application files
- `/app/projects/[filename]` - Dynamic route to display Python files
- `/public/code` - Python implementation files (copied from parent directory)
- `copy-files.js` - Script to copy Python files from parent directory to public/code

## Features

- Browse different low-level design implementations
- View Python code with syntax highlighting
- Responsive design for all device sizes
