import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

const root = process.cwd();
const publicDir = join(root, 'public');
const content = JSON.parse(readFileSync(join(publicDir, 'site-content.json'), 'utf8'));
const allowedExtensions = new Set(['.mp4', '.webm', '.mov', '.m4v']);
const filesByName = new Map();

// Favorites are scanned first so a matching filename in both folders appears once
// and is always featured. Prefer storing a file in only one folder to avoid copies.
for (const folder of ['favorites', 'videos']) {
  const directory = join(publicDir, folder);
  let files = [];
  try {
    files = readdirSync(directory, { withFileTypes: true });
  } catch {
    continue;
  }

  for (const entry of files) {
    if (!entry.isFile() || !allowedExtensions.has(extname(entry.name).toLowerCase())) continue;
    const key = entry.name.toLocaleLowerCase();
    if (filesByName.has(key)) continue;

    const title = basename(entry.name, extname(entry.name))
      .replace(/[._-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim() || 'Untitled video';

    filesByName.set(key, {
      id: `folder-${folder}-${entry.name}`,
      title,
      category: 'Other',
      tags: [],
      source: 'static-file',
      file: entry.name,
      url: `/${folder}/${encodeURIComponent(entry.name)}`,
      aspect_ratio: '9:16',
      favorite: folder === 'favorites',
      featured: folder === 'favorites',
      published: true,
      show_in_work: true,
    });
  }
}

const folderProjects = [...filesByName.values()];
const curatedProjects = Array.isArray(content.projects) ? content.projects : [];
const projects = [...folderProjects, ...curatedProjects];
const categories = [...new Set([
  ...(Array.isArray(content.categories) ? content.categories : []),
  ...projects.map((project) => project.category).filter(Boolean),
])];

writeFileSync(
  join(publicDir, 'site-content.generated.json'),
  `${JSON.stringify({ ...content, projects, categories }, null, 2)}\n`,
);
