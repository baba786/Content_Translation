// Simple script to push your layout changes directly without GitHub Actions
// Just use this file as a reference for the commands to run locally

/*
To deploy your changes manually:

1. Clone the repository locally:
   git clone https://github.com/baba786/Content_Translation.git
   cd Content_Translation

2. Check out the development branch:
   git checkout development

3. Build the project:
   npm ci
   npm run build:dev

4. The built files will be in the docs/dev directory
   
5. Copy these files to where you host your dev site
   (or if using GitHub Pages, you'll need to set it up to deploy from the docs directory)

Note: In GitHub repository settings → Pages section, ensure:
- Source is set to "Deploy from a branch"
- Branch is set to "main" (or your preferred branch)
- Folder is set to "/docs"

This way your docs/dev folder will be accessible at /Content_Translation/dev/
*/
