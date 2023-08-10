import { hash } from "bcrypt";
import { faker } from "@faker-js/faker";
import { PrismaClient, Status } from "@prisma/client";

void (async () => {
  let nim = 0;
  const prisma = new PrismaClient();

  // seed user
  for (let i = 0; i < 500; i++) {
    const user = await prisma.user.upsert({
      where: {
        nim: "13521" + String(nim++).padStart(3, "0"),
      },
      update: {},
      create: {
        nim: "13521" + String(nim++).padStart(3, "0"),
        role: i === 0 ? "ADMIN" : i === 1 ? "MENTOR" : "STUDENT",
        passwordHash: await hash("password", 10),
      },
    });

    await prisma.profile.upsert({
      where: {
        userId: user.id,
      },
      update: {},
      create: {
        userId: user.id,
        name: faker.person.fullName(),
        pin: faker.string.numeric({ length: 6 }), // just pray that this will return unique pin
        faculty: "Sekolah Teknik Elektro dan Informatika",
        campus: "GANESHA",
        gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
        email: faker.internet.email(),
        bio: faker.lorem.words(10),
        point: Math.floor(Math.random() * 1000),
      },
    });
  }

  for (let i = 0; i < 15; i++) {
    await prisma.feed.create({
      data: {
        text: faker.lorem.lines(5),
        attachmentUrl: null,
      },
    });
  }

  for (let i = 0; i < 3; i++) {
    const today = new Date();
    const deadline = new Date();

    deadline.setDate(today.getDate() + faker.number.int({ min: 1, max: 7 }));
    await prisma.assignment.create({
      data: {
        title: faker.lorem.words(3),
        description: faker.lorem.lines(4),
        filePath: faker.internet.url(),
        type: "MANDATORY",
        startTime: new Date(),
        endTime: deadline,
      },
    });
  }

  for (let i = 0; i < 3; i++) {
    const today = new Date();
    const deadline = new Date();

    deadline.setDate(today.getDate() + 1);
    await prisma.assignment.create({
      data: {
        title: faker.lorem.words(3),
        description: faker.lorem.lines(4),
        type: "DAILY_QUEST",
        startTime: new Date(),
        endTime: deadline,
      },
    });
  }

  for (let i = 0; i < 3; i++) {
    const today = new Date();
    const deadline = new Date();
    deadline.setDate(today.getDate() + 30);
    await prisma.assignment.create({
      data: {
        title: faker.lorem.words(3),
        filePath: faker.internet.url(),
        type: "SIDE_QUEST",
        startTime: new Date(),
        endTime: deadline,
      },
    });
  }

  // ATTENDANCE SEEDER
  for (let i = 0; i < 3; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);
    const day = await prisma.attendanceDay.create({
      data: {
        name: `Day ${i + 1}`,
        time: currentDate,
      },
    });
    let startTime = currentDate;
    for (let j = 0; j < 3; j++) {
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 3);

      const event = await prisma.attendanceEvent.create({
        data: {
          title: `Event ${j + 1}`,
          startTime: startTime,
          endTime: endTime,
          dayId: day.id,
        },
      });
      const students = await prisma.user.findMany({
        where: {
          role: "STUDENT",
        },
      });
      for (const student of students) {
        await prisma.attendanceRecord.create({
          data: {
            date: startTime,
            status: Object.values(Status)[Math.floor(Math.random() * 5)],
            studentId: student.id,
            eventId: event.id,
          },
        });
      }
      startTime = new Date(endTime);
    }
  }
})();
