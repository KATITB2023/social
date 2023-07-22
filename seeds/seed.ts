import { hash } from "bcrypt";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

void (async () => {
  let nim = 0;
  const prisma = new PrismaClient();

  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        nim: "13521" + String(nim++).padStart(3, "0"),
        role: i === 0 ? "ADMIN" : i === 1 ? "MENTOR" : "STUDENT",
        passwordHash: await hash("password", 10),
      },
    });

    await prisma.profile.create({
      data: {
        userId: user.id,
        name: faker.person.fullName(),
        pin: faker.string.numeric({ length: 6 }), // just pray that this will return unique pin
        faculty: "Sekolah Teknik Elektro dan Informatika",
        campus: "GANESHA",
        gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
        email: faker.internet.email(),
        bio: faker.lorem.words(10),
      },
    });
  }
})();
