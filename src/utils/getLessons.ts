import fs from 'fs';
import { opendirSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const getLessons = async ({ slug }) => {
  const lessons: any = [];
  const dirPath = path.join(process.cwd(), 'data', slug);
  const dir = opendirSync(dirPath);
  for await (const entry of dir) {
    const file = fs
      .readFileSync(path.join(dirPath, entry.name))
      .toLocaleString();
    const { content, data } = matter(file);
    lessons.push({
      title: entry.name,
      content,
      data,
    });
  }
  return {
    props: {
      lessons: lessons.reverse(),
    },
  };
};
