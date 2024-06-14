import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
    },
  });
  await prisma.task.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
    },
  });
  await prisma.task.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
    },
  });
  await prisma.task.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
    },
  });
  await prisma.task.upsert({
    where: { id: 5 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
    },
  });
  await prisma.task.upsert({
    where: { id: 6 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
    },
  });
  await prisma.task.upsert({
    where: { id: 7 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
    },
  });
  await prisma.task.upsert({
    where: { id: 8 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
    },
  });
  await prisma.task.upsert({
    where: { id: 9 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
    },
  });
  await prisma.task.upsert({
    where: { id: 10 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
    },
  });
  await prisma.task.upsert({
    where: { id: 11 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
    },
  });
  await prisma.task.upsert({
    where: { id: 12 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
    },
  });
  await prisma.task.upsert({
    where: { id: 13 },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
