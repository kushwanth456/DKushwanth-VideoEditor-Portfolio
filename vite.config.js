import { defineConfig } from 'vite';

// GitHub Pages serves this project beneath the repository name. Local builds
// keep the root path so the existing Express development server still works.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true'
    ? '/DKushwanth-VideoEditor-Portfolio/'
    : '/',
});
