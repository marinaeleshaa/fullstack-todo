// import { faker } from "@faker-js/faker";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   // 2. Seed todos with user_id
//   await prisma.todo.createMany({
//     data: Array.from({ length: 25 }, () => ({
//       title: faker.string.alpha({ length: { min: 6, max: 20 } }),
//       body: faker.lorem.words(80),
//       user_id: faker.database.mongodbObjectId(),
//       // ✅ required field
//       completed: false,
//     })),
//   });
// }

// main()
//   .then(() => {
//     console.log("Seeding done");
//     prisma.$disconnect();
//   })
//   .catch((err) => {
//     console.error(err);
//     prisma.$disconnect();
//     process.exit(1);
//   });

// // ! npx prisma db seed => Run this command to seed the database
