import fs from 'fs';
import { opendirSync } from 'fs';
import { prisma } from '~/server/prisma';
import path from 'path';
import matter from 'gray-matter';

export type Lesson = {
  title: string;
  content: string;
  data: Record<string, string>;
}

const readDir = async (slug?: string) => {
  const lessons: Lesson[] = [];
  const dirPath = slug
    ? path.join(process.cwd(), 'data', slug)
    : path.join(process.cwd(), 'data');
  const dir = opendirSync(dirPath);
  for await (const entry of dir) {
    if (entry.isDirectory()) {
      readDir(entry.name);
    } else {
      const file = fs
        .readFileSync(path.join(dirPath, entry.name))
        .toLocaleString();
      const { content, data } = matter(file);
      lessons.push({
        title: data.title,
        content,
        data,
      });
    }
  }

  lessons.sort((a, b) => {
    // @ts-expect-error
    return a.data.order - b.data.order
  });
  return lessons;
};

export const getLessons = async ({ slug }) => {
  const lessons = await readDir(slug);
  return {
    lessons
  };
};

export const getLesson = async ({ slug, lessonSlug }) => {
  const lessons = await readDir(slug);
  return {
    lesson: lessons.find((l) => l.data.slug === lessonSlug),
  };
};

export const getAllPaths = async () => {
  const paths = await prisma.course.findMany({
    select: {
      slug: true,
    },
  });
  const results = await Promise.all(
    paths.map(async (p: any) => {
      const lessons = await getLessons({ slug: p.slug });
      return lessons.lessons.map((lesson) => ({
        slug: p.slug,
        slug_lesson: lesson.data.slug,
      }));
    }),
  );
  console.log(results.flat());
  return {
    paths: results.flat().map((a) => ({ params: a })),
    fallback: false,
  };
};
