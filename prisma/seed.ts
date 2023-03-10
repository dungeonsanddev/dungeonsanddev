import { PrismaClient, CATEGORY } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const exists = await prisma.course.findUnique({
    where: {
      slug: 'git-basics',
    },
  });
  if (exists?.id) return;
  await prisma.course.create({
    data: {
      name: 'Git Basics',
      slug: 'git-basics',
      media:
        'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80',
      description: `Git is a powerful version control system that is widely used by software developers around the world. In this course, you will learn the basics of Git and how to use it to manage your codebase.

The course includes the following topics:

- Introduction to version control and Git
- Git components: repository, branches, and commits
- Installing and configuring Git
- Creating a new Git repository and adding files to it
- Making changes to files and committing them
- Reverting changes and viewing history
- Branching and merging
- Resolving conflicts during merging
- Advanced Git features: tagging and collaborating with remote repositories

By the end of this course, you will have a solid understanding of Git basics and be able to use Git to manage your code effectively. You will be able to create and manage repositories, work with branches and commits, resolve conflicts, and collaborate with others using Git.`,
      category: CATEGORY.TOOLS,
      language: 'EN',
      author: {
        create: {
          name: 'ChatGPT',
          photo: 'https://thispersondoesnotexist.com/image',
          description: 'Legit just an AI :D',
          link_github: 'https://github.com/axodotdev',
          link_twitter: 'https://twitter.com/openai',
          link_website: 'https://chat.openai.com',
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
