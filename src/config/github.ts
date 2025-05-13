export const githubConfig = {
  token: process.env.VITE_GITHUB_TOKEN || '',
  owner: process.env.VITE_GITHUB_OWNER || 'winchesterrx',
  repo: process.env.VITE_GITHUB_REPO || 'kaah-ink-uploads',
  branch: process.env.VITE_GITHUB_BRANCH || 'main',
  baseUrl: 'https://api.github.com'
}; 