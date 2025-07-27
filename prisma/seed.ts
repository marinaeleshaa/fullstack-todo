import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

// ! npx prisma db seed => Run this command to seed the database


async function main() {
  // todo => Create 25 todo items with random data
  const todos = await prisma.todo.createMany({
    data: Array.from({ length: 25 }, () => ({
     title : faker.book.title(),
     body: faker.lorem.words({ min: 10, max: 40 }),

    })),
  });

  // todo => Create 25 todo items with random data
  // const user = await prisma.user.createMany({
  //   data: Array.from({ length: 25 }, () => ({
  //     email: faker.internet.email(),
  //     name: faker.person.firstName(),
  //     address: {
  //       street: faker.location.street(),
  //       city: faker.location.city(),
  //       state: faker.location.state(),
  //       zip: faker.location.zipCode(),
  //     },
  //   })),
  // });

}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
