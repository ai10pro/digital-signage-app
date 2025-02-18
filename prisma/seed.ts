const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const u1 = await prisma.user.create({
    data: {
      name: "ユーザー1",
      userImageURL: "https://placehold.jp/150x150.png",
    },
  });
  const u2 = await prisma.user.create({
    data: {
      name: "ユーザー2",
      userImageURL: "https://placehold.jp/150x150.png",
    },
  });
  const u3 = await prisma.user.create({
    data: {
      name: "ユーザー3",
      userImageURL: "https://placehold.jp/150x150.png",
    },
  });

  const t1 = await prisma.tag.create({ data: { name: "タグ1" } });
  const t2 = await prisma.tag.create({ data: { name: "タグ2" } });
  const t3 = await prisma.tag.create({ data: { name: "タグ3" } });

  const c1 = await prisma.content.create({
    data: {
      title: "タイトル1",
      text: "本文1",
      coverImageURL: "https://placehold.jp/1280x720.png",
      users: { create: { userId: u1.id } },
      tags: {
        create: [{ tagId: t1.id }, { tagId: t2.id }],
      },
    },
  });

  const c2 = await prisma.content.create({
    data: {
      title: "タイトル2",
      text: "本文2",
      coverImageURL: "https://placehold.jp/0d91d3/1280x720.png",
      users: { create: { userId: u2.id } },
      tags: {
        create: [{ tagId: t2.id }, { tagId: t3.id }],
      },
    },
  });

  const c3 = await prisma.content.create({
    data: {
      title: "タイトル3",
      text: "本文3",
      coverImageURL: "https://placehold.jp/e3a131/1280x720.png",
      users: { create: { userId: u3.id } },
      tags: {
        create: [{ tagId: t1.id }, { tagId: t3.id }],
      },
    },
  });

  console.log(JSON.stringify(c1, null, 2));
  console.log(JSON.stringify(c2, null, 2));
  console.log(JSON.stringify(c3, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
